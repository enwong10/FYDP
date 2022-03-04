import { calcLightLevel } from '@/functions/calcLightLevel'
import { NextFunction, Request, Response } from 'express'

const polygons: number[][][] = [
  [
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 1],
    [1, 0, 1],
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
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
    [0, 1, 0],
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
      const polysParsed = JSON.parse(polys)
      const coordsParsed = JSON.parse(coords)
      const resParsed = JSON.parse(resolution)
      const data = await calcLightLevel(cornersParsed, polysParsed ?? polygons, resParsed, coordsParsed)
      res.status(201).json({ data, message: 'sunlight' })
    } catch (error) {
      next(error)
    }
  }
}

export default SunlightController
