const summonPuzzleInput = async (day) => {
    const response = await fetch(
      `https://adventofcode.com/2022/day/${day}/input`
    );
    const responseText = await response.text();
    return responseText.slice(0, -1);
  };
  
  const puzzleInput = await summonPuzzleInput(5);
  
  const [stackPart, instructionsPart] = puzzleInput.split("\n\n");
  
  //represent the stacks as an array of strings
  const stackRows = stackPart.split("\n").slice(0, -1);
  const stackMatrix = stackRows.map((row) =>
    [...row].filter((_, i) => i % 4 === 1)
  );
  
  const howManyStacks = stackMatrix[0].length;
  
  const initialStacks = stackMatrix.reduce(
    (arr, row) =>
      row.reduce(
        (arr, char, j) =>
          char === " " ? arr : arr.map((str, k) => (j === k ? str + char : str)),
        arr
      ),
    Array(howManyStacks).fill("")
  );
  
  //write a function for moving the crates
  // const moveOneCrate = (stacks, from, to) => {
  //   const movedCrate = stacks[from - 1][0];
  //   return stacks.map((stack, i) =>
  //     i === from - 1 ? stack.slice(1) : i === to - 1 ? movedCrate + stack : stack
  //   );
  // };
  
  const reverse = (str) => [...str].reverse().join("");
  
  const moveCrates = (stacks, amount, from, to) =>
    stacks.map((stack, i) =>
      i === from - 1
        ? stack.slice(amount)
        : i === to - 1
        ? reverse(stacks[from - 1].slice(0, amount)) + stack
        : stack
    );
  
  const multiMoveCrates = (stacks, amount, from, to) =>
    stacks.map((stack, i) =>
      i === from - 1
        ? stack.slice(amount)
        : i === to - 1
        ? stacks[from - 1].slice(0, amount) + stack
        : stack
    );
  
  //parse the list of instructions and execute them
  const convertInstruction = (instructionStr) => {
    const [amount, from, to] = instructionStr
      .match(/move (\d+) from (\d+) to (\d)/)
      .slice(1)
      .map(Number);
    return [amount, from, to];
  };
  
  const instructions = instructionsPart.split("\n").map(convertInstruction);
  
  //PART 1
  const finalStacks = instructions.reduce(
    (stacks, [amount, from, to]) => moveCrates(stacks, amount, from, to),
    initialStacks
  );
  
  const stackTops = finalStacks.map((stack) => stack[0]).join("");
  
  console.log(stackTops);
  
  //PART 2
  const finalStacks2 = instructions.reduce(
    (stacks, [amount, from, to]) => multiMoveCrates(stacks, amount, from, to),
    initialStacks
  );
  
  const stackTops2 = finalStacks2.map((stack) => stack[0]).join("");
  
  console.log(stackTops2);