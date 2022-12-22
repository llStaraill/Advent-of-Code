const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs.readFileSync(fileName, "utf-8").split(/\n/);

class TreeNode {
  constructor(id, parent) {
    this.id = id;
    this.parent = parent;
    this.files = [];
    this.children = [];
  }

  addChild(id) {
    this.children.push(new TreeNode(id, this));
  }
  addFile(id, size) {
    this.files.push(new File(id, size));
  }
  getChildById(id) {
    return this.children.filter((node) => node.id === id)[0];
  }
  getParent() {
    return this.parent;
  }

  getFileSize() {
    if (this.files.length < 1) {
      return 0;
    }

    return this.files
      .map((node) => node.size)
      .reduce((acc, curr) => acc + curr);
  }

  getDirSize() {
    let fileSize = this.getFileSize();
    let dirSize = 0;

    fileTree.traverse((node) => {
      if (node.id !== this.id) {
        dirSize += node.getFileSize();
      }
    }, this);

    return fileSize + dirSize;
  }
}

class File {
  constructor(id, size) {
    this.id = id;
    this.size = size;
  }
}

class Tree {
  constructor() {
    this.root = new TreeNode("/", null);
  }

  traverse(callback, currentNode = this.root) {
    callback(currentNode);
    currentNode.children.forEach((node) => fileTree.traverse(callback, node));
  }

  searchByFileSize(min, max) {
    let nodeList = [];

    this.traverse((node) => {
      if (node.getDirSize() >= min && node.getDirSize() <= max) {
        // console.log(node.getDirSize());
        nodeList.push(node);
      }
    });

    return nodeList;
  }
}

const fileTree = new Tree();

const initTree = (initCmdList) => {
  const cmdList = JSON.parse(JSON.stringify(initCmdList));

  let currentNode = fileTree.root;

  for (let i = 0; i < cmdList.length; i++) {
    const line = cmdList[i];

    if (line.includes("$ cd ")) {
      const [_, __, id] = line.split(" ");

      if (id === "/") {
        // console.log("\nMove to root ");
        currentNode = fileTree.root;
      } else if (id === "..") {
        // console.log("\nMove < to parent folder: ");

        currentNode = currentNode.getParent();

        // console.log("\tMoved to", currentNode);
      } else {
        // console.log("\nMove > to Node: " + id);

        currentNode = currentNode.getChildById(id);
        // console.log("\tMoved to", currentNode);
      }
    }

    if (line.includes("$ ls")) {
      // console.log("\tList Current Node:\n\t\t", currentNode);
    }

    if (line.includes("dir")) {
      const [_, id] = line.split(" ");
      // console.log("\tCreate directory: " + id + "/ in node " + currentNode.id);
      currentNode.addChild(id, currentNode.id);
    }

    if (!isNaN(parseInt(line[0]))) {
      const [size, id] = line.split(" ");
      // console.log(
      //   "\tAdd file " +
      //     id +
      //     " " +
      //     "Size: " +
      //     size +
      //     " to node " +
      //     currentNode.id
      // );
      currentNode.addFile(id, parseInt(size));
    }
  }
};

initTree(input);

const foldersBelowTenThousand = fileTree.searchByFileSize(0, 100000);

const partOne = foldersBelowTenThousand
  .map((node) => node.getDirSize())
  .reduce((acc, curr) => acc + curr);

console.log({ partOne });

const seventyM = 70000000;
const thirtyM = 30000000;

const currentFreeSpace = seventyM - fileTree.root.getDirSize();
const minFileSize = thirtyM - currentFreeSpace;

const potentiallyDeletable = fileTree.searchByFileSize(minFileSize, 70000000);

const partTwo = potentiallyDeletable
  .sort((a, b) => a.getDirSize() - b.getDirSize())[0]
  .getDirSize();

console.log({ partTwo });
