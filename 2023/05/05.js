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

/** Get Input */

let input = fs.readFileSync(fileName, "utf-8").split("\n\n");


const seeds = input[0].replace("seeds: ", "").split(" ").map(Number)



const findSeedRange = (row, seed) => {
  const [_, source, range] = row;
  return source <= seed && seed <= source + range

}


const mapSeedToValue = (seed, seedKey, index, seedMap) => {
  const rows = input[index].split("\n").splice(1).map((row) => row.split(" ").map(Number))

  const seedRange = rows.find((row) => findSeedRange(row, seed))

  let seedTarget = seed;

  if (seedRange) {
    const [target, source, _] = seedRange;

    seedTarget = target + (seed - source)

  }




  const seedMapEntry = seedMap.get(seedKey);

  if (seedMapEntry) {

    seedMapEntry.push(seedTarget);
    seedMap.set(seedKey, seedMapEntry)
  } else {
    seedMap.set(seedKey, [seed, seedTarget])
  }

  const hasNextRow = !!input[index + 1]

  if (hasNextRow) mapSeedToValue(seedTarget, seedKey, index + 1, seedMap)

}



const mapSeeds = (seeds, index) => {
  const seedMap = new Map();


  seeds.map((seed) => mapSeedToValue(seed, seed, 1, seedMap))

  // figure out if in Range



  return seedMap

}

const partOneMap = mapSeeds(seeds, 1)

const partOne = Math.min(...Array.from(partOneMap.values()).map(val => val[val.length - 1]))

console.log({ partOne })