let intCode = inputD11;

let c = {
  0: "rgb(0, 0, 0)",
  1: "rgb(255, 255, 255)"
};

let d = {
  0: "w",
  1: "n",
  2: "e",
  3: "s"
};

function Pixel(data) {
  this.position = data[0];
  this.color = data[1];
}

class Robot {
  constructor(data) {
    this.pixPos = {
      x: 0,
      y: 0
    };
    this.pixDir = "^";
    this.op = new TuringMachine(data);
  }
  boot() {
    return this.op.initialize();
  }
  run(input) {
    return this.op.run(input);
  }

  done() {
    return this.op.finish();
  }
}

function getDirection(x, state, pos) {
  switch (state) {
    case "^":
      if (x === 0) {
        pos.x--;
        return "<";
        break;
      } else {
        pos.x++;
        return ">";
        break;
      }
    case ">":
      if (x === 0) {
        pos.y--;
        return "^";
        break;
      } else {
        pos.y++;
        return "v";
        break;
      }
    case "v":
      if (x === 0) {
        pos.x++;
        return ">";
        break;
      } else {
        pos.x--;
        return "<";
        break;
      }
    case "<":
      if (x === 0) {
        pos.y++;
        return "v";
        break;
      } else {
        pos.y--;
        return "^";
        break;
      }
  }
}
let robot = new Robot(intCode);
robot.boot();

let image = new Map();

function moveRobot(rob, start) {
  //console.log(rob)

  for (let i = 0; i < 20000; i++) {
    let pixExists = image.get(`${rob.pixPos.x},${rob.pixPos.y}`);
    if (i === 0) {
      inp = start;
    } else if (pixExists) {
      inp = pixExists;
    } else {
      inp = 0;
    }
    let state = rob.pixDir;

    let [color, dir] = [...rob.run(inp)];
    image.set(`${rob.pixPos.x},${rob.pixPos.y}`, color);

    rob.pixDir = getDirection(dir, state, rob.pixPos);
  }
}

//moveRobot(robot, 0);

// Part II

function drawImage(arr, canvasSize, pixelSize) {
  let imageColors = {
    0: "rgb(0,0,0)",
    1: "rgb(255,255,255)",
    2: "rgba(255,255,255,0)"
  };
  const c = {
    width: canvasSize[0],
    height: canvasSize[1]
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

moveRobot(robot, 1);


console.log(image);
function getRange(arr) {
  return Math.abs(Math.min(...arr)) + Math.abs(Math.max(...arr));
}

let imgArr = [...image].map(i => [
  i[0].split(",").map(Number),
  i[1] === undefined ? 2 : i[1]
]);

width = getRange(imgArr.map(i => i[0][0])) + 1;
minWidth = Math.abs(Math.min(...imgArr.map(i => i[0][0])));
height = getRange(imgArr.map(i => i[0][1])) + 1;
minHeight = Math.abs(Math.min(...imgArr.map(i => i[0][1])));

imgArr.map(i => {
  i[0][0] += minWidth;
  i[0][1] += minHeight;
});

console.log(minWidth);
console.log(minHeight);

let imgCanvas = new Array(height + 1).fill(2);

for (let i = 0; i < imgCanvas.length; i++) {
  imgCanvas[i] = new Array(width + 1).fill(2);
}

// Fill the Canvas

imgArr.map(i => (imgCanvas[i[0][1]][i[0][0]] = i[1]));

drawImage(imgCanvas, [width, height], 10);
