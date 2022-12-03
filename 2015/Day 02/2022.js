const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8").split("\n");

const add = (acc, curr) => acc + curr;
const asc = (a, b) => a - b;

const getMeasures = (el) => el.split("x").map(Number);

const partOne = input
  .map((el) => {
    const [l, w, h] = getMeasures(el);
    const wrappingPaper = 2 * l * w + 2 * w * h + 2 * h * l;

    const slack = [l * w, w * h, h * l].sort(asc).slice(0, 1).reduce(add);

    return wrappingPaper + slack;
  })
  .reduce(add);

// console.log(partOne);

const partTwo = input
  .map((el) => {
    const [l, w, h] = getMeasures(el);

    const [first, second, third] = [l, w, h].sort(asc);

    const ribbon = first * 2 + second * 2 + first * second * third;

    return ribbon;
  })
  .reduce(add);

console.log(partTwo);
