let intCode = inputD13;

let arcade = new TuringMachine(intCode);
let playfield = arcade.run();

class Tile {
  constructor(x, y, type) {
    (this.x = x), (this.y = y), (this.t = type);
  }
}

// Part II
let tileMap = new Map();

function getTiles(map, arr) {
  for (let i = 0; i < arr.length; i += 3) {
    map.set(`${arr[i]},${arr[i + 1]}`, arr[i + 2]);
  }
}

function getMax(map, axis) {
  return Math.max(
    ...[...map.keys()]
      .map(i => i.split(","))
      .map(i => i[axis === "x" ? 0 : 1])
      .map(Number)
  );
}

getTiles(tileMap, playfield);

let width = getMax(tileMap, "x") + 1;
let height = getMax(tileMap, "y") + 1;

drawImage(tileMap, [width, height], 10);

function updateGame(inp) {
  let inputData = [...arcade.run(inp)];
  getTiles(tileMap, inputData);
  let score = tileMap.get("-1,0");
  document.getElementById("score").innerHTML = score;
  drawImage(tileMap, [width, height], 10);
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
});

let blockArr = playfield.filter(i => i.t === 2);
let blockAmount = blockArr.length;

// Highscore by destroying blocks
// If time, redo with bot?

function findPos(map, item) {
  return new Tile(
    ...[...map.entries()]
      .map(i => [i[0].split(",").map(Number), i[1]])
      .filter(i => i[1] === item)[0]
      .flat()
  );
}

function botIt(map) {
  let ball = findPos(map, 4);
  let paddle = findPos(map, 3);
  updateGame(Math.sign(ball.x - paddle.x));
}

// Button in HTML File to manually start the Bot
let botButton = document.getElementById("botBtn")
document
  .getElementById("botBtn")
  .addEventListener("click", () => setInterval(() => botIt(tileMap), 100));

