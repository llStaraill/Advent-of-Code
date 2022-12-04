const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8").split(/\n/);

const hasThreeVowels = /(\w*[aeuio]\w*){3,}/;
const hasDoubleLetters = /(\w)\1/;
const hasForbiddenStrings = /(?:ab|cd|pq|xy)/;

const partOne = input.filter(
  (el) =>
    hasThreeVowels.test(el) &&
    hasDoubleLetters.test(el) &&
    !hasForbiddenStrings.test(el)
).length;

const hasPairOfLettersTwice = /(\w\w)(?:.*)\1/;
const hasRepeatingButSeparatedByOneLetter = /(\w)\w\1/;

const partTwo = input.filter(
  (el) =>
    hasPairOfLettersTwice.test(el) &&
    hasRepeatingButSeparatedByOneLetter.test(el)
).length;

console.log(partOne, partTwo);
