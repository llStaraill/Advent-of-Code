const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs.readFileSync(fileName, "utf-8");

const [matrix, cmdString] = input.split("\n\n");

function rotateClockwise(a) {
  var n = a.length;
  for (var i = 0; i < n / 2; i++) {
    for (var j = i; j < n - i - 1; j++) {
      var tmp = a[i][j];
      a[i][j] = a[n - j - 1][i];
      a[n - j - 1][i] = a[n - i - 1][n - j - 1];
      a[n - i - 1][n - j - 1] = a[j][n - i - 1];
      a[j][n - i - 1] = tmp;
    }
  }
  return a;
}

const cmdList = cmdString.split("\n").map((string) => {
  const match = string.match(
    /move (?<amount>\d+) from (?<from>\d) to (?<to>\d)/
  );

  const { amount, from, to } = match.groups;

  return { amount, from: from - 1, to: to - 1 };
});

const parsedMatrix = matrix
  .split("\n")

  .map((el) => {
    const temp = [];

    for (let i = 0; i < el.length; i += 4) {
      temp.push(el[i + 1]);
    }

    return temp;
  });

parsedMatrix.pop();

// const flipMatrix = parsedMatrix.map((val, index) =>
//   parsedMatrix
//     .map((row) => row[index])
//     .reverse()
//     // .filter((char) => char !== " ")
// );

const flipMatrix = rotateClockwise(parsedMatrix);
// .map((el) =>
//   el.filter((char) => char !== " ")
// );

console.log(flipMatrix);

cmdList.forEach(({ amount, from, to }) => {
  console.log(amount, from, to);
  const crates = flipMatrix[from].splice(0, amount).reverse();

  flipMatrix[to].unshift(...crates);
});

const partOne = flipMatrix.map((el) => el[0]);

// console.log(partOne.join(""));

console.log(flipMatrix);
