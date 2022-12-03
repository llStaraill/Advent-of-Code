const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

const input = fs.readFileSync(fileName, "utf-8").split("\n");

const add = (acc, curr) => acc + curr;

const splitContent = (content) => {
  const halfIndex = content.length / 2;
  let first = content.slice(0, halfIndex);
  let second = content.slice(halfIndex, content.length);

  return [first, second];
};

const getCharValue = (letter) => {
  const substractor =
    letter.toUpperCase() === letter
      ? 64 - 26 // charCode reset to 1 + 26
      : 96; // charCode reset to 1

  return letter.charCodeAt() - substractor;
};

const partOne = input
  .map((content) => {
    const [first, second] = splitContent(content);

    let containedInBoth;

    first.split("").find((letter) => {
      if (second.includes(letter)) {
        containedInBoth = letter;
      }
    });

    const priority = getCharValue(containedInBoth);
    return priority;
  })
  .reduce(add);

const chunkIt = (arr, chunkSize) => {
  let list = [];
  const copiedArr = [...arr];

  do {
    list.push(copiedArr.splice(0, chunkSize));
  } while (copiedArr.length > 0);

  return list;
};

const partTwo = chunkIt(input, 3)
  .map(([first, second, third]) => {
    let containedInAll;

    first.split("").find((letter) => {
      if (second.includes(letter) && third.includes(letter)) {
        containedInAll = letter;
      }
    });

    return getCharValue(containedInAll);
  })
  .reduce(add);

console.log(partTwo);
console.log(input);
