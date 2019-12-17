function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

const opCode = stripInputBare(inputOP);
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

function codeInterpreter(code, inputValue) {
  let inp = [...inputValue];
  let inputIncrementor = 0;

  for (let i = 0; i <= code.length; ) {
    let directionPointer = prepareDP(code[i].toString());
    let increment = 1;
    let dP = directionPointer;
    let par1 = parseInt(dP[2] == 0 ? code[code[i + 1]] : code[i + 1]);
    let par2 = parseInt(dP[1] == 0 ? code[code[i + 2]] : code[i + 2]);
    let par3 = parseInt(code[i + 3]);

    if (dP[3] === "99") {
      console.log(99);
      return 99;
      break;
    }

    if (dP[3] === "01") {
      code.splice(code[i + 3], 1, parseInt(par1) + parseInt(par2));

      i += 4;
    } else if (dP[3] === "02") {
      code.splice(par3, 1, parseInt(par1) * parseInt(par2));
      i += 4;
    } else if (dP[3] === "03") {
      console.log("MeowMeow Gimme iwnpuwt pwease UwU");
      code.splice(code[i + 1], 1, inp[inputIncrementor]);
      inputIncrementor += 1;
      i += 2;
    } else if (dP[3] === "04") {
      //console.log(`Output: ${dP[2] == 0 ? code[code[i + 1]] : code[i + 1]}`);

      return dP[2] == 0 ? code[code[i + 1]] : code[i + 1];

      i += 2;
    } else if (dP[3] === "05") {
      if (par1 != 0) {
        let inc = parseInt(par2);
        i = inc;
      } else {
        i += 3;
      }
    } else if (dP[3] === "06") {
      if (par1 == 0) {
        let inc = parseInt(par2);

        i = inc;
      } else {
        i += 3;
      }
    } else if (dP[3] === "07") {
      if (par1 < par2) {
        code.splice(code[i + 3], 1, 1);
      } else {
        code.splice(code[i + 3], 1, 0);
      }
      i += 4;
    } else if (dP[3] === "08") {
      if (par1 == par2) {
        code.splice(code[i + 3], 1, 1);
      } else {
        code.splice(code[i + 3], 1, 0);
      }
      i += 4;
    }
  }
}
//console.log(codeInterpreter(opCode, [5]));
