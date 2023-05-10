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

  const bound = [0, 4000000]

  let res

  const getUnion = ranges => {
    const union = []
    ranges.sort(
      (rangeA, rangeB) => rangeA[0] - rangeB[0] || rangeA[1] - rangeB[1]
    )
    for (const [start, end] of ranges) {
      const latestUnionRange = union.slice(-1)[0]
      if (latestUnionRange && latestUnionRange[1] >= start - 1) {
        latestUnionRange[1] = Math.max(latestUnionRange[1], end)
      } else {
        union.push([start, end])
      }
    }

    return union
  }

  for (let targetY = 0; targetY <= bound[1]; targetY++) {
    let xRanges = []
    for (const [sensor, beacon, distance] of coords) {
      const absX = distance - Math.abs(targetY - sensor[1])
      if (absX < 0) continue
      const possibleXs = [sensor[0] + absX, sensor[0] - absX].sort(
        (a, b) => a - b
      )
      possibleXs[0] = Math.max(bound[0], possibleXs[0])
      possibleXs[1] = Math.min(bound[1], possibleXs[1])

      xRanges.push(possibleXs)
      xRanges.push(
        ...[sensor, beacon]
          .filter(([x, y]) => y === targetY && bound[0] <= x && x <= bound[1])
          .map(([x]) => [x, x])
      )
    }

    const union = getUnion(xRanges)

    if (union.length === 2) {
      const coord = [union[0][1] + 1, targetY]
      res = coord[0] * bound[1] + coord[1]
      break
    }
  }

  console.log(res)
}

main()