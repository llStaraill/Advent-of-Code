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
        return console.log(amountOfPermutations)
    }

    let plusOne = arr[0] + 1;
    let plusTwo = arr[0] + 2;
    let plusThree = arr[0] + 3;

    let options = [plusOne, plusTwo, plusThree].filter(
        (el) => arr.indexOf(el) !== -1
    );

    if (options.length > 1) {
        amountOfPermutations += options.length - 1;
    }

    options.map(el => {
        let newArr = [...arr].slice(arr.indexOf(el));
        partTwo(newArr)
    })

}

partTwo(input);
console.log(amountOfPermutations);