const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8").split(/\n/);

const matchInstruction = (el) => {
  const match = el.match(/(?<cmd>\w+) (?<start>\d+,\d+) \w+ (?<end>\d+,\d+)/);
  const { cmd, start, end } = match.groups;

  return [cmd, start.split(",").map(Number), end.split(",").map(Number)];
};

const initializeMatrix = (gridSize = 3) => {
  return new Array(gridSize).fill(new Array(gridSize).fill(0));
};

const lightMatrix = initializeMatrix(1000);

input.forEach((el) => {
  const [cmdKey, start, end] = matchInstruction(el);

  for (let i = start[1]; i <= end[1]; i++) {
    for (let j = start[0]; j <= end[0]; j++) {
      if (cmdKey.includes("on")) lightMatrix[i][j] = 1;
      if (cmdKey.includes("off")) lightMatrix[i][j] = 0;
      if (cmdKey.includes("toggle")) {
        lightMatrix[i][j] = lightMatrix[i][j] === 1 ? 0 : 1;
      }
    }
  }
});

// console.log(lightMatrix);

const partOne = lightMatrix
  .map((el) => el.reduce((acc, curr) => acc + curr))
  .reduce((acc, curr) => acc + curr);

console.log(partOne);

// console.log(partOne);
