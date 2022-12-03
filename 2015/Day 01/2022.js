const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split("")
  .map((el) => (el === "(" ? 1 : -1));

const partOne = input.reduce((acc, curr) => acc + curr);
// console.log(partOne);

const partTwo = input.slice(0).reduce((acc, curr, index, arr) => {
  if (acc === -1) {
    arr.splice(0);
    return index;
  }
  return acc + curr;
});

console.log(partTwo);
