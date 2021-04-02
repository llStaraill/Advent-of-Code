const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split(/\n/)
  .map(Number)
  .sort((a, b) => a - b);

input.unshift(0);
input.push(input[input.length - 1] + 3);

function partOne() {
  let ones = 0;
  let threes = 0;

  for (let i = 0; i < input.length; i++) {
    let curr = input[i];
    let prev = input[i - 1] || 0;

    if (curr - prev === 1) {
      ones++;
    } else if (curr - prev === 3) {
      threes++;
    }
  }
  return ones * threes;
}

//let part1 = partOne();

let amountOfPermutations = 1;

function partTwo(inputArr) {
  let arr = [...inputArr];
  if (arr.length === 0) {
    return;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    let plusOne = arr[i] + 1;
    let plusTwo = arr[i] + 2;
    let plusThree = arr[i] + 3;
    let checkRange = [arr[i + 1], arr[i + 2], arr[1 + 3]];

    if (arr[i + 1] !== arr[i] + 3) {
      if (arr[i + 1] == arr[i] + 2) amountOfPermutations++;
      else if (arr[i + 1] === arr[i] + 1) {
        amountOfPermutations++;
      }
    }
  }
}

partTwo(input);
console.log(amountOfPermutations);
