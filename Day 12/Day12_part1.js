function stripInputBare(string) {
  return string.replace(/(\r\n|\n|\r)/gm, ",").split(",");
}

function prepareInput(string) {
  let arr = string.replace(/(\<x=|\y=|\z=|\>)/gm, "").split("\n");

  return arr.map(i => i.split(","));
}

input = prepareInput(inputD12);

function Moon(x, y, z) {
  this.pos = {
    x: parseInt(x),
    y: parseInt(y),
    z: parseInt(z)
  };
  this.vel = {
    x: 0,
    y: 0,
    z: 0
  };
}

let io = new Moon(...input[0]);
let europe = new Moon(...input[1]);
let ganymede = new Moon(...input[2]);
let callisto = new Moon(...input[3]);

let moonArr = [io, europe, ganymede, callisto];
let initialMoons = [io, europe, ganymede, callisto];

function addGravity(a, b) {
  return a === b ? 0 : a < b ? 1 : -1;
}

function addMoonAB(a, b) {
  a.vel.x += addGravity(a.pos.x, b.pos.x);
  a.vel.y += addGravity(a.pos.y, b.pos.y);
  a.vel.z += addGravity(a.pos.z, b.pos.z);
}

function addVelocity(a) {
  a.pos.x += a.vel.x;
  a.pos.y += a.vel.y;
  a.pos.z += a.vel.z;
}

function addMoons(a, arra) {
  let moon = a;
  let arr = arra.filter(i => i !== moon);
  arr.map(i => addMoonAB(moon, i));
}

function timeStep(arr, steps) {
  for (let i = 0; i < steps; i++) {
    arr.map(i => addMoons(i, arr));
    arr.map(i => addVelocity(i));
  }
}

//timeStep(moonArr, 2772);

function getEnergy(a) {
  return Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
}

function addEnergy(arr) {
  let io = {
    pot: getEnergy(arr[0].pos),
    kin: getEnergy(arr[0].vel)
  };
  let europe = {
    pot: getEnergy(arr[1].pos),
    kin: getEnergy(arr[1].vel)
  };
  let ganymede = {
    pot: getEnergy(arr[2].pos),
    kin: getEnergy(arr[2].vel)
  };
  let callisto = {
    pot: getEnergy(arr[3].pos),
    kin: getEnergy(arr[3].vel)
  };

  return (
    io.pot * io.kin +
    europe.pot * europe.kin +
    ganymede.pot * ganymede.kin +
    callisto.pot * callisto.kin
  );
}

// let result = addEnergy(moonArr)

///// Part II

let oIo = new Moon(...input[0]);
let oEurope = new Moon(...input[1]);
let oGanymede = new Moon(...input[2]);
let oCallisto = new Moon(...input[3]);

let oMoonArr = [oIo, oEurope, oGanymede, oCallisto];

function gcd(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);

  while (y) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function lcm(x, y) {
  return !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));
}

function countReset(xyz, num, arra) {
  let inc = 0;
  let arr = JSON.parse(JSON.stringify(arra));

  do {
    arr.map(i => addMoons(i, arr));
    arr.map(i => addVelocity(i));
    inc++;
  } while (
    arra[num].pos[xyz] !== arr[num].pos[xyz] ||
    arra[num].vel[xyz] !== arr[num].vel[xyz]
  );

  return inc;
}

console.log(countReset("x", 0, moonArr));
/*
let oIoSteps = {
  x: countReset("x", 0, moonArr),
  y: countReset("y", 0, moonArr),
  z: countReset("z", 0, moonArr)
};

let europeSteps = {
  x: countReset("x", 1, moonArr),
  y: countReset("y", 1, moonArr),
  z: countReset("z", 1, moonArr)
};

let ganymedeSteps = {
  x: countReset("x", 2, moonArr),
  y: countReset("y", 2, moonArr),
  z: countReset("z", 2, moonArr)
};

let callistoSteps = {
  x: countReset("x", 3, moonArr),
  y: countReset("y", 3, moonArr),
  z: countReset("z", 3, moonArr)
};

let moonSteps = [oIoSteps, europeSteps, ganymedeSteps, callistoSteps];

function addLCM(moon) {
  moon.lcm = lcm(lcm(moon.x, moon.y), moon.z);
}

moonSteps.map(i => addLCM(i));

let reset = lcm(
  oIoSteps.lcm,
  lcm(europeSteps.lcm, lcm(ganymedeSteps.lcm, callistoSteps.lcm))
);
console.log(reset);*/