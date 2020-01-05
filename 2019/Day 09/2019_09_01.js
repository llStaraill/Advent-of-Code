
const additionalMemory = new Array(2000000).fill(0);
//const boostCode = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99].concat(additionalMemory);
const boostCode = inputD9.concat(additionalMemory);

let day9 = new TuringMachine(boostCode);
day9.initialize();
console.log(day9.run(1));
