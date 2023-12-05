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

let input = fs.readFileSync(fileName, "utf-8");

/** Part One */

class Seed {
  constructor({
    seed,
    soil,
    fertilizer,
    water,
    light,
    temperature,
    humidity,
    location,
  }) {
    this.seed = seed;
    this.soil = soil;
    this.fertilizer = fertilizer;
    this.water = water;
    this.light = light;
    this.temperature = temperature;
    this.humidity = humidity;
    this.location = location;
  }

  add(key, val) {
    this[key] = val;
  }
}

class Almanach {
  constructor() {
    this.seeds = [];
  }

  addSeed(id) {
    this.seeds.push(new Seed(id));
  }

  getSeedBy(key, id) {
    return this.seeds.find((seed) => seed[key] === id);
  }
}

const almanach = new Almanach();

const getStringMapValues = (stringValue, id) =>
  stringValue
    .replace(id, "")
    .split("\n")
    .filter((el) => el !== "")
    .map((row) => row.split(" ").map(Number));

const partOneInput = input.split("\n\n");

const seeds = partOneInput[0].replace("seeds: ", "").split(" ").map(Number);

const addValueToAlmanach = (values, sourceKey, destinationKey) => {
  const [destinationStart, sourceStart, range] = values;

  console.log({ sourceKey, destinationKey });

  for (let i = 0; i < range; i++) {
    const almanachSeed = almanach.getSeedBy(sourceKey, sourceStart + i);

    console.log(sourceStart + i, destinationStart + i, almanachSeed);
    if (almanachSeed) {
      almanachSeed.add(destinationKey, destinationStart + 1);
    } else {
      almanach.addSeed({
        [sourceKey]: destinationStart + 1,
        [destinationKey]: destinationStart + i,
      });
    }
  }
};

const flow = [
  "seed",
  "soil",
  "fertilizer",
  "water",
  "light",
  "temperature",
  "humidity",
  "location",
];

for (let i = 0; i < flow.length - 1; i++) {
  const source = flow[i];
  const destination = flow[i + 1];

  // console.log({ source, destination });
  const valueMap = getStringMapValues(
    partOneInput[i + 1],
    `${flow[i]}-to-${flow[i + 1]} map:`
  );

  console.log({ valueMap });

  valueMap.forEach((valueRow) =>
    addValueToAlmanach(valueRow, source, destination)
  );
}

// const almanachSeeds = seeds.map((seed) => {
//   const almanachSeed = almanach.getSeedBy("seed", seed);
//   return almanachSeed;
// });

console.log(almanach.getSeedBy("location", 35));

// console.log(almanach);

/** Part Two */
