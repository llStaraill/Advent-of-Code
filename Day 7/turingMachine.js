const prepareDP = pointer =>
  pointer
    .toString()
    .padStart(5, "0")
    .match(/(\d)(\d)(\d)(\d\d)/u)
    .splice(1)
    .map(Number)
    .reverse();

function* turingCode(band, pos) {
  while (pos < band.length && band[pos] !== 99) {
    let [op, ...mode] = prepareDP(band[pos]);
    let par1 = parseInt(mode[0] == 0 ? band[band[pos + 1]] : band[pos + 1]);
    let par2 = parseInt(mode[1] == 0 ? band[band[pos + 2]] : band[pos + 2]);
    let par3 = parseInt(band[pos + 3]);
    console.log(`Position: ${band[pos]} - OP: ${op}`)
    switch (op) {
      case 99:
        console.log(`99`);
        yield 99
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
        band.splice(band[pos + 1], 1, inp);
        pos += 2;
        break;
      case 4:
        const four = mode[0] == 0 ? band[band[pos + 1]] : band[pos + 1];
        console.log(four)
        const result = [four,pos+2]
        console.log(`Output: ${result[0]}`);
        yield result;
        pos += 2;
        break;
      case 5:
        par1 !== 0 ? (pos = par2) : (pos += 3);

        break;
      case 6:
        par1 === 0 ? (pos = par2) : (pos += 3);
        break;
      case 7:
        par1 < par2
          ? band.splice(band[pos + 3], 1, 1)
          : band.splice(band[pos + 3], 1, 0);
        pos += 4;
        break;
      case 8:
        par1 === par2
          ? band.splice(band[pos + 3], 1, 1)
          : band.splice(band[pos + 3], 1, 0);
        pos += 4;
        break;
    }
  }
}
