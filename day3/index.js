import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";

const input = fs.readFileSync(inputFilePath, "utf-8");

const pattern = /mul\(\d{1,3},\d{1,3}\)/g;

const first = input.match(pattern).reduce((acc, match) => {
  const [a, b] = match.match(/\d+/g);
  return acc + a * b;
}, 0);

const [second] = input
  .match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)/g)
  .reduce(
    ([sum, multiply], m) => {
      if (m === "do()") return [sum, true];

      if (m === "don't()") return [sum, false];

      const [a, b] = m.match(/\d+/g);
      return [sum + (multiply ? a * b : 0), multiply];
    },
    [0, true]
  );

console.log({ first, second });
