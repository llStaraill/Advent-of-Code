const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs.readFileSync(fileName, "utf-8").split("");

function initSantaPositions(amount) {
  let initArr = [];
  for (let i = 0; i < amount; i++) {
    initArr.push([0, 0]);
  }
  return initArr;
}

function getActiveSanta(i, amount) {
  /* let activeSanta = (i + 1) % amount == 0 ? 1 : 0; */
  let activeSanta = (i+1) - (Math.floor((i + 1) / amount)*amount);
  return activeSanta;
}

function visitHouses(cmdList, santaAmount) {
  let santaPositions = initSantaPositions(santaAmount);

  let houseMap = new Map();
  houseMap.set(santaPositions[0].toString(), 1);

  cmdList.map((cmd, index) => {
    let activeSanta = getActiveSanta(index, santaAmount);

    let currDeliveryPosition = santaPositions[activeSanta];

    switch (cmd) {
      case "<":
        {
          currDeliveryPosition[0]--;
        }
        break;
      case ">":
        {
          currDeliveryPosition[0]++;
        }
        break;
      case "^":
        {
          currDeliveryPosition[1]--;
        }
        break;
      case "v":
        {
          currDeliveryPosition[1]++;
        }
        break;
    }

    let coordinates = currDeliveryPosition.toString();

    if (!houseMap.has(coordinates)) {
      houseMap.set(coordinates, 1);
    } else {
      let timesVisited = houseMap.get(coordinates);
      houseMap.set(coordinates, timesVisited + 1);
    }
  });

  return houseMap.size;
}
const partOne = visitHouses(input, 1); // 2592
const partTwo = visitHouses(input, 2); // 2360

