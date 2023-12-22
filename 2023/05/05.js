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


const mapSeedToValue = (seed, index) => {
  const rows = input[index].split("\n").splice(1).map((row) => row.split(" ").map(Number))

  const seedRange = rows.find((row) => findSeedRange(row, seed))

  let seedTarget = seed;

  if (seedRange) {
    const [target, source, _] = seedRange;

    seedTarget = target + (seed - source)

  }

  const hasNextRow = !!input[index + 1]

  if (hasNextRow) {
    return mapSeedToValue(seedTarget, index + 1,)

  } else return seedTarget




  // const seedMapEntry = seedMap.get(seedKey);

  // if (seedMapEntry) {

  //   seedMapEntry.push(seedTarget);
  //   seedMap.set(seedKey, seedMapEntry)
  // } else {
  //   seedMap.set(seedKey, [seed, seedTarget])
  // }

  // const hasNextRow = !!input[index + 1]

  // if (hasNextRow) mapSeedToValue(seedTarget, seedKey, index + 1, seedMap)

}





const mapSeeds = (seeds, index) => {
  const seedMap = new Map(seeds.map((seed) => [seed, [seed]]));
  const locationList = []


  const seedMapValues = seedMap.values();
  let seed = seedMapValues.next();

  while (
    !seed.done
  ) {



    locationList.push(mapSeedToValue(seed.value, 1))



    seed = seedMapValues.next();
  }




  // await resolveSeedMaps(Array.from(seedMap.values()), 1, seedMap)
  // await resolveSeedMaps(Array.from(seedMap.values()), 2, seedMap)


  // await resolveSeedMaps(Array.from(seedMap.values()), 3, seedMap)
  // await resolveSeedMaps(Array.from(seedMap.values()), 4, seedMap)
  // await resolveSeedMaps(Array.from(seedMap.values()), 5, seedMap)
  // await resolveSeedMaps(Array.from(seedMap.values()), 6, seedMap)
  // await resolveSeedMaps(Array.from(seedMap.values()), 7, seedMap)








  // seeds.map((seed) => mapSeedToValue(seed, seed, 1, seedMap))



  // figure out if in Range



  return locationList

}



// const partOne = Math.min(...mapSeeds(seeds, 1))


// console.log({partOne})



const getPartTwoSeeds = (seeds) => {
  const seedArray = []



  for (let i = 0; i <= seeds.length; i += 2) {
    const source = seeds[i];
    const range = seeds[i + 1]



    seedArray.push(...Array.from({ length: range }, (_, index) => source + index))



  }


  return seedArray
}



const partTwoSeeds = getPartTwoSeeds(seeds)




const partTwo = Math.min(...mapSeeds(partTwoSeeds, 1))


console.log({ partTwo })
// const partOneMap = mapSeeds(partTwoSeeds, 1).then((value) => console.log(Math.min(...Array.from(value.values()).map(val => val[val.length - 1]))))


// const partTwoMap = mapSeeds(partTwoSeeds, 1).then((value) => console.log(Math.min(...Array.from(value.values()).map(val => val[val.length - 1]))))
// const partTwo = Math.min(...Array.from(partTwoMap.values()).map(val => val[val.length - 1]))

// console.log({ partTwo })