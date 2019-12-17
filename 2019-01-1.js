function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const loadModulesArr = stripInputBare(input);



function getFuelCalculation(weight) {
  let fuel = Math.floor((weight/3) - 2);
  return fuel;
}

function getSimpleFuel(weightArr) {
    weightArr.map(i => Math.floor(i / 3) - 2).reduce((prev, curr) => prev + curr);
    return weightArr;
  }

function getTotalWeight(weight) {
  let currWeight = parseInt(weight);
  let fuelWeight = getFuelCalculation(currWeight);
  let weightSum = 0;

  while (fuelWeight > 0) {
    weightSum += fuelWeight;
    fuelWeight = getFuelCalculation(fuelWeight);
  }
  console.log(debugArr);
  return weightSum;
}

let fuelAddedUp = loadModulesArr
  .map(i => getTotalWeight(i))
  .reduce((prev, curr) => prev + curr);
console.log(fuelAddedUp);

/* newArr = arr.map(i => getFuelCalculation(i)).filter(i => i > 0);
    fuelAdded.push(newArr.reduce((prev, curr) => prev + curr));*/
