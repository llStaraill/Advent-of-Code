let intCode = inputD13;

let arcade = new TuringMachine(intCode);
let playfield = arcade.run();

class Tile {
  constructor(x, y, type) {
    (this.x = x), (this.y = y), (this.t = type);
  }
}

function getTiles(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i += 3) {
    newArr.push(new Tile(arr[i], arr[i + 1], arr[i + 2]));
  }
  return newArr;
}
let tileField = getTiles(playfield);

//let blockArr = tileArr.filter(i => i.t === 2);
//let blockAmount = blockArr.length;

// Part II

let widthRange = tileField.map(i => i.x);
let heightRange = tileField.map(i => i.y);

let width = Math.max(...widthRange) + 1;
let height = Math.max(...heightRange) + 1;

drawImage(tileField, [width, height], 10);

let fieldData;
let tileArr;

function updateGame(arr) {}

let score = 0;
window.addEventListener("keydown", event => {
  if (event.keyCode === 37) {
    fieldData = [...arcade.run(-1)];
  } else if (event.keyCode === 39) {
    fieldData = [...arcade.run(1)];
  }
  tileArr = getTiles(fieldData);
  drawImage(tileArr, [width, height], 10);
});


