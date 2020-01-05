var canvas = document.getElementById("canvas");
var ctxBg = canvas.getContext("2d");
var ctxWall = canvas.getContext("2d");
var canvasWidth = 1500;
var canvasHeight = 1500;

var colCount = 1500;
var rowCount = 1500;
var cellSize = 3;

var walls = [
  { direction: "horizontal", startX: 4, endX: 6, Y: 3, fill: "skyblue" },
  { direction: "vertical", startY: 2, endY: 6, X: 1, fill: "lightgreen" }
];

drawGrid();
drawAllWalls(walls);

function drawAllWalls(walls) {
  for (var i = 0; i < walls.length; i++) {
    var w = walls[i];
    ctxWall.fillStyle = w.fill;
    if (w.direction == "horizontal") {
      for (var x = w.startX; x <= w.endX; x++) {
        ctxWall.fillRect(x * cellSize, w.Y * cellSize, cellSize, cellSize);
      }
    } else {
      for (var y = w.startY; y <= w.endY; y++) {
        ctxWall.fillRect(w.X * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function drawGrid() {
  ctxBg.beginPath();
  for (var x = 0; x < colCount + 1; x++) {
    ctxBg.moveTo(x * cellSize, 0);
    ctxBg.lineTo(x * cellSize, rowCount * cellSize);
  }
  for (var y = 0; y < rowCount + 1; y++) {
    ctxBg.moveTo(0, y * cellSize, 0);
    ctxBg.lineTo(colCount * cellSize, y * cellSize);
  }
  ctxBg.strokeStyle = "rgba(100,100,100,0.1)";
  ctxBg.stroke();
}
