const fs = require("fs");
const crypto = require("crypto");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8");

const getHash = (code) => crypto.createHash("md5").update(code).digest("hex");

const mineAdventCoins = (input, leadingZeroes) => {
  const leadingZeroesString = new Array(leadingZeroes).fill(0).join("");

  for (let i = 0; ; i++) {
    const hash = getHash(input + i);

    if (hash.slice(0, leadingZeroes) === leadingZeroesString) return i;
  }
};

const partOne = mineAdventCoins(input, 5);
const partTwo = mineAdventCoins(input, 6);

console.log(partOne, partTwo);
