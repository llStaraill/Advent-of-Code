const fs = require("fs");
const path = require("path");
const currentDir = path.join(__dirname);
const [_, __, year] = process.argv;

const fileTemplate = `const fs = require("fs");
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

let input = fs
  .readFileSync(fileName, "utf-8")

/** Part One */


/** Part Two */
  `;

const getFolderList = (dirPath) => {
  try {
    const dirContent = fs.readdirSync(dirPath);

    return dirContent.filter((file) =>
      fs.lstatSync(`${dirPath}/${file}`).isDirectory()
    );
  } catch (err) {
    throw err;
  }
};

const createDir = (dirPath) => fs.mkdirSync(dirPath);
const createFile = (filePath, fileContent) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, fileContent);
  }
};

const paddedDay = (day) => String(day).padStart(2, "0");

const createYear = (year) => createDir(`./${year}`);
const createDay = (day) => {
  if (!fs.existsSync(`./${year}/${day}`)) {
    let path = `./${year}/${day}`;
    createDir(path);
    createFile(`${path}/${day}.js`, fileTemplate);
    createFile(`${path}/input`, "");
    createFile(`${path}/demo`, "");
  }
};

const initAoc = async () => {
  const folderList = getFolderList(currentDir);

  if (!year) throw Error("Please add a year");

  if (folderList.indexOf(year) === -1) {
    createYear(year);
    createDay(paddedDay(1));
  } else {
    console.log(`Year ${year} already exists. `);
    const folderList = getFolderList(path.join(currentDir, year));
    const lastFolderEntry = parseInt(folderList[folderList.length - 1]);

    if (lastFolderEntry === 24)
      throw Error("Congrats you already finished AoC 2022");

    createDay(paddedDay(lastFolderEntry + 1));
  }
};

initAoc();
