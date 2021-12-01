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

const createFile = (filePath, fileContent) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, fileContent);
  }
};

function createAoCDay(year, day) {
  let path = `./${year}/Day\ ${day}`;
  createDir(path);
  createFile(`${path}/${day}.js`, content);
  createFile(`${path}/input`, "");
  createFile(`${path}/demo`, "");
}

function createDay(year, day) {
  if (!fs.existsSync(`./${year}/Day\ ${day}`)) {
    createAoCDay(year, day);
  }
}

function createYear(year) {
  if (!fs.existsSync(year)) {
    createDir(`./${year}`);
  }

  for (let i = 1; i <= 24; i++) {
    let day = i < 10 ? `0${i}` : i.toString();
    let currDate = `./${year}/Day\ ${day}`;
    if (!fs.existsSync(currDate)) {
      console.log(currDate);
      createAoCDay(year, day);
    }
  }
}

createYear(year);
