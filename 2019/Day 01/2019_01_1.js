function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const loadModulesArr = stripInputBare(input);

function getFuelCalculation(weight) {
  let fuel = Math.floor(weight / 3 - 2);
  return fuel;
}

function getSimpleFuel(weightArr) {
  weightArr.map(i => Math.floor(i / 3) - 2).reduce((prev, curr) => prev + curr);
  return weightArr;
}

const simpleFuel = getSimpleFuel(loadModulesArr);
