/**PART 1 */
const summonPuzzleInput = async (day) => {
  const response = await fetch(
    `https://adventofcode.com/2022/day/${day}/input`
  );
  const responseText = await response.text();
  return responseText.trim();
};

const puzzleInput = await summonPuzzleInput(3);

const sumReducer = (sum, num) => sum + num;
const rucksacks = puzzleInput.split("\n");

//find the common item for each rucksack
const findCommonItem = (rucksack) => {
  //divide tthe string into two halves
  const halfIndex = rucksack.length / 2;
  const [firstHalf, secondHalf] = [
    rucksack.slice(0, halfIndex),
    rucksack.slice(halfIndex),
  ];

  const firstHalfSet = new Set(firstHalf);

  //find the characters of the second half that's also in the first half
  const commonItem = [...secondHalf].find((item) => firstHalfSet.has(item));

  //return that character (there sould be only one)
  return commonItem;
};

//find the priority of each item
const getItemPriority = (item) =>
  item.charCodeAt() - (/[a-z]/.test(item) ? 96 : 38);

//add them all up
const commonItems = rucksacks.map(findCommonItem);
const itemPriorities = commonItems.map(getItemPriority);

//add them all up
const prioritySum = rucksacks
  .reduce((arr, item)=>[...arr, findCommonItem(item)], [])
  .map(getItemPriority)
  .reduce(sumReducer, 0);




console.log(prioritySum);



/*PART 2*/
// divide the rucksacks into groups of 3
const getGrupsOf3 = (arr) =>
  arr.length ? [arr.slice(0, 3), ...getGrupsOf3(arr.slice(3))] : [];

//find the common item for each group of 3
const findCommonItemInGroupOf3 = ([sack1, sack2, sack3]) => {

  // convert the first two groups into sets
  const [set1, set2] = [new Set(sack1), new Set(sack2)];

  //find the item in group 3 thats'a in both sets
  return [...sack3].find(
    (item) => set1.has(item) && set2.has(item)
  );

  return commonItem;
};

//find the priorities

//add them all up
const prioritySumOfGroups = getGrupsOf3(rucksacks)
  .map(findCommonItemInGroupOf3)
  .map(getItemPriority)
  .reduce(sumReducer, 0);

console.log(prioritySumOfGroups);