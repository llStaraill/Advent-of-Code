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

class Monkey {
  constructor(id, startingItems, opCallback, testCallback) {
    this.items = startingItems;
    this.id = id;
    this.opCallback = opCallback;
    this.testCondition = testCallback;
    this.itemCount = 0;
  }

  operation(old) {
    this.itemCount++;
    return this.opCallback(old);
  }
  test(item) {
    return this.testCondition.test(item);
  }
}

const createMonkeyList = (inputRaw) => {
  const cmdList = deepCopy(inputRaw);
  const monkeyList = [];

  cmdList.split("\n\n").map((monkeyData, index) => {
    const [monkeyId, items, operation, testCondition, isTrue, isFalse] =
      monkeyData.split("\n");

    const getStartItems = (line) =>
      line
        .replace("Starting items: ", "")
        .replaceAll(" ", "")
        .split(",")
        .map(BigInt);

    const getOperationLine = (line) => {
      const [_, cmd] = line.replace("old", "").split("=");

      if (cmd.includes("old")) {
        return (x) => {
          log(`\t- Multiplying ${x} with itself ${x}`);
          return x * x;
        };
      } else {
        const operator = cmd.match(/[\*|\-|\+]/)[0];
        const value = BigInt(parseInt(cmd.match(/\d+/)[0]));

        if (operator === "+") {
          return (x) => {
            log(`\t- Adding ${value} to ${x}`);
            return x + value;
          };
        }

        if (operator === "-") {
          return (x) => {
            log(`\t- Substracting ${value} from ${x}`);
            return x - value;
          };
        }

        if (operator === "*") {
          return (x) => {
            log(`\t- Multiplying ${x} by ${value}`);
            return x * value;
          };
        }
      }
    };

    const getTestCondition = (line) => {
      const getDivisibleBy = (line) => BigInt(parseInt(line.split("by")[1]));
      const getTargetMonkey = (line) => parseInt(line.split("monkey")[1]);
      return {
        test: (x) => {
          if (x % getDivisibleBy(line) === 0) {
            log(
              `\t${x} is dividible by ${getDivisibleBy(line)} = ${
                x / getDivisibleBy(line)
              }  -> ${x % getDivisibleBy(line) === 0}`,
              true
            );
          }

          return x % getDivisibleBy(line) === BigInt(0);
        },
        isTrue: getTargetMonkey(isTrue),
        isFalse: getTargetMonkey(isFalse),
      };
    };

    monkeyList.push(
      new Monkey(
        index,
        getStartItems(items),
        getOperationLine(operation),
        getTestCondition(testCondition)
      )
    );
  });

  return monkeyList;
};

const turn = (monkey, monkeyList, decreaseWorry = true) => {
  log(`\n\n\t== Monkey: ${monkey.id} ==`);

  while (monkey.items.length > 0) {
    // Getting Item
    let item = monkey.items.shift();

    log(`\nMonkey inspects an item with a worry level of ${item}`);

    // Inspecting Item

    item = monkey.operation(item);
    log(`Worry level after operation is now  ${item}.`);

    // Getting bored
    if (decreaseWorry) {
      item = Math.floor(item / 3);
      log(
        `Monkey gets bored with item. Worry level after division is ${item}.`
      );
    }

    // Throw it

    const targetMonkeyId = monkey.test(item)
      ? monkey.testCondition.isTrue
      : monkey.testCondition.isFalse;

    // log(`Condition ${monkey.test(item) ? "succeeded" : "failed"}`);

    const targetMonkey = monkeyList.find((el) => el.id === targetMonkeyId);
    targetMonkey.items.push(item);

    log(`Item with worry level ${item} is thrown to monkey ${targetMonkeyId}.`);
  }
};

const doRounds = (monkeyList, maxRounds, decreaseWorry = true) => {
  for (let i = 1; i <= maxRounds; i++) {
    log(`\n\n\t=== Round ${i} ===`);
    monkeyList.forEach((monkey) => turn(monkey, monkeyList, decreaseWorry));
  }

  log(`\n\t == After round ${maxRounds} ==`, true);
  if (true) {
    monkeyList.forEach((monkey) => {
      log(
        `Monkey ${monkey.id} inspected items  ${monkey.itemCount} times`,
        true
      );
      log(monkey.items, false);
    });
  }

  return monkeyList
    .map((monkey) => monkey.itemCount)
    .sort((a, b) => b - a)
    .splice(0, 2)
    .reduce((acc, curr) => acc * curr);
};

// const monkeyListOne = createMonkeyList(input);
// const partOne = doRounds(monkeyListOne, 20);

// log(partOne, true);
/** Part Two */

const monkeyListTwo = createMonkeyList(input);

const partTwo = doRounds(monkeyListTwo, 1000, false);
log(partTwo, true);
