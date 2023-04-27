const fs = require("fs")

const readData = () => {
  const data = fs
    .readFileSync("./input11.txt", "utf-8")
    .split(/\r?\n/)
    .filter(Boolean)

  const monkeys = {}

  for (let i = 0; i < data.length; i += 6) {
    const monkeyNumber = i / 6
    monkeys[monkeyNumber] = {}
    monkeys[monkeyNumber].items = data[i + 1]
      .replace("Starting items: ", "")
      .trim()
      .replace(/,/g, "")
      .split(" ")
      .map(Number)

    monkeys[monkeyNumber].op = (() => {
      const [operator, operand2] = data[i + 2]
        .replace("Operation: new = old ", "")
        .trim()
        .split(" ")

      const isMirror = operand2 === "old"

      return {
        "+": (operand, isMirror) => x => x + (isMirror ? x : operand),
        "-": (operand, isMirror) => x => x - (isMirror ? x : operand),
        "*": (operand, isMirror) => x => x * (isMirror ? x : operand),
        "/": (operand, isMirror) => x => x / (isMirror ? x : operand),
      }[operator](+operand2, isMirror)
    })()

    monkeys[monkeyNumber].test = (() => {
      const divisibleBy = +data[i + 3].replace("Test: divisible by ", "").trim()
      const destMonkeyIfTrue = +data[i + 4]
        .replace("If true: throw to monkey ", "")
        .trim()
      const destMonkeyIfFalse = +data[i + 5]
        .replace("If false: throw to monkey ", "")
        .trim()

      return {
        divisibleBy,
        fn: x => x % divisibleBy === 0,
        destMonkeys: [destMonkeyIfFalse, destMonkeyIfTrue],
      }
    })()

    monkeys[monkeyNumber].itemsInspectedTimes = 0
  }

  return Object.values(monkeys)
}

const main = () => {
  const monkeys = readData()

  let numberOfRounds = 10000

  const modulo = monkeys
    .map(({ test: { divisibleBy } }) => divisibleBy)
    .reduce((acc, el) => acc * el, 1)

  while (numberOfRounds--) {
    for (const [monkeyNo, monkey] of Object.entries(monkeys)) {
      monkey.itemsInspectedTimes += monkey.items.length
      for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
        const item = monkey.items[itemIndex]
        let worryLevel = monkey.op(item)
        worryLevel = worryLevel % modulo
        const destMonkey = monkey.test.destMonkeys[+monkey.test.fn(worryLevel)]
        monkeys[monkeyNo].items.splice(itemIndex, 1)
        itemIndex--
        monkeys[destMonkey].items.push(worryLevel)
      }
    }
  }

  const result = monkeys
    .map(({ itemsInspectedTimes }) => itemsInspectedTimes)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, el) => acc * el, 1)

  console.log(result)
}

main()