const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

/** Global Helper */

const log = (val, forceLog = false) => {
  if ((args[1] && args[1].includes("l")) || forceLog) {
    console.log(val);
  }
};
const deepCopy = (val) => JSON.parse(JSON.stringify(val));

const testArr = deepCopy(new Array(5).fill(new Array(6).fill(".")));

/** Get Input */

let input = fs
  .readFileSync(fileName, "utf-8")
  .split("\n")
  .map((line) =>
    line.split(" ").map((el, index) => (index === 1 ? parseInt(el) : el))
  );

/** Preparation */
const tailSet = new Set();

/** Helper */
const addToSet = (x, y) => tailSet.add([x, y].toString());
addToSet(0, 0); // Start Position

const getHeadAxis = (dir) => (dir === "U" || dir === "D" ? "y" : "x");
const isTouching = (distance) => distance < 2;
const isNotDiagonally = (distance) => distance % 1 === 0;

const calculateDistance = (tail, head) => {
  // T -> H = H - T
  const x = Math.pow(head.x - tail.x, 2);
  const y = Math.pow(head.y - tail.y, 2);

  return Math.sqrt(x + y);
};

const isPositiveHeadMovement = (dir) => dir === "U" || dir === "R";

const moveAllKnots = (knotListRaw) => {
  const knotList = deepCopy(knotListRaw);
  // log(deepCopy(knotList), true);

  input.forEach(([dir, val]) => {
    log(`\n\t== ${dir} ${val} ==`);

    for (let j = 0; j < val; j++) {
      log(`\nStep: ${j + 1}`);

      /** MOVE HEAD  */

      const headAxis = getHeadAxis(dir);

      isPositiveHeadMovement(dir)
        ? knotList[0][headAxis]++
        : knotList[0][headAxis]--;

      /** / MOVE HEAD */

      for (let i = 1; i < knotList.length; i++) {
        // GET DISTANCE BETWEEN KNOTS
        const distance = calculateDistance(
          deepCopy(knotList[i]),
          deepCopy(knotList[i - 1])
        );

        // DECIDE MOVEMENT PATTERN BASED ON DISTANCE VALUE
        if (isTouching(distance)) {
          log("\nTail & Head touch " + dir + val);
          continue;
        } else if (isNotDiagonally(distance)) {
          log("\nTail & head are not diagonally to each other " + dir + val);

          // GET AXIS TO MOVE KNOT ON
          const knotAxis =
            deepCopy(knotList[i].x) === deepCopy(knotList[i - 1].x) ? "y" : "x";

          // GET KNOT MOVEMENT DIRECTION & MOVE ACCORDINGLY
          const isPositiveTailMovement =
            deepCopy(knotList[i][knotAxis]) <
            deepCopy(knotList[i - 1][knotAxis]);

          isPositiveTailMovement
            ? knotList[i][knotAxis]++
            : knotList[i][knotAxis]--;
        } else {
          log("\n Move diagonally to catch up" + dir + val);

          // GET DIRECTION OF DIAGONAL MOVEMENT & MOVE ACCORDINGLY

          const xAxisAddition =
            deepCopy(knotList[i].x) < deepCopy(knotList[i - 1].x);
          const yAxisAddition =
            deepCopy(knotList[i].y) < deepCopy(knotList[i - 1].y);

          xAxisAddition ? knotList[i].x++ : knotList[i].x--;
          yAxisAddition ? knotList[i].y++ : knotList[i].y--;
        }

        // SAVE THE LAST KNOT TO THE MAP
        const lastKnot = knotList.slice(knotList.length - 1)[0];

        addToSet(lastKnot.x, lastKnot.y);
        // logMapPosition(knotList);
      }

      log(`\nEnd of Step: ${j + 1}`);
      log("--------------");
    }
    log("\t== End of CMD ==");
  });
};

const logMapPosition = (knotList) => {
  const copyTestArr = deepCopy(testArr);

  knotList.forEach((knot, index) => {
    copyTestArr[knot.y][knot.x] = index.toString();
  });

  copyTestArr[knotList[0].y][knotList[0].x] = "H";

  log(copyTestArr, true);
};

const partOneKnots = deepCopy(new Array(2).fill({ x: 0, y: 0 }));

// Part One

moveAllKnots(partOneKnots);

const partOne = tailSet.size;

log(partOne, true);

// Part Two

tailSet.clear(); // Reinitialize tailSet for counting partTwo
addToSet(0, 0);

const partTwoKnots = deepCopy(new Array(10).fill({ x: 0, y: 0 }));

moveAllKnots(partTwoKnots);

const partTwo = tailSet.size;
log(partTwo, true);
