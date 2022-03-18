import { calcLightLevel } from '@/functions/calcLightLevel'
import { calcPSNR, upScaleBLI } from '@/functions/calcPSNR'
import { NextFunction, Request, Response } from 'express'
import { performance } from 'perf_hooks'

const polygons: number[][][] = [
  [
    [5, 5, 0],
    [5, 5, 5],
    [5, 6, 5],
    [5, 6, 0],
  ],
  [
    [5, 6, 0],
    [5, 6, 5],
    [6, 6, 5],
    [6, 6, 0],
  ],
  [
    [6, 5, 0],
    [6, 5, 5],
    [6, 6, 5],
    [6, 6, 0],
  ],
  [
    [5, 5, 0],
    [5, 5, 5],
    [6, 5, 5],
    [6, 5, 0],
  ],
  [
    [5, 7, 5],
    [6, 7, 5],
    [7, 6, 5],
    [7, 5, 5],
    [6, 4, 5],
    [5, 4, 5],
    [4, 5, 5],
    [4, 6, 5],
  ],
  [
    [0, 0, 0],
    [0, 0, 1.5],
    [0, 10, 1.5],
    [0, 10, 0],
  ],
  [
    [0, 0, 0],
    [0, 0, 1.5],
    [10, 0, 1.5],
    [10, 0, 0],
  ],
  [
    [10, 10, 0],
    [10, 10, 1.5],
    [0, 10, 1.5],
    [0, 10, 0],
  ],
  [
    [10, 10, 0],
    [10, 10, 1.5],
    [10, 0, 1.5],
    [10, 0, 0],
  ],
]

class SunlightController {
  public sunlightData = async (
    req: Request<{}, {}, {}, { corners: string; polys: string; coords: string; res: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { corners, polys, coords, res: resolution } = req.query
      const cornersParsed = JSON.parse(corners)
      const polysParsed = polys ? JSON.parse(polys) : polygons
      const coordsParsed = JSON.parse(coords)
      const resParsed = JSON.parse(resolution)
      const data = await calcLightLevel(cornersParsed, polysParsed ?? polygons, resParsed, coordsParsed)
      res.status(201).json({ data, message: 'sunlight' })
    } catch (error) {
      next(error)
    }
  }

  public sunlightPSNR = async (
    req: Request<{}, {}, {}, { corners: string; polys: string; coords: string; res1: string; resHi: string; res2: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { corners, polys, coords, res1 } = req.query
      const cornersParsed = JSON.parse(corners)
      const polysParsed = polys ? JSON.parse(polys) : polygons
      const coordsParsed = JSON.parse(coords)
      const res1Parsed = JSON.parse(res1)
      const data1 = await calcLightLevel(cornersParsed, polysParsed ?? polygons, res1Parsed, coordsParsed)
      const nextRes = [1, 1]
      const PSNRs = []
      const compTimes = []
      const PSNRtoCompTimes = []
      let bestPSNR: Record<string, number> = {}
      while (nextRes[0] < res1Parsed[0] && nextRes[0] < 130) {
        const start = performance.now()
        const data2 = await calcLightLevel(cornersParsed, polysParsed ?? polygons, nextRes, coordsParsed)
        const end = performance.now()
        const compTime = end - start
        const dataUpscaled = data2.DLINormalizedMatrix.map(d => upScaleBLI(d, res1Parsed))
        const PSNR = dataUpscaled.map((d, i) => calcPSNR(d, data1.DLINormalizedMatrix[i]))
        const PSNRAverage = PSNR.reduce((mean, psnr) => mean + psnr / PSNR.length, 0)
        compTimes.push(compTime)
        PSNRs.push(PSNRAverage)
        const PSNRtoCompTime = PSNRAverage / compTime
        PSNRtoCompTimes.push(PSNRtoCompTime)
        if (!bestPSNR.PSNRtoCompTime || PSNRtoCompTime > bestPSNR.PSNRtoCompTime) {
          bestPSNR = {
            PSNRAverage,
            compTime,
            PSNRtoCompTime,
            res: nextRes[0],
          }
        }
        nextRes[0] += 1
        nextRes[1] += 1
      }
      res.status(201).json({ PSNRs, compTimes, PSNRtoCompTimes, bestPSNR, message: 'PSNRs' })
    } catch (error) {
      next(error)
    }
  }
}

export default SunlightController
