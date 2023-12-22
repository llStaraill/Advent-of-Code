const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

/** Global Helper */

const log = (val, forceLog = false) => {
  if ((args[1] && args[1].includes("l")) || forceLog) {
    console.log(val);
  }
};
const deepCopy = (val) => JSON.parse(JSON.stringify(val));

const lazy = function (creator) {


  function callBack() {

    return creator.apply(this, arguments);


  };

  return callBack
};


/** Get Input */

let input = fs.readFileSync(fileName, "utf-8").split("\n\n");


const seeds = input[0].replace("seeds: ", "").split(" ").map(Number)



const findSeedRange = (row, seed) => {
  const [_, source, range] = row;
  return source <= seed && seed <= source + range

}


const mapSeedToValue = (seed, index) => {
  const rows = input[index].split("\n").splice(1).map((row) => row.split(" ").map(Number))

  const seedRange = rows.find((row) => findSeedRange(row, seed))

  let seedTarget = seed;

  if (seedRange) {
    const [target, source, _] = seedRange;

    seedTarget = target + (seed - source)

  }

  return seedTarget



}








const mapSeeds = (seeds) => {
  const seedMap = new Map(seeds.map((seed) => [seed, [seed]]));
  const locationList = []


  const seedMapValues = seedMap.values();
  let seed = seedMapValues.next();



  while (
    !seed.done
  ) {


     
    const seedToSoil = lazy(() => mapSeedToValue(seed.value, 1))



    const soilToFertilizer = lazy(() => mapSeedToValue(seedToSoil(), 2))


    const fertilizerToWater = lazy(() => mapSeedToValue(soilToFertilizer(), 3))
    const waterToLight = lazy(() => mapSeedToValue(fertilizerToWater(), 4))
    const lightToTemperature = lazy(() => mapSeedToValue(waterToLight(), 5))
    const temperatureToHumidity = lazy(() => mapSeedToValue(lightToTemperature(), 6))
    const humidityToLocation = lazy(() => mapSeedToValue(temperatureToHumidity(), 7))



    const location = humidityToLocation()

  

    locationList.push(location)



    seed = seedMapValues.next();
  }





  return Math.min(...locationList)

}



// const partOne = Math.min(...mapSeeds(seeds, 1))


// console.log({partOne})



const getPartTwoSeeds = (seeds) => {
  const seedArray = []

  const partTwoSeedMap = new Set(seeds)


  let seedRangeValues = partTwoSeedMap.values();

  let sourceVal = seedRangeValues.next();

  while (!sourceVal.done) {
    const rangeVal = seedRangeValues.next()
 

   const seedRange = Array.from({length:rangeVal.value}, (_,index) => sourceVal.value + index)


    
    const intervallLocation = mapSeeds(seedRange,1)

    seedArray.push(intervallLocation)

    sourceVal = seedRangeValues.next()

  }


  return Math.min(...seedArray)
}





const partTwoSeeds = getPartTwoSeeds(seeds)

console.log({ partTwoSeeds })

