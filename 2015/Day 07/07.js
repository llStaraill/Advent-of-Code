const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split(/\n/)
  .map((cmd) => cmd.replace(/\r|\s/g, ""));

//console.log(input);
let parsedInput = input.map((cmd) => cmd.split("->"));

//console.log(input);

function uint16(n) {
  return n & 0xffff;
}

function AND(x, y) {
  return uint16(x & y);
}

function OR(x, y) {
  return uint16(x | y);
}

function shiftL(x, y) {
  return uint16(x << y);
}

function shiftR(x, y) {
  return uint16(x >> y);
}

function NOT(x) {
  return uint16(~x);
}

class Circuit {
  constructor(data) {
    for (let i = 0; i < data.length; i++) {
      let key = data[i][1];

      let cmdString = data[i][0];
      //console.log(key, cmdString);

      if (cmdString.includes("AND")) {
        let cmd = cmdString
          .split("AND")
          .map((el) => (isNaN(el) ? el : parseInt(el)));

        console.log(cmd, i);

        let x = isNaN(cmd[0]) ? () => this[cmd[0]]() : cmd[0];
        let y = isNaN(cmd[1]) ? () => this[cmd[1]]() : cmd[1];

        console.log(x, y);

        this[key] = function () {
          return x & y;
        };
      } else if (cmdString.includes("OR")) {
        let cmd = cmdString
          .split("OR")
          .map((el) => (isNaN(el) ? el : parseInt(el)));

        let x = isNaN(cmd[0]) ? () => this[cmd[0]]() : cmd[0];
        let y = isNaN(cmd[1]) ? () => this[cmd[1]]() : cmd[1];

        this[key] = function () {
          return x | y;
        };
      } else if (cmdString.includes("LSHIFT")) {
        let cmd = cmdString
          .split("LSHIFT")
          .map((el) => (isNaN(el) ? el : parseInt(el)));

        let x = isNaN(cmd[0]) ? () => this[cmd[0]]() : cmd[0];
        let y = isNaN(cmd[1]) ? () => this[cmd[1]]() : cmd[1];

        this[key] = function () {
          return x << y;
        };
      } else if (cmdString.includes("RSHIFT")) {
        let cmd = cmdString
          .split("RSHIFT")
          .map((el) => (isNaN(el) ? el : parseInt(el)));

        let x = isNaN(cmd[0]) ? () => this[cmd[0]]() : cmd[0];
        let y = isNaN(cmd[1]) ? () => this[cmd[1]]() : cmd[1];

        this[key] = function () {
          return x >> y;
        };
      } else if (cmdString.includes("NOT")) {
        let cmd = cmdString
          .split("NOT")
          .map((el) => (isNaN(el) ? el : parseInt(el)));

        //let x = isNaN(cmd[0]) ? () => this[cmd[0]]() : cmd[0];
        let y = isNaN(cmd[1]) ? () => this[cmd[1]]() : cmd[1];

        this[key] = function () {
          return ~y;
        };
      } else {
        this[key] = function () {
          return uint16(
            isNaN(cmdString) ? this[cmdString]() : uint16(parseInt(cmdString))
          );
        };
      }
    }

    console.log(this);
  }
}

const circuit = new Circuit(parsedInput);

console.log(circuit.d());
