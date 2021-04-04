const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split(/\n/)
  .map((cmd) => cmd.replace(/\r/, ""))
  .map((cmd) => parseLine(cmd));

function parseLine(line) {
  let parsedLine = line.match(/^(.+?)(?=\s\d)/);
  let endCoordinates = line
    .match(/(\d+,\d+$)/)[0]
    .split(",")
    .map(Number);
  let startCoordinates = line
    .match(/(\d+,\d+) /)[0]
    .split(",")
    .map(Number);
  let cmd = {
    cmd: parsedLine[0].replace(" ", ""),
    start: { x: startCoordinates[0], y: startCoordinates[1] },
    end: { x: endCoordinates[0], y: endCoordinates[1] },
  };
  return cmd;
}

const gridSize = 1000;

function initMatrix(size) {
  let initArr = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    initArr.push(row);
  }
  return initArr;
}

function executeCmdsOne(line, gridMatrix) {
  for (let i = line.start.y; i <= line.end.y; i++) {
    for (let j = line.start.x; j <= line.end.x; j++) {
      switch (line.cmd) {
        case "turnon":
          gridMatrix[i][j] = 1;
          break;
        case "turnoff":
          gridMatrix[i][j] = 0;
          break;
        case "toggle":
          gridMatrix[i][j] = gridMatrix[i][j] === 0 ? 1 : 0;
      }
    }
  }
}

function executeCmdsTwo(line, gridMatrix) {
  for (let i = line.start.y; i <= line.end.y; i++) {
    for (let j = line.start.x; j <= line.end.x; j++) {
      switch (line.cmd) {
        case "turnon":
          gridMatrix[i][j]++;
          break;
        case "turnoff":
          gridMatrix[i][j] = (gridMatrix[i][j] - 1) < 0 ? 0 : gridMatrix[i][j]-1 ;
          break;
        case "toggle":
          gridMatrix[i][j] += 2;
      }
    }
  }
}

function countLightsOne(lightArr, size) {
  let lights = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (lightArr[i][j] === 1) {
        lights++;
      }
    }
  }
  return lights;
}

function countLightsTwo(lightArr, size) {
  let lights = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      lights += lightArr[i][j];
    }
  }
  return lights;
}

function followInstructions(instruction, part) {
  let gridMatrix = initMatrix(gridSize);
  let executeCmds = (cmd) =>
    part === 1
      ? executeCmdsOne(cmd, gridMatrix)
      : executeCmdsTwo(cmd, gridMatrix);
  let countLights = () =>
    part === 1
      ? countLightsOne(gridMatrix, gridSize)
      : countLightsTwo(gridMatrix, gridSize);

  instruction.map((cmd) => {
    executeCmds(cmd);
  });
  return countLights(gridMatrix, gridSize);
}
const partOne = followInstructions(input, 1);
const partTwo = followInstructions(input, 2);
console.log(partOne, partTwo);
