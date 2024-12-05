import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";

const input = fs.readFileSync(inputFilePath, "utf-8").split("\n\n");

const rules = input[0].split("\n").map((rule) => rule.split("|"));

const getMiddle = (array) => array[Math.floor(array.length / 2)];

const updates = input[1].split("\n").map((update) => update.split(","));

const { valid, invalid } = updates.reduce(
  (acc, update) => {
    const isValid = update.every((value, i, arr) => {
      const onRight = rules.filter(([l]) => l === value).map(([, r]) => r);
      const onLeft = rules.filter(([, r]) => r === value).map(([l]) => l);

      const leftPortion = arr.slice(0, i);
      const rightPortion = arr.slice(i + 1);

      return (
        leftPortion.every((v) => !onRight.includes(v)) &&
        rightPortion.every((v) => !onLeft.includes(v))
      );
    });

    if (isValid) {
      return { ...acc, valid: [...acc.valid, update] };
    }
    return { ...acc, invalid: [...acc.invalid, update] };
  },
  { valid: [], invalid: [] }
);

const first = valid.reduce((acc, v) => acc + +getMiddle(v), 0);

const sortByRules = (a, b) => {
  if (rules.find(([l, r]) => l === a && r === b)) return 0;
  return -1;
};

const second = invalid
  .map((update) => {
    return update.sort(sortByRules);
  })
  .reduce((acc, v) => acc + +getMiddle(v), 0);

console.log({ first, second });
