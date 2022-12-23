const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

/** Global Helper */

const log = (val, forceLog = false) => {
  if ((args[1] && args[1].includes("l")) || forceLog) {
    console.log(val);
  }
};
const overWrite = (val) => JSON.parse(JSON.stringify(val));

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

const getAxis = (dir) => (dir === "U" || dir === "D" ? "y" : "x");
const isAddition = (dir) => dir === "U" || dir === "R";
const isTouching = (distance) => distance < 2;
const isNotDiagonally = (distance) => distance % 1 === 0;

const calculateDistance = (tail, head) => {
  // T -> H = H - T
  const x = Math.pow(head.x - tail.x, 2);
  const y = Math.pow(head.y - tail.y, 2);

  return Math.sqrt(x + y);
};

const travel = (rawInput) => {
  const cmdList = overWrite(rawInput);

  let positionHead = { x: 0, y: 0 };
  let positionTail = { x: 0, y: 0 };

  cmdList.forEach(([dir, val]) => {
    log(`\n\t== ${dir} ${val} ==`);
    const axis = getAxis(dir);

    for (i = 0; i < val; i++) {
      let previousHeadPosition = JSON.parse(JSON.stringify(positionHead));
      isAddition(dir) ? positionHead[axis]++ : positionHead[axis]--;

      // Calculate distance between Head and Tail
      const distance = calculateDistance(positionHead, positionTail);

      // Move Tail Accordingly

      if (isTouching(distance)) {
        log("\nTail & Head touch " + dir + val);
        continue;
      } else if (isNotDiagonally(distance)) {
        log("\nTail & head are not diagonally to each other " + dir + val);

        isAddition(dir) ? positionTail[axis]++ : positionTail[axis]--;
        addToSet(positionTail.x, positionTail.y);
      } else {
        log("\n Move diagonally to heads previous spot" + dir + val);

        positionTail = overWrite(previousHeadPosition);
        addToSet(positionTail.x, positionTail.y);
      }
    }
  });
};

travel(input);

log(tailSet.size, true);
