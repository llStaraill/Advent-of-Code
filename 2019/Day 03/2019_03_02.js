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

function getWirePath(arr) {
  let lastPosition = [0, 0];
  let wire = [...arr];
  let wirePath = [];
  for (let i = 0; i <= wire.length - 1; i++) {
    let string = wire[i];
    let amount = parseInt(string.match(/\d+/g));
    let direction = string.charAt(0);

    if (direction === "R") {
      for (let j = 1; j <= amount; j++) {
        lastPosition[0]++;
        wirePath.push(`${lastPosition[0]}, ${lastPosition[1]}`);
      }
    } else if (direction === "L") {
      for (let j = 1; j <= amount; j++) {
        lastPosition[0]--;
        wirePath.push(`${lastPosition[0]}, ${lastPosition[1]}`);
      }
    } else if (direction === "U") {
      for (let j = 1; j <= amount; j++) {
        lastPosition[1]++;
        wirePath.push(`${lastPosition[0]}, ${lastPosition[1]}`);
      }
    } else if (direction === "D") {
      for (let j = 1; j <= amount; j++) {
        lastPosition[1]--;
        wirePath.push(`${lastPosition[0]}, ${lastPosition[1]}`);
      }
    }
  }
  return wirePath;
}

let w1Path = getWirePath(w1);

let w2Path = getWirePath(w2);

let crossing = w1Path.filter(i => w2Path.indexOf(i) !== -1);


function getManhattanDistance(x, y) {
  let distance = 0;
  let dimension = Math.max(x.length, y.length);
  for (let i = 0; i < dimension; i++) {
    distance += Math.abs((parseInt(y[i]) || 0) - (parseInt(x[i]) || 0));
  }
  return distance;
}

let manhattanDistance = crossing.map(i => getManhattanDistance([0, 0], i.split(",")));
let resultDistance = Math.min(...manhattanDistance);

function getWalkingDistance(crossArr, w1, w2) {
    let steps = []
    crossing.map(i => steps.push(parseInt(w1.indexOf(i))+parseInt(w2.indexOf(i))));
    console.log(steps);
    return steps
}


let resultSteps = Math.min(getWalkingDistance(crossing, w1Path, w2Path));
