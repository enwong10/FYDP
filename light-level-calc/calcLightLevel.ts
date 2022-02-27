import { createMatrix, generateDays, getSolarAzimothElevation, pointInPolygon } from "./helpers"

export function calcLightLevel(corners: number[][], polygons: number[][][], resolution: number) {
    const dx = (corners[1][0] - corners[0][0]) / (resolution)
    const dy = (corners[1][1] - corners[0][1]) / (resolution)

    // const xs = new Array(resolution).fill(0).map((_, i) => i * dx + corners[0][0])
    // const ys = new Array(resolution).fill(0).map((_, i) => i * dy + corners[0][1])

    // effectively just gets the dates of the solstices and equinoxes which should be the troughs and peaks of light level sinusoid
    const daysSet = generateDays('March 20, 2022', 'December 21, 2022', 4)
    if (daysSet === null) return {}
    const times = new Array(24).fill(0).map((_, i) => i)

    const lightSumsMatrix: number[][][] = createMatrix([daysSet.length, resolution, resolution], 0)
    const lightSumsDays: number[] = new Array(daysSet.length).fill(0)
    const lightSumsMatrixUnshadedDenominator: number[][][] = createMatrix([daysSet.length, resolution, resolution], 0)
    const lightSumsDaysUnshadedDenominator: number[] = new Array(daysSet.length).fill(0)
    const lightSumsMatrixDenominator: number[][][] = createMatrix([daysSet.length, resolution, resolution], 0)
    const lightSumsDaysDenominator: number[] = new Array(daysSet.length).fill(0)

    // light received at a particular spot for the 24 hour period
    const lightFractionMatrix: number[][][] = createMatrix([daysSet.length, resolution, resolution], 0)
    // light received for that day relative to a day with full sun
    const lightFractionDays: number[] = new Array(daysSet.length).fill(0)

    // fraction of daylight unblocked by objects at a particular spot
    const lightFractionUnshadedMatrix: number[][][] = createMatrix([daysSet.length, resolution, resolution], 0)
    // fraction of daylight unblocked by objects for the day
    const lightFractionUnshadedDays: number[] = new Array(daysSet.length).fill(0)

    daysSet.forEach((d, numOfDay) => {
        let lightIntensitySums: number[][] = createMatrix([resolution, resolution], 0)
        times.forEach(t => {
            const time = new Date(d)
            time.setHours(t)
            // position of the sun
            const [azimoth, elevation] = getSolarAzimothElevation(time.toString(), 43.4643, -80.51667, 329)
            // skip if the sun is below the horizon
            if (elevation > 1) {
                lightIntensitySums = createMatrix([resolution, resolution], 1)

                const E = [
                    [1, 0, Math.cos(elevation) * Math.sin(azimoth)],
                    [0, 1, Math.sin(elevation) * Math.sin(azimoth)],
                    [0, 0, 1]
                ]

                polygons.forEach((poly, polynum) => {
                    const projectedVertices = poly.map(v => v.slice(0, 2).map((p, i) => E[i].reduce((s, e, j) => s + e*v[j], 0)))

                    for (let i = 0; i < resolution; i++) {
                        const x = corners[0][0] + (0.5 + i) * dx
                        for (let j = 0; j < resolution; j++) {
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

                for (let i = 0; i < resolution; i++) {
                    for (let j = 0; j < resolution; j++) {
                        lightSumsDays[numOfDay] += lightIntensitySums[i][j]
                        lightSumsMatrix[numOfDay][i][j] += lightIntensitySums[i][j]
                        
                        lightSumsDaysUnshadedDenominator[numOfDay] += 1
                        lightSumsMatrixUnshadedDenominator[numOfDay][i][j] += 1
                    }
                }
            }

            for (let i = 0; i < resolution; i++) {
                for (let j = 0; j < resolution; j++) {                    
                    lightSumsDaysDenominator[numOfDay] += 1
                    lightSumsMatrixDenominator[numOfDay][i][j] += 1
                }
            }
        })

        lightFractionDays[numOfDay] = lightSumsDays[numOfDay] / lightSumsDaysDenominator[numOfDay]
        lightFractionUnshadedDays[numOfDay] = lightSumsDays[numOfDay] / lightSumsDaysUnshadedDenominator[numOfDay]
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                lightFractionMatrix[numOfDay][i][j] = lightSumsMatrix[numOfDay][i][j] / lightSumsMatrixDenominator[numOfDay][i][j]
                lightFractionUnshadedMatrix[numOfDay][i][j] = lightSumsMatrix[numOfDay][i][j] / lightSumsMatrixUnshadedDenominator[numOfDay][i][j]
            }
        }

    })
    const daylightFraction = lightSumsDaysUnshadedDenominator.map((a, i) => a / lightSumsDaysDenominator[i])

    return {
        lightSumsMatrix,
        lightSumsDays,
        lightFractionDays,
        lightFractionMatrix,
        lightFractionUnshadedDays,
        lightFractionUnshadedMatrix,
        lightSumsDaysDenominator,
        lightSumsDaysUnshadedDenominator,
        daylightFraction
    }
}


const polygons: number[][][] = [
    [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 1],
        [1, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [0, 0, 1],
        [1, 0, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [1, 1, 1],
        [0, 1, 1],
        [0, 1, 0]
    ],
]

// const a = calcLightLevel([[-1, -1], [2, 2]], polygons, 10)
// console.log(a.lightSumsDays)
// console.log(a.lightFractionDays)
// console.log(a.lightSumsDaysDenominator)
// console.log(a.lightFractionUnshadedDays)
// console.log(a.lightSumsDaysUnshadedDenominator)
// console.log(a.daylightFraction)