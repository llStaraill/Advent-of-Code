const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs.readFileSync(fileName, "utf-8");

const parseInput = (stream, count) => {
  const streamArr = stream.split("");
  let found = false;
  let index = 0;

  do {
    const tempSet = new Set(streamArr.slice(index, index + count));

    if (tempSet.size === count) {
      found = true;
    }

    index += 1;
  } while (!found && index < streamArr.length);

  return index + (count - 1);
};

const partOne = parseInput(input, 4);
const partTwo = parseInput(input, 14);

console.log(partOne, partTwo);
