const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs
  .readFileSync(fileName, "utf-8")
  .split("\n")
  .map((line) => line.split("").map(Number));

/** Helper  */
const rotateClockwise = (arr) =>
  arr[0].map((column, index) =>
    arr.map((row) => row[index]).filter((el) => el !== " ")
  );

/** Prepare  */

const totalCount = input
  .map((el) => el.length)
  .reduce((acc, curr) => acc + curr);

const horizontalMatrix = JSON.parse(JSON.stringify(input));
// Rotate Grid for easier comparison
const verticalMatrix = rotateClockwise(JSON.parse(JSON.stringify(input)));

/**
 * PART TWO
 */

const scenicScoreMap = new Map();

const getOrInitMapEntry = (x, y) => {
  const key = [x, y].toString();
  return scenicScoreMap.has(key)
    ? scenicScoreMap.get(key)
    : { l: 0, r: 0, u: 0, d: 0 };
};

const setMapEntry = (x, y, value) => {
  const key = [x, y].toString();
  scenicScoreMap.set(key, value);
};

const getNegativeAndPositiveCount = (arr, index) => {
  const negative = arr.slice(0, index);
  const positive = arr.slice(index + 1);

  return [negative, positive];
};

const getHeightCount = (list, size) => {
  let count = 0;
  let tmpHeight = 0;

  const isVisible = (currentTree) =>
    currentTree < size && currentTree >= tmpHeight;

  for (let i = 0; i <= list.length; i++) {
    const currentTree = list[i];
    if (currentTree >= size) {
      count++;
      break;
    }
    if (isVisible(currentTree)) {
      count++;
      tmpHeight = currentTree;
    }
  }

  //   console.log({ size, list, count });
  return count;
};

const checkTreeScenicScore = (arr, vertical = false) => {
  const treeList = JSON.parse(JSON.stringify(arr));

  for (let y = 0; y < treeList.length; y++) {
    // if (y === 0 || y === y.length) continue; // Skip Edges
    for (let x = 0; x < treeList[y].length; x++) {
      //   if (x === 0 || x === x.length) continue; // Skip Edges

      const currentTree = treeList[y][x];

      const [negative, positive] = getNegativeAndPositiveCount(treeList[y], x);
      const negativeCount = getHeightCount(negative.reverse(), currentTree); // Reverse for iterating in correct direction
      const positiveCount = getHeightCount(positive, currentTree);

      let mapEntry;

      if (vertical) {
        // Coordinates are swapped due to rotation
        mapEntry = getOrInitMapEntry(y, x);
        mapEntry.u = negativeCount;
        mapEntry.d = positiveCount;
        setMapEntry(y, x, mapEntry);
      } else {
        mapEntry = getOrInitMapEntry(x, y);
        mapEntry.l = negativeCount;
        mapEntry.r = positiveCount;
        setMapEntry(x, y, mapEntry);
      }
    }
  }
};

checkTreeScenicScore(horizontalMatrix);
checkTreeScenicScore(verticalMatrix, true);

const scenicScoreMapList = Array.from(scenicScoreMap.entries())
  .map(([coord, value]) => [
    coord,
    { ...value, count: value.l * value.r * value.u * value.d },
  ])
  .sort((a, b) => b[1].count - a[1].count);
//   .sort((a, b) => a[0] - b[0]);

console.log(scenicScoreMapList[0]);

// console.log({
//   scenicScoreMapListLength: scenicScoreMapList.length,
//   totalCount,
// });
