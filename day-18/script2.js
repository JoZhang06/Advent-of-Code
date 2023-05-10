
const fs = require("fs")

const readData = () => {
  const data = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\r?\n/)
    .map(line => [...line.split(",").map(Number)])

  const set = new Set(data.map(String))

  return { data, set }
}

const main = () => {
  const { data: lavaCubes, set: lavaCubesSet } = readData()

  const dirs = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ]

  const isInRange = (value, range) => range[0] <= value && value <= range[1]

  const [xRange, yRange, zRange] = Array.from({ length: 3 }, (_, i) =>
    lavaCubes.map(coord => coord[i])
  ).map(values => [Math.min(...values) - 1, Math.max(...values) + 1])

  let res = 0
  let queue = [[xRange[0], yRange[0], zRange[0]]]
  let visited = new Set()

  while (queue.length) {
    const currentCube = queue.shift()

    if (visited.has(String(currentCube))) continue

    visited.add(String(currentCube))

    const [x, y, z] = currentCube

    const adjacentCubes = dirs
      .map(([dx, dy, dz]) => [x + dx, y + dy, z + dz])
      .filter(
        ([x, y, z]) =>
          isInRange(x, xRange) && isInRange(y, yRange) && isInRange(z, zRange)
      )

    for (const adjacentCube of adjacentCubes) {
      if (lavaCubesSet.has(String(adjacentCube))) {
        res++
      } else {
        queue.push(adjacentCube)
      }
    }
  }

  console.log(res)
}

main()