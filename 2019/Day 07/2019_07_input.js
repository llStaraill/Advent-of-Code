const currInput = [
  3,
  8,
  1001,
  8,
  10,
  8,
  105,
  1,
  0,
  0,
  21,
  38,
  47,
  72,
  97,
  122,
  203,
  284,
  365,
  446,
  99999,
  3,
  9,
  1001,
  9,
  3,
  9,
  1002,
  9,
  5,
  9,
  1001,
  9,
  4,
  9,
  4,
  9,
  99,
  3,
  9,
  102,
  3,
  9,
  9,
  4,
  9,
  99,
  3,
  9,
  1001,
  9,
  2,
  9,
  102,
  5,
  9,
  9,
  101,
  3,
  9,
  9,
  1002,
  9,
  5,
  9,
  101,
  4,
  9,
  9,
  4,
  9,
  99,
  3,
  9,
  101,
  5,
  9,
  9,
  1002,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  102,
  3,
  9,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  99,
  3,
  9,
  101,
  3,
  9,
  9,
  102,
  2,
  9,
  9,
  1001,
  9,
  4,
  9,
  1002,
  9,
  2,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  99,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  1,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  1,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  99,
  3,
  9,
  1001,
  9,
  1,
  9,
  4,
  9,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  1002,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  99,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  1002,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  1,
  9,
  4,
  9,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  1002,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  99,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  1,
  9,
  4,
  9,
  99,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  102,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  101,
  1,
  9,
  9,
  4,
  9,
  3,
  9,
  1002,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  1002,
  9,
  2,
  9,
  4,
  9,
  3,
  9,
  101,
  2,
  9,
  9,
  4,
  9,
  3,
  9,
  1001,
  9,
  2,
  9,
  4,
  9,
  99
];

const testInput = [
  3,
  31,
  3,
  32,
  1002,
  32,
  10,
  32,
  1001,
  31,
  -2,
  31,
  1007,
  31,
  0,
  33,
  1002,
  33,
  7,
  33,
  1,
  33,
  31,
  31,
  1,
  32,
  31,
  31,
  4,
  31,
  99,
  0,
  0,
  0
];

let testInputLoop = [
  3,
  26,
  1001,
  26,
  -4,
  26,
  3,
  27,
  1002,
  27,
  2,
  27,
  1,
  27,
  26,
  27,
  4,
  27,
  1001,
  28,
  -1,
  28,
  1005,
  28,
  6,
  99,
  0,
  0,
  5
];