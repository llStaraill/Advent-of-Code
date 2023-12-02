const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

/** Global Helper */

const log = (val, forceLog = false) => {
  if ((args[1] && args[1].includes("l")) || forceLog) {
    console.log(val);
  }
};
const deepCopy = (val) => JSON.parse(JSON.stringify(val));

/** Get Input */

let input = fs.readFileSync(fileName, "utf-8").split("\n");

/** Part One */

const partOne = input
  .map((row) => {
    const parsedRow = row.replaceAll(/\D/g, "");
    return parseInt(parsedRow[0] + parsedRow[parsedRow.length - 1]);
  })
  .reduce((a, b) => a + b);

// console.log(partOne);

/** Part Two */

const NUMBER = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberKeys = Object.keys(NUMBER);

const partTwo = input
  .map((row) => {
    let tempRow = row;
    numberKeys.forEach((number) => {
      tempRow = tempRow.replaceAll(number, number + number[number.length - 1]);
    });

    const parsedRow = tempRow
      .match(/\d|one|two|three|four|five|six|seven|eight|nine/g)
      .map((num) => (isNaN(parseInt(num)) ? NUMBER[num] : num))
      .join("");

    return parseInt(parsedRow[0] + parsedRow[parsedRow.length - 1]);
  })
  .reduce((a, b) => a + b);

console.log(partTwo);

/**
 * In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
 */
