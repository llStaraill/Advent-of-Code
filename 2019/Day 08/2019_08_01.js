const password = inputD8.split("").map(Number);
//const password = `0222112222120000`.split("").map(Number);

let size = {
  width: 25,
  height: 6
};
/*
Array.prototype.count = function(filter) {
  return this.reduce((count, item) => (filter(item) ? count + 1 : count), 0);
};

function createLayer(w, h) {
  let arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = new Array(w).fill(null);
  }
  return arr;
}

function fillLayers(size, arr) {
  let filling = [...arr];
  let w = size.width;
  let h = size.height;
  let layerNr = Math.ceil(filling.length / (w + h));
  let canvas = [];

  while (filling.length !== 0) {
    let layer = [];
    for (let i = 0; i < h; i++) {
      let layerX = filling.splice(0, w);
      layer.push(layerX);
    }
    canvas.push(layer.flat());
  }

  return canvas;
}

function countThroughArray(arr, x) {
  return arr.count(i => i === x);
}

let zeroes = [];
let image = fillLayers(size, password);
image.pop();
image.map(i =>
  i.count(z => z == 0) ? zeroes.push([i, i.count(z => z == 0)]) : null
);

let mostZeroes = zeroes.reduce((curr, prev) =>
  curr[1] < prev[1] ? curr : prev
);

let ones = countThroughArray(mostZeroes[0], 1);
let twos = countThroughArray(mostZeroes[0], 2);
let result =
  mostZeroes[0].count(x => x === 1) * mostZeroes[0].count(x => x === 2);
*/
//////////////// Part II

function drawImage(arr, canvasSize, pixelSize) {
  let imageColors = {
    0: "rgb(0,0,0)",
    1: "rgb(255,255,255)",
    2: "rgba(255,255,255,0)"
  };
  const c = {
    width: canvasSize.width,
    height: canvasSize.height
  };
  const pS = pixelSize;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.height = c.height * pS;
  ctx.canvas.width = c.width * pS;
  ctx.fillStyle = "rgb(150,150,150)";
  ctx.fillRect(0, 0, c.width * pS, c.height * pS);

  // Drawing //
  for (let j = 0; j < c.height; j++) {
    for (let i = 0; i < c.width; i++) {
      ctx.fillStyle = imageColors[arr[j][i]];
      ctx.fillRect(i * pS, j * pS, pS, pS);
    }
  }
}

function fillLayerNested(size, arr) {
  let filling = [...arr];
  let w = size.width;
  let h = size.height;
  let layeredImage = [];

  while (filling.length !== 0) {
    let layer = [];
    for (let i = 0; i < h; i++) {
      let layerX = filling.splice(0, w);
      layer.push(layerX);
    }
    layeredImage.push(layer);
  }
  return layeredImage;
}

let imageB = fillLayerNested(size, password);
imageB.pop()
imageB.reverse();
let baseLayer = imageB.shift();

function mergeLines(base, mergeLine) {
  let line = [];
  for (i = 0; i < base.length; i++) {
    line.push(mergeLine[i] !== 2 ? mergeLine[i] : base[i]);
  }
  return line;
}

function mergeLayer(base, mergeLayer) {
  for (let j = 0; j < base.length; j++) {
    base[j] = mergeLines(base[j], mergeLayer[j]);
  } return base
}

function flattenImage(base, mergeStack) {
  for (let k = 0; k < mergeStack.length; k++) {
    mergeLayer(base, mergeStack[k]);
  }
  return base
}

let result = flattenImage(baseLayer, imageB);
console.log(result);

drawImage(result,size,15)