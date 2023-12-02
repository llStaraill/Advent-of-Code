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

const COLOR_CONFIG = {
  red: 12,
  green: 13,
  blue: 14,
};

const checkColorValidity = (colorString) => {
  const [value, color] = colorString.trimStart().split(" ");
  return COLOR_CONFIG[color] >= parseInt(value);
};

const partOne = input
  .map((row) => {
    const [gameId, gameDraw] = row.split(":");
    const gameSets = gameDraw.split(";").map((set) => set.split(","));
    const drawValidity = gameSets
      .map((set) =>
        set
          .map((color) => checkColorValidity(color))
          .reduce((a, b) => (!a ? false : b))
      )
      .reduce((a, b) => (!a ? false : b));

    if (drawValidity) return parseInt(gameId.split(" ")[1]);
  })
  .filter((val) => !!val)
  .reduce((a, b) => a + b);

// only 12 red cubes, 13 green cubes, and 14 blue cubes

// console.log({ partOne });

const partTwo = input
  .map((row) => {
    const [gameId, gameDraw] = row.split(":");
    const colorValues = { red: 0, blue: 0, green: 0 };

    const gameSets = gameDraw
      .split(";")
      .map((set) => set.split(","))
      .map((set) =>
        set.forEach((colorString) => {
          const [value, color] = colorString.trimStart().split(" ");
          if (colorValues[color] < parseInt(value)) {
            colorValues[color] = parseInt(value);
          }
        })
      );

    return colorValues.red * colorValues.blue * colorValues.green;
  })
  .reduce((a, b) => a + b);

console.log({ partTwo });
