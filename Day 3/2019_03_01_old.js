function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const w1 = [...stripInputBare(w1Raw)];
const w2 = [...stripInputBare(w2Raw)];

function getDirections(direction) {
  let factor = direction.charAt(0);

  switch (factor) {
    case "R":
      return ">";
      break;
    case "U":
      return "^";
      break;
    case "D":
      return "v";
      break;
    case "L":
      return "<";
      break;
  }
}

function getMaxCoordinates(wire) {
  let x = [];
  let y = [];
  let xSum = 0;
  let ySum = 0;

  for (let i = 0; i <= wire.length - 1; i++) {
    let string = wire[i];
    let amount = parseInt(string.match(/\d+/g));
    let direction = string.charAt(0);

    if (direction === "R") {
      xSum += amount;
      x.push(xSum);
    } else if (direction === "L") {
      xSum -= amount;
      x.push(xSum);
    } else if (direction === "U") {
      ySum += amount;
      y.push(ySum);
    } else if (direction === "D") {
      ySum -= amount;
      y.push(ySum);
    }
  }
  let coordinates = {
    x: [Math.min(...x), Math.max(...x)],
    y: [Math.min(...y), Math.max(...y)]
  };
  return coordinates;
}

let xCoordinate = [
  Math.min(getMaxCoordinates(w1).x[0], getMaxCoordinates(w2).x[0]),
  Math.max(getMaxCoordinates(w1).x[1], getMaxCoordinates(w2).x[1])
];
let yCoordinate = [
  Math.min(getMaxCoordinates(w1).y[0], getMaxCoordinates(w2).y[0]),
  Math.max(getMaxCoordinates(w1).y[1], getMaxCoordinates(w2).y[1])
];

function drawCircuit(x, y) {
  let arr = [];
  for (let i = x[0]; i < x[1]; i++) {
    for (let j = y[0]; j < y[1]; j++) {
      arr[i].push(0);
    }
  }
  return arr;
}

console.log(drawCircuit(xCoordinate, yCoordinate));
