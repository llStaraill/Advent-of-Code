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
    this.op = opCallback;
    this.test = testCallback;
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
        .map((el) => parseInt(el));

    const getOperationLine = (line) => {
      const [_, cmd] = line.replace("old", "").split("=");

      if (cmd.includes("old")) {
        return { operator: "*", value: "old" };
      } else {
        const operator = cmd.match(/[\*|\-|\+]/)[0];
        const value = parseInt(cmd.match(/\d+/)[0]);

        return { operator, value };
      }

      // if (cmd.includes("old")) {
      //   return (x) => {
      //     log(`\t- Multiplying ${x} with itself ${x}`);
      //     return x * x;
      //   };
      // } else {
      //   const operator = cmd.match(/[\*|\-|\+]/)[0];
      //   const value = parseInt(cmd.match(/\d+/)[0]);

      //   if (operator === "+") {
      //     return (x) => {
      //       log(`\t- Adding ${value} to ${x}`);
      //       return x + value;
      //     };
      //   }

      //   if (operator === "-") {
      //     return (x) => {
      //       log(`\t- Substracting ${value} from ${x}`);
      //       return x - value;
      //     };
      //   }

      //   if (operator === "*") {
      //     return (x) => {
      //       log(`\t- Multiplying ${x} by ${value}`);
      //       return x * value;
      //     };
      //   }
      // }
    };

    const getTestCondition = (line) => {
      const getDivisibleBy = (line) => parseInt(line.split("by")[1]);
      const getTargetMonkey = (line) => parseInt(line.split("monkey")[1]);
      return {
        modulo: getDivisibleBy(line),
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

    const { operator, value } = monkey.op;
    const { modulo, isTrue, isFalse } = monkey.test;
    let testResult;

    const n = modulo;

    if (value === "old") {
      item *= item;
    } else if (operator === "*") {
      item *= value;
    } else if (operator === "+") {
      item += value;
    }

    monkey.itemCount++;

    // item = monkey.operation(item);
    log(`Operation: ${operator} ${value}`);
    log(`Worry level after operation is now  ${item}`);

    // Getting bored
    item = decreaseWorry(item);
    log(`Decrease Worry Levels to ${item}`);

    testResult = item % n === 0;

    log(`Worry level is dividible by ${n}: ${testResult}`);

    // Throw it

    const targetMonkeyId = testResult ? isTrue : isFalse;

    const targetMonkey = monkeyList.find((el) => el.id === targetMonkeyId);
    targetMonkey.items.push(item);

    log(`Item with worry level ${item} is thrown to monkey ${targetMonkeyId}.`);
  }
};

const doRounds = (monkeyList, maxRounds, decreaseWorry) => {
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

const monkeyListOne = createMonkeyList(input);
const divideByThree = (x) => Math.floor(x / 3);
const partOne = doRounds(monkeyListOne, 20, divideByThree);

log(partOne, true);
/** Part Two */

const monkeyListTwo = createMonkeyList(input);
const monkeyModuloSum = monkeyListTwo
  .map((monkey) => monkey.test.modulo)
  .reduce((acc, curr) => acc * curr);
const moduloTheSum = (x) => x % monkeyModuloSum;

const partTwo = doRounds(monkeyListTwo, 10000, moduloTheSum);
log(partTwo, true);
