

const opCode = [...input];

function doTheMath(operator, val1, val2) {
  switch (operator) {
    case 1:
      return val1 + val2;
      break;
    case 2:
      return val1 * val2;
      break;
  }
}
function goThroughTheCode(arr) {
  let codeArr = [...arr];
  for (let i = 0; i <= codeArr.length - 1; i += 4) {
    let operator = codeArr[i];
    if (operator === 99) {
      break;
    }
    let valOne = codeArr[codeArr[i + 1]];
    let valTwo = codeArr[codeArr[i + 2]];
    let output = codeArr[i + 3];
    let result = doTheMath(operator, valOne, valTwo);
    codeArr.splice(output, 1, result);
  }
  return codeArr;
}

function dayTwo(arr) {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let memory = [...arr];
      memory.splice(1, 2, noun, verb);
      if (goThroughTheCode(memory)[0] === 19690720) {
        return 100 * noun + verb;
        break;
      }
    }
  }
}

console.log(dayTwo(opCode));
