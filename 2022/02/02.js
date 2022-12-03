const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";
let input = fs.readFileSync(fileName, "utf-8").split("\n");

const add = (acc, curr) => acc + curr;

const hand = { X: 1, Y: 2, Z: 3 };

const outcome = { win: 6, draw: 3, loss: 0 };

const partOne = input
  .map((strategy) => {
    const [_, __, own] = strategy.match(/(\D) (\D)/);

    const match = strategy.match(
      /(?<win>A Y|B Z|C X)|(?<draw>A X|B Y|C Z)|(?<loss>A Z|B X|C Y)/
    );

    const { win, draw } = match.groups;

    return hand[own] + (win ? outcome.win : 0) + (draw ? outcome.draw : 0);
  })
  .reduce(add);

const partTwo = input
  .map((strategy) => {
    const scores = {
      A: { Z: hand.Y, X: hand.Z, Y: hand.X },
      B: { Z: hand.Z, X: hand.X, Y: hand.Y },
      C: { Z: hand.X, X: hand.Y, Y: hand.Z },
    };

    const roundOutcome = { X: 0, Y: 3, Z: 6 };

    const [_, opp, cmd] = strategy.match(/(\D) (\D)/);

    return (scoreValue = roundOutcome[cmd] + scores[opp][cmd]);
  })
  .reduce(add);

console.log(partOne);
console.log(partTwo);
