function logIt(input) {
  console.log(input);
  document.write(input);
}

let input = "193651-649729";
input = input.split("-").map(i => parseInt(i));

let inputRange = [];

for (let i = input[0]; i <= input[1]; i++) {
  inputRange.push(input[0]++);
}

let doubleDigitArr = [];
let risingDigitArr = [];

function risingDigits(digits) {
  let number = digits.split("");
  let numberArr = [...number.map(i => parseInt(i))];
  let risingNumbers = true;

  for (let i = 0; i <= numberArr.length - 1; i) {
    let curr = i;
    let next = ++i;
    let nextOver = i + 2;
    if (numberArr[curr] > number[next]) {
      risingNumbers = false;
      break;
    }
  }
  risingNumbers ? risingDigitArr.push(digits) : null;
}

inputRange.map(i => risingDigits(i.toString()));

console.log(risingDigitArr.length)

function doubleDigits(digits) {
  let number = digits.split("");
  let numberArr = [...number.map(i => parseInt(i))];

  for (let i = 0; i <= numberArr.length - 1; i) {
    let curr = i;
    let next = ++i;
    if (number[curr] === number[next]) {
      doubleDigitArr.push(digits);
      break;
    }
  }
}

risingDigitArr.map(i => doubleDigits(i.toString()));

let noTrippleArr = [];

function noTripples(digits) {
  let number = digits.split("");
  let numberArr = [...number.map(i => parseInt(i))];

  for (let i = 0; i <= numberArr.length ; i++) {
    let curr = i;
    let next = i + 1;
    let nextNext = i + 2;
    let prev = i - 1;
    if (
      numberArr[curr] !== numberArr[prev] &&
      numberArr[curr] === numberArr[next] &&
      numberArr[curr] !== numberArr[nextNext]
    ) {
      console.log(
        `${number[prev]} - (${numberArr[curr]}) - ${numberArr[next]} - ${numberArr[nextNext]}`
      );
      noTrippleArr.push(digits);
      break;
    }
  }
}

//noTripples("111222333")

/*for (let i = 0; i < 50; i++) {
  noTripples(risingDigitArr[i].toString());
}*/
doubleDigitArr.map(i => noTripples(i.toString()));
console.log(noTrippleArr);
