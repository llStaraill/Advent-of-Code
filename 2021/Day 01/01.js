const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

const input = fs.readFileSync(fileName, "utf-8").split(/\n/).map(Number);

let partOne = 0;
let partTwo = 0;

const comparePartOne = (el, index) => el < input[index + 1] && partOne++;

const comparePartTwo = (_, index) =>
  input[index] + input[index + 1] + input[index + 2] <
    input[index + 1] + input[index + 2] + input[index + 3] && partTwo++;

input.forEach(comparePartOne);
input.forEach(comparePartTwo);

console.log(partOne, partTwo);
