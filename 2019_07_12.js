/* Import opCode Computer (Day 5) > codeInterpreter(software,input)
    Adjusted to take multiple input parameters:
      else if (dP[3] === "03") {
      code.splice(code[i + 1], 1, inp[inputInstruction]);
      inputInstruction += 1;
      i += 2;}  */

let input = currInput;
let sequence = [1, 0, 4, 3, 2];

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

/// Part II

function Amplifier(data) {
  this.band = [...data];
  this.pointer = 0;
}

Amplifier.prototype.run = function(input) {
  let band = this.band;
  let pos = this.pointer;
  console.log(`Pos: ${pos}`);
  let result;
  let amp = turingCode(band, pos);
  let done = amp.next().done;
  if (done) {
    return false;
  }
  if (Array.isArray(input)) {
    amp.next(input[0]);
    result = amp.next(input[1]).value;
  } else {
    result = amp.next(input).value;
  }
  this.pointer = result[1] !== undefined ? result[1] : 0;
  return result[0];
};

let sequenceLoop = [9, 8, 7, 6, 5];
let lastOuput;


function feedBackLoop(amp, loop, i, arr) {
  console.log(`////// Loop #${1 + i}`);
  arr.push(loop[5]);

  loop[1] = amp[1].run(loop[5], 1);
  if (loop[1] === false) {
    console.log(loop[5]);
    return loop[5];
  } else {
    loop[2] = amp[2].run(loop[1], 2);
    loop[3] = amp[3].run(loop[2], 3);
    loop[4] = amp[4].run(loop[3], 4);
    loop[5] = amp[5].run(loop[4], 5);

    i++;
    feedBackLoop(amp, loop, i, arr);
  }
}

function feedbackSignal(input, seq) {
  let inc = 0;
  let last = [];
  let amp = {
    1: new Amplifier(input),
    2: new Amplifier(input),
    3: new Amplifier(input),
    4: new Amplifier(input),
    5: new Amplifier(input)
  };
  let loop = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  loop[1] = amp[1].run([seq[0], 0], 1);
  loop[2] = amp[2].run([seq[1], loop[1]], 2);
  loop[3] = amp[3].run([seq[2], loop[2]], 3);
  loop[4] = amp[4].run([seq[3], loop[3]], 4);
  loop[5] = amp[5].run([seq[4], loop[4]], 5);
  last.push(loop[5]);
  feedBackLoop(amp, loop, inc, last);
  return last[last.length - 1];
}

let loopPerms = getAllPermutations(sequenceLoop);

function getAllOutputs(permutations, input) {
  let outputSet = [];
  for (let i = 0; i < permutations.length; i++) {
    let output = feedbackSignal(input, permutations[i]);
    outputSet.push(output);
  }
  return outputSet;
}

let maxOutput = Math.max(...getAllOutputs(loopPerms, input));
console.log(maxOutput);
