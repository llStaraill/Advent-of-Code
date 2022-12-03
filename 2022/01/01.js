const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs.readFileSync(fileName, "utf-8");

const parsedInput = input
  .split("\n\n")
  .map((el) =>
    el
      .split("\n")
      .map(Number)
      .reduce((acc, curr) => acc + curr)
  )
  .sort((a, b) => b - a);

const partOne = parsedInput[0];

const partTwo = parsedInput.slice(0, 3).reduce((acc, curr) => acc + curr);

console.log({ partOne }, { partTwo });
