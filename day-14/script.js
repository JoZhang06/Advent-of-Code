const fs = require("fs")

const coordToStr = ([x, y]) => `${x} ${y}`

const readData = () => {
  const data = fs
    .readFileSync("./input14.txt", "utf-8")
    .split(/\r?\n/)
    .map(line =>
      line.split(" -> ").map(number => number.split(",").map(Number))
    )

  let obstacles = new Set()
  let maxY = Number.NEGATIVE_INFINITY
  for (const line of data) {
    for (let i = 0; i < line.length - 1; i++) {
      let [x1, y1] = line[i]
      let [x2, y2] = line[i + 1]
        ;[x1, x2] = [x1, x2].sort((a, b) => a - b)
        ;[y1, y2] = [y1, y2].sort((a, b) => a - b)

      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          obstacles.add(coordToStr([x, y]))
          maxY = Math.max(maxY, y)
        }
      }
    }
  }

  return { obstacles, maxY }
}

const main = () => {
  const { obstacles, maxY } = readData()

  let res = 0

  const drop = ([x, y]) => {
    if (y > maxY) {
      // endless void
      return false
    }

    const dirs = [
      [0, 1], // down
      [-1, 1], // down left
      [1, 1], // down right
    ]

    for (let [dx, dy] of dirs) {
      const [newX, newY] = [x + dx, y + dy]
      if (!obstacles.has(coordToStr([newX, newY]))) {
        return drop([newX, newY])
      }
    }

    // comes to rest
    res++
    obstacles.add(coordToStr([x, y]))

    return true
  }

  while (1) {
    const hasNextDrop = drop([500, 0])
    if (!hasNextDrop) break
  }

  console.log(res)
}

main()
