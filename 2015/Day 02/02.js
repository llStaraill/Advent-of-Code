const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split(/\n/)
  .map((dimension) => dimension.split("x").map(Number));

let wrappingPaper = 0;
let ribbonAmount = 0;

function calculateSurface(inputList) {
  inputList.map((dimension) => {
    let = [l, w, h] = [...dimension];

    let paperBoni = Math.min(l * w, w * h, h * l);
    let paperTotal = 2 * l * w + 2 * w * h + 2 * h * l + paperBoni;
    wrappingPaper += paperTotal;

    let sD = [l, w, h].sort((a, b) => a - b);
    ribbonAmount += 2 * sD[0] + 2 * sD[1] + l * w * h;
  });
}

calculateSurface(input);

const partOne = wrappingPaper; // 1606483
const partTwo = ribbonAmount; // 3842356

