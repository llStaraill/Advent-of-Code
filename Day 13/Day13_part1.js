let intCode = inputD13;

let arcade = new TuringMachine(intCode);
let playfield = arcade.run();

class Tile {
  constructor(x, y, type) {
    (this.x = x), (this.y = y), (this.t = type);
  }
}

// Part II

function getTiles(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i += 3) {
    newArr.push(new Tile(arr[i], arr[i + 1], arr[i + 2]));
  }
  return newArr;
}
let tileField = getTiles(playfield);

let widthRange = tileField.map(i => i.x);
let heightRange = tileField.map(i => i.y);

let width = Math.max(...widthRange) + 1;
let height = Math.max(...heightRange) + 1;

drawImage(tileField, [width, height], 10, []);

function updateGame(inp) {
  let fieldData = [...arcade.run(inp)];
  let tileArr = getTiles(fieldData);
  
  drawImage(tileArr, [width, height], 10);
  return tileArr;
}


window.addEventListener("keydown", event => {
  if (event.keyCode === 37) {
    updateGame(-1);
  } else if (event.keyCode === 39) {
    updateGame(1);
  } else if (event.keyCode === 40) {
    updateGame(0);
  } else if (event.keyCode === 32) {
    location.reload();
  }
})

let blockArr = playfield.filter(i => i.t === 2);
let blockAmount = blockArr.length;

// Highscore by destroying blocks
// If time, redo with bot?
