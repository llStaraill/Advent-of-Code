const fs = require("fs");

const args = process.argv.splice(2);

const [year] = [...args];

const content = `const fs = require("fs");
const args = process.argv.splice(2);
const fileName = args[0] === "demo" ? "./demo" : "./input";

let input = fs
  .readFileSync(fileName, "utf-8")
  .split(/\\n/)`;

const createDir = (dirPath) => fs.mkdirSync(dirPath);

const createFile = (filePath, fileContent) =>
  fs.writeFileSync(filePath, fileContent);

function createAoCDay(year, day) {
  let path = `./${year}/Day\ ${day}`;
  createDir(path);
  createFile(`${path}/${day}.js`, content);
  createFile(`${path}/input`, "");
  createFile(`${path}/demo`, "");
}

function createDay(year, day) {
  if(!fs.existsSync(`./${year}/Day\ ${day}`)) {
    createAoCDay(year,day)
  }
}

function createYear(year) {
  if (!fs.existsSync(year)) {
    createDir(`./${year}`);
  }

  for (let i = 1; i <= 12; i++) {
    let day = i < 10 ? `0${i}` : i;
    if(!fs.existsSync(`./${year}/Day\ ${day}`)) {
      createAoCDay(year,day)
    }
  }
}
createYear(year)