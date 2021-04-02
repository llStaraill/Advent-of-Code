const fs = require("fs");
const crypto = require("crypto");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8");

function createHash(string) {
  return crypto.createHash("md5").update(string).digest("hex");
}



function findNumber(string, nr) {
  let number = 0;
  let startStringArr = new Array(nr).fill("0");
  let startString = startStringArr.join("");
  let currHash;

  do {
    currHash = createHash(`${string}${number}`);
    number++;
  } while (currHash.substring(0, nr) !== startString);

  return number - 1;
}

//const partOne = findNumber(input, 5); 
const partTwo = findNumber(input,6);
console.log(partTwo);

