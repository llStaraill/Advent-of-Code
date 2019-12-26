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
    this.pixDir = "n";
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
    case "n":
      if (x === 0) {
        pos.x--;
        return "w";
        break;
      } else {
        pos.x++;
        return "e";
        break;
      }
    case "e":
      if (x === 0) {
        pos.y--;
        return "n";
        break;
      } else {
        pos.y++;
        return "s";
        break;
      }
    case "s":
      if (x === 0) {
        pos.x++;
        return "e";
        break;
      } else {
        pos.x--;
        return "w";
        break;
      }
    case "w":
      if (x === 0) {
        pos.y++;
        return "s";
        break;
      } else {
        pos.y--;
        return "n";
        break;
      }
  }
}
let robot = new Robot(intCode);
robot.boot();

let image = new Map();

function moveRobot(rob, i) {
  console.log(rob)
  if (rob.op.resultArr.indexOf(false) !==) {
    return;
  }

  let pixExists = image.get(`${rob.pixPos.x},${rob.pixPos.y}`);
  let inp = pixExists ? pixExists : 0;
  let state = rob.pixDir;
  let position = Object.assign(rob.pixPos);
  let [color, dir] = [...rob.run(inp)];
  image.set(`${rob.pixPos.x},${rob.pixPos.y}`, color);
  rob.pixDir = getDirection(dir, state, position);
  i++
  moveRobot(rob);
}

moveRobot(robot, 0);


