import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";

const input = fs
  .readFileSync(inputFilePath, "utf-8")
  .split("\n")
  .map((l) => ["", ...l.split("")]);

const isXMAS = (s) => s === "XMAS" || s === "SAMX";
const isMas = (s) => s === "MAS" || s === "SAM";

let first = 0;
let second = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    //FIRST
    // check for XMAS horizontally right
    let candidate =
      input.at(i)?.at(j) +
      input.at(i)?.at(j + 1) +
      input.at(i)?.at(j + 2) +
      input.at(i)?.at(j + 3);
    if (isXMAS(candidate)) {
      first++;
    }
    // check for XMAS vertically down
    candidate =
      input?.at(i)?.at(j) +
      input?.at(i + 1)?.at(j) +
      input?.at(i + 2)?.at(j) +
      input?.at(i + 3)?.at(j);
    if (isXMAS(candidate)) {
      first++;
    }

    // check for XMAS diagonally down-right
    candidate =
      input?.at(i)?.at(j) +
      input?.at(i + 1)?.at(j + 1) +
      input?.at(i + 2)?.at(j + 2) +
      input?.at(i + 3)?.at(j + 3);
    if (isXMAS(candidate)) {
      first++;
    }
    // check for XMAS diagonally down-left
    candidate =
      input?.at(i)?.at(j) +
      input?.at(i + 1)?.at(j - 1) +
      input?.at(i + 2)?.at(j - 2) +
      input?.at(i + 3)?.at(j - 3);
    if (isXMAS(candidate)) {
      first++;
    }

    //SECOND
    const firstDiagonal =
      input?.at(i - 1)?.at(j - 1) +
      input?.at(i)?.at(j) +
      input?.at(i + 1)?.at(j + 1);

    const secondDiagonal =
      input?.at(i - 1)?.at(j + 1) +
      input?.at(i)?.at(j) +
      input?.at(i + 1)?.at(j - 1);
    if (isMas(firstDiagonal) && isMas(secondDiagonal)) {
      second++;
    }
  }
}

console.log({ first, second });
