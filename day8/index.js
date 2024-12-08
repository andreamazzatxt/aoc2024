import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";

const input = fs
  .readFileSync(inputFilePath, "utf-8")
  .split("\n")
  .map((row) => row.split(""));

const antennasTypes = Array.from(
  input.reduce((acc, row) => {
    row.forEach((cell) => {
      if (cell !== "." && cell !== "#") {
        acc.add(cell);
      }
    });
    return acc;
  }, new Set())
);

const permutationsPerType = antennasTypes.reduce((acc, type) => {
  const antennas = input.reduce((acc, row, y) => {
    row.forEach((cell, x) => {
      if (cell === type) {
        acc.push({ x, y });
      }
    });
    return acc;
  }, []);

  const permutations = antennas.reduce((acc, antenna1, i) => {
    for (let j = i + 1; j < antennas.length; j++) {
      acc.push(
        [antenna1, antennas[j]]
          .sort((a, b) => a.x - b.x)
          .sort((a, b) => a.y - b.y)
      );
    }
    return acc;
  }, []);

  permutations;
  return acc;
}, {});

const isInBound = ({ x, y }) =>
  x >= 0 && y >= 0 && x < input[0].length && y < input.length;

const caluclateAntinodesCoordinates = (antenna1, antenna2) => {
  const xDiff = antenna2.x - antenna1.x;
  const yDiff = antenna2.y - antenna1.y;
  return [
    { x: antenna1.x - xDiff, y: antenna1.y - yDiff },
    { x: antenna2.x + xDiff, y: antenna2.y + yDiff },
  ].filter(isInBound);
};

const antinodes = new Set();

Object.entries(permutationsPerType).forEach(([type, permutations]) => {
  permutations.forEach(([antenna1, antenna2]) => {
    const antinodesCoordinates = caluclateAntinodesCoordinates(
      antenna1,
      antenna2
    );

    antinodesCoordinates.forEach((antinode) => {
      antinodes.add(antinode.x + "," + antinode.y);
    });
  });
});

const calculateExtendedAntinodes = (antenna1, antenna2) => {
  const xDiff = antenna2.x - antenna1.x;
  const yDiff = antenna2.y - antenna1.y;
  return Array.from(
    { length: input.length * 2 + 1 },
    (_, i) => i - input.length
  )
    .flatMap((i) => [
      { x: antenna1.x + i * xDiff, y: antenna1.y + i * yDiff },
      { x: antenna1.x - i * xDiff, y: antenna1.y - i * yDiff },
    ])
    .filter(isInBound);
};

const extendedAntinodes = new Set();

Object.entries(permutationsPerType).forEach(([type, permutations]) => {
  permutations.forEach(([antenna1, antenna2]) => {
    const antinodesCoordinates = calculateExtendedAntinodes(antenna1, antenna2);

    antinodesCoordinates.forEach((antinode) => {
      extendedAntinodes.add(antinode.x + "," + antinode.y);
    });
  });
});

// Part 1
console.log(antinodes.size);
// Part 2
console.log(extendedAntinodes.size);
