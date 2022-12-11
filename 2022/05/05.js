const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs.readFileSync(fileName, "utf-8");

/**
 * Separate Stacks from Commands
 * Parse the commands into [count, from, to]
 * Rotate the Stack Matrix clockwise
 * Run the cmdList
 * Remove [count] amount from the [from] stack in a tmp array
 * Reverse the tmpArray
 * Add the reversedTmpArray to the [To] stack
 * read out the last entries per stack
 */

const [stackMatrixRaw, commandListRaw] = input.split("\n\n");

const parseCommandList = (arr) =>
  arr
    .split(/\n/)
    .map(
      (line) =>
        line.match(/move (?<count>\d+) from (?<from>\d) to (?<to>\d)/).groups
    );

const parseStackMatrix = (arr) =>
  arr.split("\n").map((el) => {
    const temp = [];

    for (let i = 0; i < el.length; i += 4) {
      temp.push(el[i + 1]);
    }

    return temp;
  });

const rotateClockwise = (arr) =>
  arr[0].map((column, index) =>
    arr.map((row) => row[index]).filter((el) => el !== " ")
  );

const commandList = parseCommandList(commandListRaw);

const stackMatrix = parseStackMatrix(stackMatrixRaw);

const rotatedStackMatrix = rotateClockwise(stackMatrix);

const runCommandList = (cmds, arr, reverse = false) => {
  const stacks = JSON.parse(JSON.stringify(arr)); // Deep Copy array to prevent mutation
  cmds.forEach(({ count, from, to }) => {
    const crates = stacks[from - 1].splice(0, count);

    if (reverse) {
      crates.reverse();
    }

    stacks[to - 1].unshift(...crates);
  });

  return stacks.map((el) => el[0]).join("");
};

const partOne = runCommandList(commandList, rotatedStackMatrix, true);
const partTwo = runCommandList(commandList, rotatedStackMatrix);

console.log(partOne, partTwo);
// console.log(partTwo);
