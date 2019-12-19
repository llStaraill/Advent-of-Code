function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

let asteroidMap = stripInputBare(inputD10).map(i => i.split(""));

function Coordinate(data) {
  (this.x = data[1]), (this.y = data[0]);
}

/*function getAngle(v1, v2) {
  let angle =
    ((Math.atan2(v1.y, v1.x) - Math.atan2(v2.y, v2.x)) * 180) / Math.PI;

  return angle;
}*/

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

function compareIt(asteroid, arra) {
  let uniqueAngle = [];
  let curr = asteroid;
  console.log(curr);
  let arr = arra.filter(i => i !== asteroid);
  for (let k = 0; k < arr.length; k++) {
    let currAngle =
      Math.atan2(arr[k].y - curr.y, arr[k].x - curr.x) ;
    if (arr[k].x - curr.x < 0) {
      currAngle += (2* Math.PI)
    }
    uniqueAngle.indexOf(currAngle) === -1 ? uniqueAngle.push(currAngle) : null;
  }
  return uniqueAngle.length;
}

let angles = [];


coordinateList.map(i => angles.push(compareIt(i, coordinateList)));
console.log(angles);
console.log(Math.max(...angles));
