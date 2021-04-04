const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split(/\n/)
  .map((cmd) => cmd.replace(/\r/, ""));

//console.log(input);

const x = 123;
const y = 456;
const d = x & y;
const e = x | y;
const f = x << 2;
const g = y >> 2;
const h = ~x;
const i = ~y;
console.log(`d: ${d}`);
console.log(`e: ${e}`);
console.log(`f: ${f}`);
console.log(`g: ${g}`);
console.log(`h: ${h}`);
console.log(`i: ${i}`);
console.log(`x: ${x}`);
console.log(`y: ${y}`);
