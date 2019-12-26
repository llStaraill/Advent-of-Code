const prepareDP = pointer =>
  pointer
    .toString()
    .padStart(5, "0")
    .match(/(\d)(\d)(\d)(\d\d)/u)
    .splice(1)
    .map(Number)
    .reverse();

function getParameter(mode, num, rB, band, pos) {
  switch (mode) {
    case 0:
      return band[band[pos + num]];
      break;
    case 1:
      return band[pos + num];
      break;
    case 2:
      return band[rB + band[pos + num]];
      break;
  }
}

function* turingCode(band, pos, relativeBase, resultArr) {
  while (pos < band.length) {
    let [op, ...mode] = prepareDP(band[pos]);
    let par1 = getParameter(mode[0], 1, relativeBase, band, pos);
    let par2 = getParameter(mode[1], 2, relativeBase, band, pos);
    let par3 = mode[2] === 2 ? relativeBase + band[pos + 3] : band[pos + 3];

    /*console.log(
      `Pos: ${pos}/${
        band[pos]
      } - rB: ${relativeBase}\nPar: [${par1}|${par2}|${par3}]\nPos:[${
        band[pos + 1]
      }|${band[pos + 2]}|${band[pos + 3]}]`
    );*/
    switch (op) {
      case 99:
        resultArr.push(false);
        return;
      case 1:
        band.splice(par3, 1, par1 + par2);
        pos += 4;
        break;
      case 2:
        band.splice(par3, 1, par1 * par2);
        pos += 4;
        break;
      case 3:
        let inp = yield;
        console.log(`Input: ${inp}`);
        let three =
          mode[0] == 2
            ? parseInt(relativeBase) + parseInt(band[pos + 1])
            : band[pos + 1];
        band.splice(three, 1, inp);
        pos += 2;
        break;
      case 4:
        const four = par1;
        const result = [four, pos + 2, relativeBase, pos];
        //console.log(`Output: ${result}`);

        resultArr.push(four);
        pos += 2;
        break;
      case 5:
        par1 !== 0 ? (pos = par2) : (pos += 3);

        break;
      case 6:
        par1 === 0 ? (pos = par2) : (pos += 3);
        break;
      case 7:
        par1 < par2 ? band.splice(par3, 1, 1) : band.splice(par3, 1, 0);
        pos += 4;
        break;
      case 8:
        par1 == par2 ? band.splice(par3, 1, 1) : band.splice(par3, 1, 0);
        pos += 4;
        break;
      case 9:
        let nine = par1;
        relativeBase += nine;
        pos += 2;
        break;
    }
  } yield done = true;
}

class TuringMachine {
  constructor(data) {
    this.band = data;
    this.position = 0;
    this.relativeBase = 0;
    this.resultArr = [];
    this.done = false;
    this.pc = turingCode(
      this.band,
      this.position,
      this.relativeBase,
      this.resultArr,
      this.done
    );
  }
  initialize() {
    this.pc.next();
  }

  run(input) {
    //console.log(this.position)
    this.resultArr.splice(0, 2);
    this.pc.next(input);
    let result = this.resultArr;
    return result;
  }

  finish() {
    return this.done
  }
}
