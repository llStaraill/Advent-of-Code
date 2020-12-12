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
  console.log(arr);
  for (let i = 0; i < inputArr.length - 1; i++) {
    let plusOne = arr[i] + 1;
    let plusTwo = arr[i] + 2;
    let plusThree = arr[i] + 3;

    let options = [plusOne, plusTwo, plusThree].filter(
      (el) => arr.indexOf(el) !== -1
    );

    console.log(options);
  }
}

partTwo(input);
console.log(amountOfPermutations);
