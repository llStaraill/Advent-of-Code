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

const cleanUpNumbers = (numberString) =>
  numberString
    .split(" ")
    .filter((nbr) => nbr !== "")
    .map((nbr) => parseInt(nbr));

const partOne = input
  .map((row) => row.split("|"))
  .map((row) => {
    const [winningString, drawString] = row;

    const winningNumbers = cleanUpNumbers(
      winningString.replace(/Card.+\d+:/g, "")
    );

    const drawNumbers = cleanUpNumbers(drawString);

    const winnings = winningNumbers.filter((nbr) => drawNumbers.includes(nbr));

    const score = winnings.length > 0 ? Math.pow(2, winnings.length - 1) : 0;

    log({
      winningString,
      score,
      winnings,
      winningNumbers,
      drawNumbers,
    });
    return score;
  })
  .reduce((a, b) => a + b);

console.log({ partOne });

/** Part Two */

const winningMap = new Map();

const mapIt = (row) => {
  let winningArr = [];
  const [winningString, drawString] = row;
  const winningId = winningString.match(/Card.+\d+:/g);
  const winningIndex = parseInt(
    winningId[0].replace(":", "").replace("Card ", "")
  );
  const currValue = winningMap.get(winningIndex);
  winningMap.set(winningIndex, currValue ? currValue + 1 : 1);
  const winningNumbers = cleanUpNumbers(
    winningString.replace(/Card.+\d+:/g, "")
  );

  const drawNumbers = cleanUpNumbers(drawString);

  const winnings = winningNumbers.filter((nbr) =>
    drawNumbers.includes(nbr)
  ).length;

  if (winnings > 0) {
    winningArr = input.slice(winningIndex, winningIndex + winnings);

    winningArr.map((row) => mapIt(row.split("|")));
  }
};

input.map((row) => row.split("|")).map((row) => mapIt(row));

const partTwo = Array.from(winningMap.values()).reduce((a, b) => a + b);

console.log(partTwo);
