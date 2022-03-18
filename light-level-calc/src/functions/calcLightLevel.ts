import axios, { AxiosResponse } from 'axios'
import _ from 'lodash'
import { createMatrix, generateDays, getPPFD, getSolarAzimothElevation, pointInPolygon } from './helpers'

const openWeatherCache: Record<string, AxiosResponse<any, any>> = {}
const astroCache: Record<string, AxiosResponse<any, any>> = {}

export async function calcLightLevel(corners: number[][], polygons: number[][][], resolution: number[], coordinates: number[]) {
  if (resolution.length !== 2) return {}
  const resX = resolution[0]
  const resY = resolution[1]
  const dx = (corners[1][0] - corners[0][0]) / resX
  const dy = (corners[1][1] - corners[0][1]) / resY

  const PPFD90 = getPPFD(90)

  // const xs = new Array(resolution).fill(0).map((_, i) => i * dx + corners[0][0])
  // const ys = new Array(resolution).fill(0).map((_, i) => i * dy + corners[0][1])

  // effectively just gets the dates of the solstices and equinoxes which should be the troughs and peaks of light level sinusoid
  const daysSet = generateDays('March 20, 2022', 'December 21, 2022', 4)
  if (daysSet === null) return {}
  const times = new Array(24).fill(0).map((_, i) => i)

  const DLIMatrix: number[][][] = createMatrix([daysSet.length, resX, resY], 0)
  const DLIAverages: number[] = new Array(daysSet.length).fill(0)

  // total hours sun is above the horizon
  const lightSumsMatrixUnshadedDenominator: number[][][] = createMatrix([daysSet.length, resX, resY], 0)
  const lightSumsDaysUnshadedDenominator: number[] = new Array(daysSet.length).fill(0)

  // total hours
  const lightSumsMatrixDenominator: number[][][] = createMatrix([daysSet.length, resX, resY], 0)
  const lightSumsDaysDenominator: number[] = new Array(daysSet.length).fill(0)

  // light received at a particular spot for the 24 hour period
  const lightFractionMatrix: number[][][] = createMatrix([daysSet.length, resX, resY], 0)
  // light received for that day relative to a day with full sun
  const lightFractionDays: number[] = new Array(daysSet.length).fill(0)

  // fraction of daylight unblocked by objects at a particular spot
  const lightFractionUnshadedMatrix: number[][][] = createMatrix([daysSet.length, resX, resY], 0)
  // fraction of daylight unblocked by objects for the day
  const lightFractionUnshadedDays: number[] = new Array(daysSet.length).fill(0)

  for (let numOfDay = 0; numOfDay < daysSet.length; numOfDay++) {
    const d = daysSet[numOfDay]
    const date = new Date(d)
    let lightIntensitySums: number[][] = createMatrix(resolution, 0)

    const openWeatherParams = {
      month: date.getMonth(),
      lat: coordinates[0],
      lon: coordinates[1],
      appid: process.env.OPENWEATHERMAP_APPID,
    }

    let monthlySummaryRes: AxiosResponse<any, any> = null
    const openWeatherParamsKey = JSON.stringify(openWeatherParams)
    if (openWeatherCache[openWeatherParamsKey]) {
      monthlySummaryRes = openWeatherCache[openWeatherParamsKey]
    } else {
      monthlySummaryRes = await axios.get(process.env.OPENWEATHERMAP_AGGREGATED_MONTHLY_API_URL, {
        params: openWeatherParams,
      })
      openWeatherCache[openWeatherParamsKey] = monthlySummaryRes
    }

    const sunshine_hours = _.get(monthlySummaryRes, 'data.result.sunshine_hours', null)
    if (sunshine_hours === null) throw new Error(`Sunshine hours for month ${date.getMonth()} null.`)

    const midmonth = new Date(d)
    midmonth.setDate(15)

    const astroParams = {
      lat: coordinates[0],
      long: coordinates[1],
      apiKey: process.env.IPGEOLOCATION_APIKEY,
      date: midmonth.toISOString().slice(0, 10),
    }

    let astroSummaryRes: AxiosResponse<any, any> = null
    const astroParamsKey = JSON.stringify(astroParams)
    if (astroCache[astroParamsKey]) {
      astroSummaryRes = astroCache[astroParamsKey]
    } else {
      astroSummaryRes = await axios.get(process.env.IPGEOLOCATION_API_URL, {
        params: astroParams,
      })
      astroCache[astroParamsKey] = astroSummaryRes
    }

    const dayLength: string | null = _.get(astroSummaryRes, 'data.day_length', null)
    if (dayLength === null) throw new Error(`day length for ${date.getMonth()} null.`)
    if (dayLength.length !== 5) throw new Error('day length improperly formatted')
    const dayHours = Number(dayLength.slice(0, 2))
    const dayMinutes = Number(dayLength.slice(3, 5))
    if (dayHours === NaN || dayMinutes === NaN) throw new Error('day length improperly formatted')

    const dateForNumDaysCalc = new Date(d)
    dateForNumDaysCalc.setMonth(dateForNumDaysCalc.getMonth() + 1)
    dateForNumDaysCalc.setDate(0)
    const numDays = dateForNumDaysCalc.getDate()
    const hoursOfSunshineInMonth = (dayHours + dayMinutes / 60) * numDays

    const sunlightRatio = sunshine_hours / hoursOfSunshineInMonth

    times.forEach(t => {
      const time = new Date(d)
      time.setHours(t)
      // position of the sun
      const [azimoth, elevation] = getSolarAzimothElevation(time.toString(), coordinates[0], coordinates[1], coordinates[2])
      // skip if the sun is below the horizon
      if (elevation > 1) {
        // http://dx.doi.org/10.1007/s11099-010-0077-5
        const PPFD = getPPFD(elevation)

        lightIntensitySums = createMatrix(resolution, 1)

        const E = [
          [1, 0, Math.cos(elevation) * Math.sin(azimoth)],
          [0, 1, Math.sin(elevation) * Math.sin(azimoth)],
          [0, 0, 1],
        ]

        polygons.forEach(poly => {
          const projectedVertices = poly.map(v => v.slice(0, 2).map((p, i) => E[i].reduce((s, e, j) => s + e * v[j], 0)))

          for (let i = 0; i < resX; i++) {
            const x = corners[0][0] + (0.5 + i) * dx
            for (let j = 0; j < resY; j++) {
              const y = corners[0][1] + (0.5 + j) * dy
              if (lightIntensitySums[i][j] > 0) {
                const lightBlocked = pointInPolygon([x, y], projectedVertices)
                const opacity = 1
                if (lightBlocked) {
                  lightIntensitySums[i][j] = Math.max(0, lightIntensitySums[i][j] - opacity)
                }
              }
            }
          }
        })

        for (let i = 0; i < resX; i++) {
          for (let j = 0; j < resY; j++) {
            lightIntensitySums[i][j] = lightIntensitySums[i][j] * PPFD * sunlightRatio
            DLIAverages[numOfDay] += lightIntensitySums[i][j] / (resX * resY)
            DLIMatrix[numOfDay][i][j] += lightIntensitySums[i][j]

            lightSumsDaysUnshadedDenominator[numOfDay] += (PPFD * sunlightRatio) / (resX * resY)
            lightSumsMatrixUnshadedDenominator[numOfDay][i][j] += PPFD
          }
        }
      }
    })

    for (let i = 0; i < resX; i++) {
      for (let j = 0; j < resY; j++) {
        lightSumsDaysDenominator[numOfDay] += (PPFD90 * times.length * sunlightRatio) / (resX * resY)
        lightSumsMatrixDenominator[numOfDay][i][j] += PPFD90 * times.length
      }
    }

    lightFractionDays[numOfDay] = DLIAverages[numOfDay] / lightSumsDaysDenominator[numOfDay]
    lightFractionUnshadedDays[numOfDay] = DLIAverages[numOfDay] / lightSumsDaysUnshadedDenominator[numOfDay]
    for (let i = 0; i < resX; i++) {
      for (let j = 0; j < resY; j++) {
        lightFractionMatrix[numOfDay][i][j] = DLIMatrix[numOfDay][i][j] / lightSumsMatrixDenominator[numOfDay][i][j]
        lightFractionUnshadedMatrix[numOfDay][i][j] = DLIMatrix[numOfDay][i][j] / lightSumsMatrixUnshadedDenominator[numOfDay][i][j]
      }
    }
  }

  const daylightFraction = lightSumsDaysUnshadedDenominator.map((a, i) => a / lightSumsDaysDenominator[i])
  const DLINormalizedMatrix = DLIMatrix.map(d => d.map(xs => xs.map(dli => Math.min(dli / 50, 1))))
  const DLIAveragesNormalized = DLIAverages.map(dli => Math.min(dli / 50, 1))

  return {
    DLINormalizedMatrix,
    DLIMatrix,
    DLIAveragesNormalized,
    DLIAverages,
    lightFractionDays,
    lightFractionMatrix,
    lightFractionUnshadedDays,
    lightFractionUnshadedMatrix,
    lightSumsDaysDenominator,
    lightSumsDaysUnshadedDenominator,
    daylightFraction,
  }
}
