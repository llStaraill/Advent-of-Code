const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split(/\n/)
  .map((el) => parseInput(el));

function parseInput(str) {
  let currLine = str.split("contain");

  //Unify content template
  let containerBag = currLine[0].replace(/\s/g, "").replace("bags", "bag");
  let contentBags = currLine[1].split(",").map((el) => {
    let amount = el.match(/\d+/) ? parseInt(el.match(/\d+/)[0]) : 0;
    let bag = el
      .replace(amount, "")
      .replace(/\s/g, "")
      .replace("bags", "bag")
      .replace(".", "");
    return [amount, bag];
  });

  return [containerBag, contentBags];
}

let amount = 0;
let bags = [];
function checkBag(arr, color) {
  arr.map((el) => {
    let containerBag = el[0];
    let contentBags = el[1];

    contentBags.map((li) => {
      let currBag = li[1];
      if (currBag.includes(color) && bags.indexOf(containerBag) === -1) {
        bags.push(containerBag);
        checkBag(arr, containerBag);
      }
    });
  });
}
checkBag(input, "shinygoldbag");
const part1 = bags.length;
