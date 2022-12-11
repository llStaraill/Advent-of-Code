const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs.readFileSync(fileName, "utf-8").split("\n");

const createSectionList = (section) => {
  let tempArr = [];
  const [startValue, endValue] = section.split("-").map(Number);

  for (let i = startValue; i <= endValue; i++) {
    if (i.toString().length === 1) {
      tempArr.push(String(i).padStart(2, "0"));
    } else tempArr.push(String(i));
  }

  return tempArr.join(",");
};

const partOne = input
  .map((el) => el.split(",").map((code) => createSectionList(code)))
  .filter(
    ([first, second]) => first.includes(second) || second.includes(first)
  ).length;

const partTwo = input
  .map((el) => el.split(",").map((code) => createSectionList(code).split(",")))
  .filter(([first, second]) => first.find((el) => second.includes(el))).length;

console.log(partOne);
console.log(partTwo);
