import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";
const input = fs.readFileSync(inputFilePath, "utf-8");

const levels = input.split("\n").map((l) => l.split(" ").map(Number));

const isLevelValid = (level) => {
  let isValid = true;
  let currentDiff = 0;

  level.every((num, i, arr) => {
    if (!arr?.[i + 1]) {
      return;
    }

    const diff = num - (arr?.[i + 1] ?? 0);

    if (Math.abs(diff) > 3 || diff === 0) {
      isValid = false;
      return false;
    }

    if (!currentDiff) {
      currentDiff = diff;
      return true;
    }

    if ((diff < 0 && currentDiff > 0) || (diff > 0 && currentDiff < 0)) {
      isValid = false;
      return false;
    }
    return true;
  });

  return isValid;
};

const first = levels.reduce(
  (acc, level) => (isLevelValid(level) ? acc + 1 : acc),
  0
);

const second = levels.reduce((acc, level) => {
  if (isLevelValid(level)) return acc + 1;

  return level.some((_, i, a) => isLevelValid(a.toSpliced(i, 1)))
    ? acc + 1
    : acc;
}, 0);

console.log({ first, second });
