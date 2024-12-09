import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";

const getInput = () =>
  fs
    .readFileSync(inputFilePath, "utf-8")
    .split("")
    .map(Number)
    .reduce((acc, char, i) => {
      if (i % 2 === 0) {
        const file = new Array(char).fill(i / 2);
        return acc.concat(file);
      }
      const freeSpace = new Array(char).fill(".");
      return acc.concat(freeSpace);
    }, []);

const first = getInput();

const freeSpaces = first
  .map((cell, i) => ({ cell, i }))
  .filter(({ cell }) => cell === ".")
  .map(({ i }) => i);

while (freeSpaces.length > 0) {
  const fileCandidate = first.pop();

  if (fileCandidate === ".") {
    continue;
  }

  const freeSpaceIndex = freeSpaces.shift();
  first.splice(freeSpaceIndex, 1, fileCandidate);
}

const getChecksum = (input) =>
  input.reduce((acc, val, i) => (isNaN(val) ? acc : acc + val * i), 0);

console.log(getChecksum(first));

let second = getInput();

let currentNumber = second.toReversed().find((c) => !isNaN(c));

while (currentNumber !== 0) {
  const candidate = second.filter((c) => c === currentNumber);
  const freeSpace = second
    .join("")
    .indexOf(Array(candidate.length).fill(".").join(""));

  if (freeSpace === -1 || freeSpace > second.indexOf(currentNumber)) {
    currentNumber--;
    continue;
  }

  const freeSpaceRange = Array(candidate.length)
    .fill(0)
    .map((_, i) => i + freeSpace);

  second = second.map((c, i) => {
    if (freeSpaceRange.includes(i)) {
      return currentNumber;
    }
    if (c === currentNumber) {
      return ".";
    }
    return c;
  });

  currentNumber--;
}

console.log(getChecksum(test));
console.log(getChecksum(second));
