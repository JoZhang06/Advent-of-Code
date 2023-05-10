const fs = require("fs")

const coordToStr = ([x, y]) => `${x} ${y}`

const calculateDistance = ([x1, y1], [x2, y2]) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

const readData = () => {
  const data = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\r?\n/)
    .map(line => line.match(/-?\d+/g).map(Number))
    .map(([x1, y1, x2, y2]) => [
      [x1, y1],
      [x2, y2],
    ])
    .map(([sensor, beacon]) => [
      sensor,
      beacon,
      calculateDistance(sensor, beacon),
    ])

  const set = new Set()

  for (const [sensor, beacon] of data) {
    set.add(coordToStr(sensor))
    set.add(coordToStr(beacon))
  }

  return { coords: data, set }
}

const main = () => {
  const { coords, set } = readData()

  const targetY = 2000000
  let res = 0

  for (const [sensor, beacon, distance] of coords) {
    const absX = distance - Math.abs(targetY - sensor[1])
    if (absX < 0) continue
    const possibleXs = [sensor[0] + absX, sensor[0] - absX].sort(
      (a, b) => a - b
    )
    for (let x = possibleXs[0]; x <= possibleXs[1]; x++) {
      if (!set.has(coordToStr([x, targetY]))) {
        res++
        set.add(coordToStr([x, targetY]))
      }
    }
  }

  console.log(res)
}

main()

