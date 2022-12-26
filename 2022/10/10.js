const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "run" ? "./input" : "./demo";

/** Global Helper */

const log = (val, forceLog = false) => {
  const includesLogFlag = args.find((arg) => arg.includes("-l"));
  if (includesLogFlag || forceLog) {
    console.log(val);
  }
};
const deepCopy = (val) => JSON.parse(JSON.stringify(val));

/** Get Input */

let input = fs.readFileSync(fileName, "utf-8").split("\n");

/** Part One */

let doList = [];

const readCmd = (cmd) => {
  if (cmd.includes("addx ")) {
    const [_, val] = cmd.split(" ");
    return parseInt(val);
  }

  return 0;
};

const cycleThrough = (rawInput, breakCondition, cb) => {
  const cmdList = deepCopy(rawInput);
  let x = 1;
  let cycle = 0;
  let addXVal = 0;

  while (breakCondition(cycle)) {
    // log(`\n\t=== Cycle ${cycle} ===\n\t    x === ${x}`);
    cb(cycle, x);

    if (addXVal !== 0) {
      x += addXVal;
      addXVal = 0;

      cycle++;
      continue;
    }

    if (cmdList.length > 0) {
      const cmd = cmdList.shift();

      addXVal = readCmd(cmd);
      cycle++;
      continue;
    }
  }

  return cycleValues;
};

let cycleValues = [];
const calcValue = (cycle, x) => {
  if ([20, 60, 100, 140, 180, 220].find((el) => el === cycle)) {
    cycleValues.push(x * cycle);
  }
};

const lowerThanTwoTwentyOne = (cycle) => cycle < 220;

// cycleThrough(input, lowerThanTwoTwentyOne, calcValue);

// const partOne = cycleValues.reduce((acc, curr) => acc + curr);

// log(partOne, true);
/** Part Two */

const ctr = deepCopy(new Array(6).fill(new Array(40).fill(".")));

const lowerThanTwoFourtyOne = (cycle) => cycle < 240;

const drawStuff = (cycle, x) => {
  const row = Math.floor(cycle / 40);
  const column = cycle - 40 * row;

  const calculatedCycle = Math.floor(cycle - 40 * row);
  const isLit =
    calculatedCycle === x ||
    calculatedCycle === x - 1 ||
    calculatedCycle === x + 1;

  // log(
  //   `light: ${isLit} - r: ${row} | c: ${column} | cycle: ${calculatedCycle} / x: ${x}`
  // );
  if (isLit) {
    ctr[row][column] = "#";
  }

  // log(`c: ${cycle} / c_ ${column} / r: ${row}`);
};

cycleThrough(input, lowerThanTwoFourtyOne, drawStuff);

log(
  ctr.map((row) => row.join("")),
  true
);
