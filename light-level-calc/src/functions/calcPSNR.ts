export function upScaleBLI(A: number[][], dim: number[]) {
  const B = new Array(dim[0]).fill(0).map(_ => new Array(dim[1]).fill(0))

  for (let i = 0; i < dim[0]; i++) {
    let row = Math.floor((i / dim[0]) * A.length - 0.5)
    const nextRow = Math.min(A.length - 1, row + 1)
    const alpha = (i / dim[0]) * A.length - 0.5 - row
    row = Math.max(0, row)
    for (let j = 0; j < dim[1]; j++) {
      let col = Math.floor((j / dim[1]) * A[row].length - 0.5)
      const nextCol = Math.min(A[row].length - 1, col + 1)
      const beta = (j / dim[1]) * A[row].length - 0.5 - col
      col = Math.max(0, col)
      const f1 = (1 - alpha) * A[row][col] + alpha * A[nextRow][col]
      const f2 = (1 - alpha) * A[row][nextCol] + alpha * A[nextRow][nextCol]
      B[i][j] = (1 - beta) * f1 + beta * f2
      B[i][j] = Math.round(B[i][j] * 10000) / 10000
    }
  }

  return B
}

export function calcPSNR(A: number[][], B: number[][]) {
  let MSE = 0
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      MSE += (Math.pow(Math.round(B[i][j] * 10000) / 10000 - Math.round(A[i][j] * 10000) / 10000, 2) / A.length) * A[i].length
    }
  }
  if (MSE === 0) return Number.MAX_SAFE_INTEGER
  return 10 * Math.log10(1 / MSE)
}
