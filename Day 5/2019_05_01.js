function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const opCode = stripInputBare(input);
const inp = 1;

function prepareDP(pointer) {
  let amountOfZeroes = "";
  for (let i = pointer.length; i < 5; i++) {
    amountOfZeroes += "0";
  }
  let preparedPointer = amountOfZeroes + pointer;
  preparedPointer.split("");
  return [
    preparedPointer[0],
    preparedPointer[1],
    preparedPointer[2],
    preparedPointer[3] + preparedPointer[4]
  ];
}

function codeInterpreter(codeArr) {
  let code = [...codeArr];

  for (let i = 0; i <= code.length; ) {
    let directionPointer = prepareDP(code[i].toString());
    let increment = 1;
    let dP = directionPointer;
    if (dP[3] === "99") {
      break;
    }

    if (dP[3] === "01") {
      code.splice(
        code[i + 3],
        1,
        parseInt(dP[2] == 0 ? code[code[i + 1]] : code[i + 1]) +
          parseInt(dP[1] == 0 ? code[code[i + 2]] : code[i + 2])
      );
      
      increment = 4;
    } else if (dP[3] === "02") {
      code.splice(
        code[i + 3],
        1,
        parseInt(dP[2] == 0 ? code[code[i + 1]] : code[i + 1]) *
          parseInt(dP[1] == 0 ? code[code[i + 2]] : code[i + 2])
      );
      increment = 4;
    } else if (dP[3] === "03") {
      code.splice(code[i + 1], 1, inp);
      increment = 2;
    } else if (dP[3] === "04") {
      console.log(`Output: ${dP[2] == 0 ? code[code[i + 1]] : code[i + 1]}`);
      increment = 2;
    }

    i += increment;
  }
}

codeInterpreter(opCode);
