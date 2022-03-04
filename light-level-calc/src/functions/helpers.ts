// Ported from Matlab
export function getSolarAzimothElevation(UTC: string, lat: number, lng: number, alt: number): [number, number] {
  const jd = Math.floor(new Date(UTC).getTime() / 86400000 + 2440587.5)
  const d = jd - 2451543.5
  const w = 282.9404 + 4.70935e-5 * d
  const e = 0.016709 - 1.151e-9 * d
  const M = (356.047 + 0.9856002585 * d) % 360
  const L = w + M
  const oblecl = 23.4393 - 3.563e-7 * d

  const E = M + (180 / Math.PI) * e * Math.sin(M * (Math.PI / 180)) * (1 + e * Math.cos(M * (Math.PI / 180)))
  const x = Math.cos(E * (Math.PI / 180)) - e
  const y = Math.sin(E * (Math.PI / 180)) * Math.sqrt(1 - e ** 2)

  const r = Math.sqrt(x ** 2 + y ** 2)
  const v = Math.atan2(y, x) * (180 / Math.PI)

  const sun_lng = v + w

  const xeclip = r * Math.cos(sun_lng * (Math.PI / 180))
  const yeclip = r * Math.sin(sun_lng * (Math.PI / 180))
  const zeclip = 0

  const xequat = xeclip
  const yequat = yeclip * Math.cos(oblecl * (Math.PI / 180)) + zeclip * Math.sin(oblecl * (Math.PI / 180))
  const zequat = yeclip * Math.sin(23.4406 * (Math.PI / 180)) + zeclip * Math.cos(oblecl * (Math.PI / 180))

  const r2 = Math.sqrt(xequat ** 2 + yequat ** 2 + zequat ** 2) - alt / 149598000
  const RA = Math.atan2(yequat, xequat) * (180 / Math.PI)
  const delta = Math.asin(zequat / r2) * (180 / Math.PI)

  const UTCDate = new Date(UTC)
  const UTCHours = UTCDate.getUTCHours() + UTCDate.getUTCMinutes() / 60 + UTCDate.getUTCSeconds() / 3600

  const GMST0 = ((L + 180) % 360) / 15
  const SIDTIME = GMST0 + UTCHours + lng / 15

  const HA = SIDTIME * 15 - RA

  const x2 = Math.cos(HA * (Math.PI / 180)) * Math.cos(delta * (Math.PI / 180))
  const y2 = Math.sin(HA * (Math.PI / 180)) * Math.cos(delta * (Math.PI / 180))
  const z2 = Math.sin(delta * (Math.PI / 180))

  const xhor = x2 * Math.cos((90 - lat) * (Math.PI / 180)) - z2 * Math.sin((90 - lat) * (Math.PI / 180))
  const yhor = y2
  const zhor = x2 * Math.sin((90 - lat) * (Math.PI / 180)) + z2 * Math.cos((90 - lat) * (Math.PI / 180))

  const azimoth = Math.atan2(yhor, xhor) * (180 / Math.PI) + 180
  const elevation = Math.asin(zhor) * (180 / Math.PI)

  return [azimoth, elevation]
}

export function generateDays(start: string | Date, end: string | Date, n: number): string[] | null {
  let startDate = new Date(start)
  let endDate = new Date(end)
  if (startDate === undefined || endDate === undefined) {
    return null
  }
  startDate = new Date(startDate.toDateString())
  endDate = new Date(endDate.toDateString())
  const gap = Math.floor((endDate.getTime() - startDate.getTime()) / (n - 1))

  const res: string[] = []
  for (let i = 0; i < n; i++) {
    const d = new Date(startDate.getTime())
    d.setMilliseconds(gap * i)
    res.push(d.toDateString())
  }
  return res
}

export function pointInPolygon(point: number[], vertices: number[][]): boolean {
  let numIntersections = 0
  const numVertices = vertices.length
  const x = Math.round(point[0] * 1000) / 1000 + 0.0001
  const y = point[1]

  for (let i = 0; i < numVertices; i++) {
    const x1 = Math.round(vertices[i][0] * 1000) / 1000
    const y1 = vertices[i][1]
    let x2 = 0
    let y2 = 0
    if (i === numVertices - 1) {
      x2 = Math.round(vertices[0][0] * 1000) / 1000
      y2 = vertices[0][1]
    } else {
      x2 = Math.round(vertices[i + 1][0] * 1000) / 1000
      y2 = vertices[i + 1][1]
    }
    if ((x1 <= x && x <= x2) || (x2 <= x && x <= x1)) {
      if (x1 === x2) {
        numIntersections += 1
      } else if (x1 !== x2) {
        const m = (y2 - y1) / (x2 - x1)
        const b = y2 - m * x2
        const yI = m * x + b
        if (yI > y) {
          numIntersections += 1
        }
      }
    }
  }
  return numIntersections % 2 === 1
}

export function createMatrix(dimensions: number[], fill: number): any[] {
  if (dimensions.length === 0) return []
  if (dimensions.length === 1) return new Array(dimensions[0]).fill(fill)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  else return new Array(dimensions[0]).fill(0).map(_ => createMatrix(dimensions.slice(1), fill))
}

// Photosynthetic Photon Flux Density
export function getPPFD(elevation: number) {
  // micro-moles of photons per meter^2 per second
  const PPFD = 0.00005643 * elevation ** 4 - 0.0132731 * elevation ** 3 + 0.80505 * elevation ** 2 + 18.4172 * elevation + 20.21771
  // moles per meter^2 per hour
  return (PPFD * 3600) / 1e6
}
