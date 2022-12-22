const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs
  .readFileSync(fileName, "utf-8")
  .split("\n")
  .map((line) => line.split("").map(Number));

/**
 * Count Trees
 * Check if   x-1 > x or x < x+ / y-1 > y < y+1
 * First check x-1
 * Then check x+
 *
 */

/** Helper  */
const rotateClockwise = (arr) =>
  arr[0].map((column, index) =>
    arr.map((row) => row[index]).filter((el) => el !== " ")
  );

/** Prepare  */

const horizontalMatrix = JSON.parse(JSON.stringify(input));
// Rotate Grid for easier comparison
const verticalMatrix = rotateClockwise(JSON.parse(JSON.stringify(input)));

const visibleTree = new Set();

const hasZeroEntries = (arr) => arr.length < 1;
const hasSmallerEntries = (arr, size) =>
  arr.filter((el) => el < size).length === arr.length;
const addTree = (x, y) => visibleTree.add([x, y].toString());

const checkTreeVisibility = (arr, vertical = false) => {
  const treeList = JSON.parse(JSON.stringify(arr));

  for (let y = 0; y < treeList.length; y++) {
    for (let x = 0; x < treeList[y].length; x++) {
      const currentTree = treeList[y][x];

      const left = treeList[y].slice(0, x);

      if (hasZeroEntries(left)) {
        if (vertical) {
          addTree(y, x);
        } else {
          addTree(x, y);
        }
        continue;
      }

      if (hasSmallerEntries(left, currentTree)) {
        if (vertical) {
          addTree(y, x);
        } else {
          addTree(x, y);
        }
        continue;
      }

      const right = treeList[y].slice(x + 1);
      if (hasZeroEntries(right)) {
        if (vertical) {
          addTree(y, x);
        } else {
          addTree(x, y);
        }
        continue;
      }

      if (hasSmallerEntries(right, currentTree)) {
        if (vertical) {
          addTree(y, x);
        } else {
          addTree(x, y);
        }
        continue;
      }
    }
  }
};

// checkTreeVisibility(horizontalMatrix);
// checkTreeVisibility(verticalMatrix, true);

const partOne = visibleTree.size;
// console.log(visibleTree);
// console.log({ partOne });
