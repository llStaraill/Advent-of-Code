function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

let asteroidMap = stripInputBare(inputD10).map(i => i.split(""));

function Coordinate(data) {
  (this.x = data[1]), (this.y = data[0]);
}

function getCoordinates(arr) {
  let list = [];
  let coord;
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      coord = new Coordinate([y, x]);
      arr[y][x] !== "." ? list.push(coord) : null;
    }
  }
  return list;
}

let coordinateList = getCoordinates(asteroidMap);
let station;
function compareIt(asteroid, arra) {
  let uniqueAngle = [];
  let curr = asteroid;
  let arr = arra.filter(i => i !== asteroid);
  for (let k = 0; k < arr.length; k++) {
    let currAngle = Math.atan2(arr[k].y - curr.y, arr[k].x - curr.x);
    if (arr[k].x - curr.x <= 0) {
      currAngle += 2 * Math.PI;
    }
    uniqueAngle.indexOf(currAngle) === -1 ? uniqueAngle.push(currAngle) : null;
    uniqueAngle.length === 247 ? (station = curr) : null;
  }
  return uniqueAngle.length;
}

let angles = [];

coordinateList.map(i => angles.push(compareIt(i, coordinateList)));
let partOne = Math.max(...angles);

//////////// Part II //////////////

let asteroidStation = station;

function getDistance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

let testCoord = new Coordinate([13, 11]);

function getRotation(position, array) {
  let laserStation = position;
  let arr = array.filter(i => i !== laserStation);
  let angleArr = [];
  let angleArrR = [];
  let angleArrL = [];

  for (let k = 0; k < arr.length; k++) {
    let currAngle;
    if (arr[k].x - laserStation.x < 0) {
      currAngle = Math.atan2(
        laserStation.y - arr[k].y,
        laserStation.x - arr[k].x
      );
      angleArrL.push([arr[k], currAngle, getDistance(laserStation, arr[k])]);
    } else {
      currAngle = Math.atan2(
        arr[k].y - laserStation.y,
        arr[k].x - laserStation.x
      );
      angleArrR.push([arr[k], currAngle, getDistance(laserStation, arr[k])]);
    }
  }

  angleArrR.sort(function(a, b) {
    if (a[1] < b[1]) {
      return -1;
    } else if (a[1] > b[1]) {
      return 1;
    } else if (a[1] === b[1] && a[2] < b[2]) {
      return -1;
    } else if (a[1] === b[1] && a[2] > b[2]) {
      return 1;
    } else return 0;
  });
  angleArrL.sort(function(a, b) {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    } else if (a[1] === b[1] && a[2] < b[2]) {
      return -1;
    } else if (a[1] === b[1] && a[2] > b[2]) {
      return 1;
    } else return 0;
  });

  return angleArrR.concat(angleArrL.reverse());
}

let rotationArr = getRotation(asteroidStation, coordinateList);

let counter = 1;

function getOrder(arra, inc) {
  let arr = [...arra];
  let nextArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] != undefined && arr[i][1] === arr[i + 1][1]) {
      let temp = arr[i + 1];
      nextArr.push(temp);
    } else {
      if (inc === 200) {
        console.log(arr[i])
        return arr[i][0].x*100+arr[i][0].y;
      } else {
        console.log(
          `${inc} : ${arr[i][0].x}/${arr[i][0].y} | ${arr[i][1]} | ${arr[i][2]}`
        );
        inc++;
      }
    }
  }
  if (nextArr.length != 0) {
    getOrder(nextArr, inc);
  }
}

console.log(getOrder(rotationArr, counter));
