const commands = ["noop", "addx 22", "addx -17", "addx 1", "addx 4", "addx 17", "addx -16", "addx 4", "addx 1", "addx 21", "addx -17", "addx -10", "noop", "addx 17", "addx -1", "addx 5", "addx -1", "noop", "addx 4", "addx 1", "noop", "addx -37", "addx 5", "addx 27", "addx -22", "addx -2", "addx 2", "addx 5", "addx 2", "addx 5", "noop", "noop", "addx -2", "addx 5", "addx 16", "addx -11", "addx -2", "addx 2", "addx 5", "addx 2", "addx -8", "addx 9", "addx -38", "addx 5", "addx 20", "addx -16", "addx 8", "addx -5", "addx 1", "addx 4", "noop", "noop", "addx 5", "addx -2", "noop", "noop", "addx 18", "noop", "addx -8", "addx 2", "addx 7", "addx -2", "noop", "noop", "noop", "noop", "noop", "addx -35", "noop", "addx 32", "addx -26", "addx 12", "addx -8", "addx 3", "noop", "addx 2", "addx 16", "addx -24", "addx 11", "addx 3", "addx -17", "addx 17", "addx 5", "addx 2", "addx -15", "addx 22", "addx 3", "noop", "addx -40", "noop", "addx 2", "noop", "addx 3", "addx 13", "addx -6", "addx 10", "addx -9", "addx 2", "addx 22", "addx -15", "addx 8", "addx -7", "addx 2", "addx 5", "addx 2", "addx -32", "addx 33", "addx 2", "addx 5", "addx -39", "addx -1", "addx 3", "addx 4", "addx 1", "addx 4", "addx 21", "addx -20", "addx 2", "addx 12", "addx -4", "noop", "noop", "noop", "noop", "noop", "addx 4", "noop", "noop", "noop", "addx 6", "addx -27", "addx 31", "noop", "noop", "noop", "noop", "noop"];
function getPower(cycle, x) {
  if ((cycle - 20) % 40 === 0) {
    return (cycle * x);
  }
  return 0;
}

function updateScreen(cycle, x, screen) {
  const row = parseInt((cycle - 1) / 40);
  const col = (cycle - 1) % 40;

  if ([x - 1, x, x + 1].includes(col)) {
    screen[row][col] = "#";
  } else {
    screen[row][col] = ".";
  }

  return screen;
}

function solve(part) {
  let screen = new Array(6).fill(".").map(row => new Array(40).fill(" "));

  let cycle = 1;
  let x = 1;
  let sum = 0;
  for (command of commands) {
    if (command == "noop") {
      if (part === "part1") {
        sum += getPower(cycle, x);
      } else if (part === "part2") {
        screen = updateScreen(cycle, x, screen);
      }
      cycle++;
    } else {
      const splitCommand = command.split(" ");
      const update = +splitCommand[1];

      for (let loop = 0; loop < 2; loop++) {
        if (part === "part1") {
          sum += getPower(cycle, x);
        } else if (part === "part2") {
          screen = updateScreen(cycle, x, screen);
        }
        cycle++;
      }
      x += update;
    }
  }

  if (part === "part1") {
    console.log(sum)
  } else {
    screen.forEach(row => console.log(row.join("")));
  }
}
solve("part1");

solve("part2");