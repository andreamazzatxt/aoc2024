import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const [a, b] = input
  .split("\n")
  .map((l) => l.split("   ").map(Number))
  .reduce(
    ([a, b], curr) => [
      [...a, curr[0]],
      [...b, curr[1]],
    ],
    [[], []]
  );

const first = a.reduce((acc, n, i) => acc + Math.abs(n - b[i]), 0);

const second = a.reduce(
  (acc, n) => acc + n * b.filter((v) => v === n).length,
  0
);

console.log({ first, second });
