const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8").split(/\n/);

function regexOne(string) {
  let containsThreeVowelsMatch = string.match(
    /([aeiou]).*([aeiou]).*([aeiou])/
  );
  let doubleLetter = string.match(/([a-z])\1/);
  let noNaughtySequence = string.match(/(ab)|(cd)|(pq)|(xy)/);
  return (
    noNaughtySequence === null &&
    doubleLetter !== null &&
    containsThreeVowelsMatch !== null
  );
}

function regexTwo(string) {
  let letterRepeatMatch = string.match(/([a-z])([a-z])\1/);
  let doubleLetterMatch = string.match(/([a-z][a-z])(\w*)\1/);

  return letterRepeatMatch !== null && doubleLetterMatch !== null;
}

function checkIfNaughtyOrNice(inputList, part) {
  let niceCounter = 0;
  const regexer = (string) =>
    part === 1 ? regexOne(string) : regexTwo(string);

  inputList.map((string) => {
    regexer(string) ? niceCounter++ : null;
  });
  return niceCounter;
}

const partOne = checkIfNaughtyOrNice(input, 1); // 258

const partTwo = checkIfNaughtyOrNice(input, 2); // 53
console.log(partOne, partTwo);
