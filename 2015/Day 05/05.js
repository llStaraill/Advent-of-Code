const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8").split(/\n/);

function isWithoutNaughtySequence(string) {
  let hasNaughtySequence = false;
  let sequenceList = ["ab", "cd", "pq", "xy"];
  sequenceList.map((sequence) => {
    if (string.includes(sequence)) {
      hasNaughtySequence = true;
    }
  });
  return !hasNaughtySequence;
}

function hasThreeVowels(string) {
  let vowelList = ["a", "e", "i", "o", "u"];
  let vowelCount = 0;
  let letterList = string.split("");
  letterList.map((letter) => {
    if (vowelList.indexOf(letter) !== -1) {
      vowelCount++
    }
  });
  return vowelCount >= 3 ? true : false;
}

function hasDoubleLetters(string) {
  let letterList = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let stringHasDoubleLetters = false;
  letterList.map((letter) => {
    let doubeLetter = `${letter}${letter}`;
    if (string.includes(doubeLetter)) {
      stringHasDoubleLetters = true;
    }
  });
  return stringHasDoubleLetters;
}

function isNice(string) {
  return (
    hasDoubleLetters(string) &&
    isWithoutNaughtySequence(string) &&
    hasThreeVowels(string)
  );
}

function checkIfNaughtyOrNice(inputList) {
  let niceCounter = 0;
  inputList.map((string) => {
    if (isNice(string)) {
      niceCounter++;
    }
  });
  return niceCounter;
}

const partOne = checkIfNaughtyOrNice(input);

console.log(partOne);
