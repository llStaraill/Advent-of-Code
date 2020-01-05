function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const opCode = stripInputBare(input);
const inp = 5;

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
    let par1 = parseInt(dP[2] == 0 ? code[code[i + 1]] : code[i + 1]);
    let par2 = parseInt(dP[1] == 0 ? code[code[i + 2]] : code[i + 2]);
    let par3 = parseInt(code[i + 3]);
    console.log(`Index ${i}\nDP:${prepareDP(code[6].toString())}\nPar1: ${par1} Par2: ${par2}`)
    //console.log(`${i} - ${dP[3]}:\n${code}`);
    if (dP[3] === "99") {
      break;
    }

    if (dP[3] === "01") {
      code.splice(code[i + 3], 1, parseInt(par1) + parseInt(par2));

      i += 4;
    } else if (dP[3] === "02") {
      code.splice(par3, 1, parseInt(par1) * parseInt(par2));
      i += 4;
    } else if (dP[3] === "03") {
      code.splice(code[i + 1], 1, inp);
      i += 2;
    } else if (dP[3] === "04") {
      console.log(`Output: ${dP[2] == 0 ? code[code[i + 1]] : code[i + 1]}`);
      i += 2;
    } else if (dP[3] === "05") {
      if (par1 != 0) {
        let inc = parseInt(par2);
        console.log(`Index:${i} ${par1} != 0\n${code[i+parseInt(par2)]}`);
        i = inc;
      } else {
        i += 3;
      }
    } else if (dP[3] === "06") {
      if (par1 == 0) {
        let inc = parseInt(par2);
        console.log(`${par1} = 0`);

        i = inc;
      } else {
        i += 3;
      }
    } else if (dP[3] === "07") {
      if (par1 < par2) {
        code.splice(code[i + 3], 1, 1);
        console.log(`${par1} < ${par2}`);
      } else {
        code.splice(code[i + 3], 1, 0);
        console.log(`${par1} > ${par2}`);
      }
      i += 4;
    } else if (dP[3] === "08") {
      if (par1 == par2) {
        code.splice(code[i + 3], 1, 1);
        console.log(`${par1} equals ${par2}`);
      } else {
        code.splice(code[i + 3], 1, 0);
        console.log(`${par1} does not equal ${par2}`);
      }
      i += 4;
    }
  }
}

//codeInterpreter([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]);
//codeInterpreter([3, 3, 1108, -1, 8, 3, 4, 3, 99]);
/*codeInterpreter([3, 3, 1107, -1, 8, 3, 4, 3, 99]);
codeInterpreter([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]);
codeInterpreter([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]);*/

codeInterpreter(opCode);
