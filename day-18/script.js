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
  const { data, set } = readData()

  const dirs = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ]

  const SIDES_OF_A_CUBE = 6

  const res = data.reduce(
    (acc, [x, y, z]) =>
      acc +
      (SIDES_OF_A_CUBE -
        dirs
          .map(([dx, dy, dz]) => String([x + dx, y + dy, z + dz]))
          .filter(pos => set.has(pos)).length),
    0
  )

  console.log(res)
}

main()

