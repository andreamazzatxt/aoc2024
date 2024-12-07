import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";

const input = fs
  .readFileSync(inputFilePath, "utf-8")
  .split("\n")
  .map((row) => {
    const [result, numbers] = row.split(": ");
    return {
      result: +result,
      numbers: numbers.split(" ").map(Number),
    };
  });

function generateOpCombinations(ops, n) {
  if (n === 0) return [[]];

  const smallerCombinations = generateOpCombinations(ops, n - 1);
  const result = [];

  for (const combination of smallerCombinations) {
    for (const op of ops) {
      result.push([...combination, op]);
    }
  }

  return result;
}

const isValidCombination = (numbers, result) => (combination) =>
  combination.reduce((acc, op, i) => {
    switch (op) {
      case "+":
        return acc + numbers[i + 1];
      case "*":
        return acc * numbers[i + 1];
      default:
        return +`${acc}${numbers[i + 1]}`;
    }
  }, numbers[0]) === result;

const getCalibration = (ops) =>
  input.reduce((acc, { result, numbers }) => {
    const combinations = generateOpCombinations(ops, numbers.length - 1);
    const valid = combinations.some(isValidCombination(numbers, result));
    return acc + (valid ? result : 0);
  }, 0);

// Part 1
console.log(getCalibration(["+", "*"]));
// Part 2
console.log(getCalibration(["+", "*", "||"]));
