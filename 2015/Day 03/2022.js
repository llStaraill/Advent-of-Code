const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8").split("");

const dirKey = {
  "<": -1,
  ">": 1,
  "^": -1,
  v: 1,
};

const isHorizontal = (entry) => entry === "<" || entry === ">";
const getMapKey = (coord) => coord.join(",");

const getAxis = (dir) => (isHorizontal(dir) ? 0 : 1);

// Part One
const santaSet = new Set(["0,0"]);
let coord = [0, 0];

input.forEach((dir) => {
  const axis = getAxis(dir);
  coord[axis] += dirKey[dir];

  santaSet.add(getMapKey(coord));
});

// Part Two
const duoSantaSet = new Set(["0,0"]);
const duoCoord = { santa: [0, 0], robot: [0, 0] };

input.forEach((dir, index) => {
  const sledge = index % 2 === 0 ? "robot" : "santa";
  const axis = getAxis(dir);

  duoCoord[sledge][axis] += dirKey[dir];
  duoSantaSet.add(getMapKey(duoCoord[sledge]));
});

const partOne = santaSet.size;
const partTwo = duoSantaSet.size;

console.log(partOne, partTwo);
