function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const mapInput = stripInputBare(input).map(i => i.split(")"));

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

const orbitMap = new OrbitTree("COM");

let x = 0;
function addDataToTree(inputData, parent) {
  let input = [...inputData];
  if (inputData.length <= 0) {
    return;
  }
  let currParent = parent;

  for (let i = 0; i < input.length; i++) {
    let inp = input[i];

    if (currParent === inp[0]) {
      x++
      orbitMap.add(inp[1], inp[0], orbitMap.traverseBF);
      input.splice(input.indexOf(inp[0], 1));
      addDataToTree(input, inp[1]);
    }
  }
}

addDataToTree(mapInput, orbitMap._root.data);
console.log(orbitMap._root.children);
console.log(x)
let count = 0;

function count_orbits(node) {
  if (node.children) {
    //go through all its children
    for (var i = 0; i < node.children.length; i++) {
      //if the current child in the for loop has children of its own
      //call recurse again on it to decend the whole tree
      if (node.children[i].children) {
        count_orbits(node.children[i]);
        count++;
      }
      //if not then it is a leaf so we count it
      else {
        count++;
      }
    }
  }
}

count_orbits(orbitMap._root);
console.log(count);

console.log(
  orbitMap.traverseDF(function(node) {
    if (node.children.length == 0) {
      console.log(node);
    }
  })
);
