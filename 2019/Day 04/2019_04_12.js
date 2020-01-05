let input = "193651-649729";
input = input.split("-").map(i => parseInt(i));

let inputRange = [];

for (let i = input[0]; i <= input[1]; i++) {
  inputRange.push(input[0]++);
}

let risingDigitArr = [];


function risingDigits(digits) {
  let number = digits.split("");
  let numberArr = [...number.map(i => parseInt(i))];
  let risingNumbers = true;

  let sortArr = [...numberArr].sort(function(a, b){return a - b});
  if (sortArr.toString() === numberArr.toString()) {
    risingDigitArr.push(digits)
  }
}

inputRange.map(i => risingDigits(i.toString()));
console.log(risingDigitArr.length);
let result = [];

function onlyDoubles(digits) {
  let number = digits.split("");
  let numberArr = [...number.map(i => parseInt(i))];

  for (let i = 0; i <= numberArr.length; i++) {
    let curr = i;
    let next = i + 1;
    let nextNext = i + 2;
    let prev = i - 1;
    if (
      numberArr[curr] !== numberArr[prev] &&
      numberArr[curr] === numberArr[next] &&
      numberArr[curr] !== numberArr[nextNext]
    ) {
      result.push(digits);
      break;
    }
  }
}

risingDigitArr.map(i => onlyDoubles(i.toString()));
console.log(result);
