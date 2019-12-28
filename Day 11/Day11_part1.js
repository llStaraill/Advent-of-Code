

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
        pos.y++;
        return "^";
        break;
      } else {
        pos.y--;
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
        pos.y--;
        return "v";
        break;
      } else {
        pos.y++;
        return "^";
        break;
      }
  }
}
let robot = new Robot(intCode);
robot.boot();

let image = new Map();

function moveRobot(rob, i) {
  //console.log(rob)
 
  for (let i = 0; i<30000; i++) {
    if (rob.op.done){
      return;
    }
  //console.log(`${i}: ${rob.pixPos.x},${rob.pixPos.y}`)
  //console.log(rob.op.resultArr)
  let pixExists = image.get(`${rob.pixPos.x},${rob.pixPos.y}`);
  let inp = pixExists ? pixExists : 0;
  //console.log(rob.pixPos)
  //console.log(`C:${inp} - M:${pixExists}`)
  let state = rob.pixDir;
  let [color, dir] = [...rob.run(inp)];
  image.set(`${rob.pixPos.x},${rob.pixPos.y}`, color);
  
  rob.pixDir = getDirection(dir, state, rob.pixPos);
  
}
   
  //moveRobot(rob, i);
}

moveRobot(robot, 0);

console.log(image)
//console.log(new Map([...image.entries()].sort()))
//console.log(image.has("-47,-24"))