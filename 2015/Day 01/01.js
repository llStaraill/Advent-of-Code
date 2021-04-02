const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split('');

  function countUpsAndDowns(inputArr) {
    let floor = 0;
    inputArr.map((cmd, index) => {
      switch(cmd) {
        case '(' : floor++ ; break;
        case ')' : floor-- ; break;
      }
    })
    return floor;
  }

  const partOne = countUpsAndDowns(input); // 232
 
  function findBasementCmd(inputArr) {
    let floor = 0;
    for (let i = 0; i < inputArr.length; i++) {
      let cmd = inputArr[i];
      if (cmd === '(') {
        floor++;
      } else if (cmd === ')') {
        floor--
      }
      if (floor === -1) {
        return i+1
      }
    }
  }

  const partTwo = findBasementCmd(input); // 1783
