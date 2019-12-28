function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const mapInput = stripInputBare(input).map(i => i.split(")"));

// Prepare the DataTree & Methods

function Queue() {
  this._oldestIndex = 1;
  this._newestIndex = 1;
  this._storage = {};
}

Queue.prototype.size = function() {
  return this._newestIndex - this._oldestIndex;
};

Queue.prototype.enqueue = function(data) {
  this._storage[this._newestIndex] = data;
  this._newestIndex++;
};

Queue.prototype.dequeue = function() {
  var oldestIndex = this._oldestIndex,
    newestIndex = this._newestIndex,
    deletedData;

  if (oldestIndex !== newestIndex) {
    deletedData = this._storage[oldestIndex];
    delete this._storage[oldestIndex];
    this._oldestIndex++;

    return deletedData;
  }
};

function OrbitNode(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
  this.level = null;
}

function OrbitTree(data) {
  const node = new OrbitNode(data);
  this._root = node;
}

OrbitTree.prototype.traverseDF = function(callback) {
  (function recurse(currentNode) {
    for (let i = 0; i < currentNode.children.length; i++) {
      recurse(currentNode.children[i]);
    }

    callback(currentNode);
  })(this._root);
};

OrbitTree.prototype.traverseBF = function(callback) {
  const queue = new Queue();
  queue.enqueue(this._root);
  let currentMap = queue.dequeue();

  while (currentMap) {
    for (let i = 0; i < currentMap.children.length; i++) {
      queue.enqueue(currentMap.children[i]);
    }

    callback(currentMap);
    currentMap = queue.dequeue();
  }
};

function findIndex(arr, data) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].data === data) {
      index = i;
    }
  }

  return index;
}

OrbitTree.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback);
};

OrbitTree.prototype.add = function(data, toData, traversal) {
  let child = new OrbitNode(data),
    parent = null,
    callback = function(node) {
      if (node.data === toData) {
        parent = node;
      }
    };
  this.contains(callback, traversal);

  if (parent) {
    parent.children.push(child);
    child.parent = parent;
    child.level = parent.level + 1;
  } else {
    throw new Error("Cannot add node to a non-existent parent.");
  }
};

OrbitTree.prototype.remove = function(data, fromData, traversal) {
  let tree = this,
    parent = null,
    childToRemove = null,
    index;

  let callback = function(node) {
    if (node.data === fromData) {
      parent = node;
    }
  };
  this.contains(callback, traversal);

  if (parent) {
    index = findIndex(parent.children, data);

    if (index === undefined) {
      throw new Error("Node to remove does not exist.");
    } else {
      childToRemove = parent.children.splice(index, 1);
    }
  } else {
    throw new Error("Parent does not exist.");
  }

  return childToRemove;
};

// Initialize the Map & Feed it the Input

const orbitMap = new OrbitTree("COM");

function addDataToTree(inputData, tree, parent) {
  let input = [...inputData];

  if (inputData.length <= 0) {
    return;
  }
  let currParent = parent;

  for (let i = 0; i < input.length; i++) {
    let inp = input[i];

    if (currParent === inp[0]) {
      tree.add(inp[1], inp[0], tree.traverseBF);

      addDataToTree(input, tree, inp[1]);
    }
  }
  return tree;
}

addDataToTree(mapInput, orbitMap, orbitMap._root.data);

// Calculate the Checksum

let orbitPaths = [];

function getSum(tree) {
  let sum = 0;
  tree.traverseBF(node => (sum += node.level));
  return sum;
}

let orbitSum = getSum(orbitMap);

///////////////////// [PART II] /////////////////////

//Find Common Ancestor
function getSpecificNode(tree, name) {
  let result;
  tree.traverseBF(node => {
    if (node.data === name) {
      result = node;
    }
  });
  return result;
}

let santa = getSpecificNode(orbitMap, "SAN");
let you = getSpecificNode(orbitMap, "YOU");

const getAncestry = (node, arr) => {
  if (node.data === "COM") {
    return arr;
  } else {
    arr.push(node);
    getAncestry(node.parent, arr);
  }
};

function getLCA(a, b) {
  let aAncestry = [];
  getAncestry(a, aAncestry);
  let bAncestry = [];
  getAncestry(b, bAncestry);

  let cA = aAncestry.filter(i => bAncestry.indexOf(i) !== -1);
  let commonAncestor = cA[0];
  return commonAncestor;
}

const lowestCommonAncestor = getLCA(santa, you);

function getDistance(a, b, lca) {
  let aDistance = parseInt(a.level - 1) - parseInt(lca.level);
  let bDistance = parseInt(b.level - 1) - parseInt(lca.level);

  return aDistance + bDistance;
}

let shortestDistanceBetweenSantaAndYou = getDistance(
  santa,
  you,
  lowestCommonAncestor
);
