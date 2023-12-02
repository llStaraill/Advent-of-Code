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

/** Get Input */

let input = fs
  .readFileSync(fileName, "utf-8")
  .split("\n")
  .map((el) =>
    el
      .split("")
      .map((el) => (el !== "S" && el !== "E" ? el.charCodeAt() - 96 : el))
  );

/** Part One */

const findStartPoint = (hMap) => {
  let coord = [];

  hMap.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      if (col === "S") {
        coord = [rowIndex, colIndex];
      }
    })
  );

  return { y: coord[0], x: coord[1] };
};

const isViableStep = (currStep, step) => {
  const currentStepValue = currStep === "S" ? 0 : currStep;
  return currentStepValue + 2 > step;
};
const isViableNode = (hMap, y, x) => !!hMap[y] && !!hMap[y][x];

const getPossibleNodes = (hMap, { y, x }) => {
  let nodeList = [];
  let currNode = hMap[y][x];

  // Check up  y - 1

  if (isViableNode(hMap, y - 1, x) && isViableStep(currNode, hMap[y - 1][x])) {
    nodeList.push({ y: y - 1, x });
  }
  // Check down y + 1

  if (isViableNode(hMap, y + 1, x) && isViableStep(currNode, hMap[y + 1][x])) {
    nodeList.push({ y: y + 1, x });
  }
  // Check left x - 1
  if (isViableNode(hMap, y, x - 1) && isViableStep(currNode, hMap[y][x - 1])) {
    nodeList.push({ y, x: x - 1 });
  }
  // Check right x + 1
  if (isViableNode(hMap, y, x + 1) && isViableStep(currNode, hMap[y][x + 1])) {
    nodeList.push({ y, x: x + 1 });
  }

  return nodeList;
};

class Node {
  constructor(y, x, prev) {
    this.prev = prev;
    this.nodes = [];
    this.y = y;
    this.x = x;
    this.id = `[${y},${x}]`;
  }

  addNode(y, x) {
    this.nodes.push(new Node(y, x, this));
  }
}

class Graph {
  constructor(y, x) {
    this.root = new Node(y, x, null);
  }
}

const traverseMap = (input) => {
  const heightMap = deepCopy(input);

  // Find Starting point
  const { y, x } = findStartPoint(heightMap);

  const heightGraph = new Graph(y, x);

  // Check where it can go
  const nodeList = getPossibleNodes(heightMap, { y, x });

  nodeList.forEach((node) => {
    heightGraph.root.addNode(node.y, node.x);
  });

  // Create two Path Options

  log(heightGraph.root);
};

traverseMap(input);
/** Part Two */
