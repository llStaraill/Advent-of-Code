/* Import opCode Computer (Day 5) > codeInterpreter(software,input)
    Adjusted to take multiple input parameters:
      else if (dP[3] === "03") {
      code.splice(code[i + 1], 1, inp[inputInstruction]);
      inputInstruction += 1;
      i += 2;}  */

let input = testInputLoop;
let sequence = [1, 0, 4, 3, 2];

function factorial(x) {
  if (x < 0) return;
  if (x === 0) return 1;
  return x * factorial(x - 1);
}

function getAllPermutations(sequence) {
  let seq = [...sequence];
  let results = [];

  if (seq.length === 1) {
    results.push(seq);
    return results;
  }

  for (let i = 0; i < seq.length; i++) {
    let first = seq[i];
    let leftOver = seq.filter(i => i != first);
    let innerPermutations = getAllPermutations(leftOver);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(first + innerPermutations[j]);
    }
  }
  return results;
}

let sequenceSet = getAllPermutations(sequence);

function getAmplifierOutput(input, first, second) {
  return codeInterpreter(input, [first, second]);
}

function getHighestOutput(input,seq , startValue) {
  let firstAmplifier = getAmplifierOutput(input, seq[0], startValue);
  let secondAmplifier = getAmplifierOutput(input, seq[1], firstAmplifier);
  let thirdAmplifier = getAmplifierOutput(input, seq[2], secondAmplifier);
  let fourthAmplifier = getAmplifierOutput(input, seq[3], thirdAmplifier);
  let fifthAmplifier = getAmplifierOutput(input, seq[4], fourthAmplifier);
  return fifthAmplifier;
}

/*console.log(getHighestOutput(input,sequence, 0)) */
/// Part II

let sequenceLoop = [9, 8, 7, 6, 5];
let amp = [0, 0, 0, 0, 0];
let lastOuput;

function getAmplifierOutputLoop(input, first, second) {
  return codeInterpreter(input, [first, second]);
}

function getHighestLoop(input, seq, array, startValue) {
  let amplifier = [...array];
  let lastOutput = 0;
  if (
    amplifier[0] == 99 ||
    amplifier[1] == 99 ||
    amplifier[2] == 99 ||
    amplifier[3] == 99 ||
    amplifier[4] == 99
  ) {
    return lastOutput;
  } else {
    /*amplifier[0] = getAmplifierOutput(input, seq[0], startValue);
    amplifier[1] = getAmplifierOutput(input, seq[1], amplifier[0]);
    amplifier[2] = getAmplifierOutput(input, seq[2], amplifier[1]);
    amplifier[3] = getAmplifierOutput(input, seq[3], amplifier[2]);
    amplifier[4] = getAmplifierOutput(input, seq[4], amplifier[3]);
    console.log(amplifier[4])
    let lastOutput = amplifier[4]
    getHighestLoop(input, seq, amplifier, amplifier[4]);*/
    let starter= 0;
    for (let i = 0; i <=7; i++) {
      
    amplifier[0] = getAmplifierOutput(input, seq[0], starter);
    console.log(`AMP1: ${amplifier[0]}`)
    amplifier[1] = getAmplifierOutput(input, seq[1], amplifier[0]);
    console.log(`AMP2: ${amplifier[1]}`)
    amplifier[2] = getAmplifierOutput(input, seq[2], amplifier[1]);
    console.log(`AMP3: ${amplifier[2]}`)
    amplifier[3] = getAmplifierOutput(input, seq[3], amplifier[2]);
    console.log(`AMP4: ${amplifier[3]}`)
    amplifier[4] = getAmplifierOutput(input, seq[4], amplifier[3]);
    console.log(`AMP5: ${amplifier[4]}`)
    starter = amplifier[4]
    //console.log(amplifier[4])
    }
  }
}

console.log(codeInterpreter(input,[sequenceLoop[0], 69814864]))
console.log(getHighestLoop(input, sequenceLoop, amp, 0));

/*function getAllOutputs(permutations, input) {
  let outputSet = [];
  for (let i = 0; i < permutations.length; i++) {
    let output = getHighestOutput(input, permutations[i]);
    outputSet.push(output);
  }
  return outputSet;
}

let maxOutput = Math.max(...getAllOutputs(sequenceSet, input));
console.log(maxOutput);
*/