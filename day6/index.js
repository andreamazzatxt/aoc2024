import fs from "fs";

const inputFilePath = process.argv.includes("-test")
  ? "./test.txt"
  : "./input.txt";

const originalGrid = fs
  .readFileSync(inputFilePath, "utf-8")
  .split("\n")
  .map((row) => row.split(""));

const directions = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

const turn90 = (direction) => {
  return {
    up: "right",
    right: "down",
    down: "left",
    left: "up",
  }[direction];
};

const isOutOfBounds = (x, y) => {
  return (
    x < 0 || y < 0 || x >= originalGrid[0].length || y >= originalGrid.length
  );
};

const perform = (grid) => {
  let currentDirection = "up";

  const guardCoordinates = grid.reduce(
    (acc, row, y) => {
      row.forEach((cell, x) => {
        if (cell === "^") {
          acc.x = x;
          acc.y = y;
        }
      });

      return acc;
    },
    { x: 0, y: 0 }
  );

  const visited = new Set();
  const visitedWithDirection = new Set();

  const recordVisited = () => {
    visited.add(`${guardCoordinates.x},${guardCoordinates.y}`);
    visitedWithDirection.add(
      `${guardCoordinates.x},${guardCoordinates.y},${currentDirection}`
    );
  };
  recordVisited();

  const checkIfInfinite = () => {
    return visitedWithDirection.has(
      `${guardCoordinates.x},${guardCoordinates.y},${currentDirection}`
    );
  };

  let isInfinite = false;

  const step = () => {
    guardCoordinates.x += directions[currentDirection].x;
    guardCoordinates.y += directions[currentDirection].y;
  };

  while (true) {
    recordVisited();
    step();
    const nextX = guardCoordinates.x + directions[currentDirection].x;
    const nextY = guardCoordinates.y + directions[currentDirection].y;

    if (isOutOfBounds(nextX, nextY)) {
      visited.add(`${guardCoordinates.x},${guardCoordinates.y}`);
      break;
    }
    const nextCell = grid[nextY][nextX];

    if (nextCell === "#") {
      currentDirection = turn90(currentDirection);
      visitedWithDirection.add();
    }
    if (checkIfInfinite()) {
      isInfinite = true;
      break;
    }
  }

  return { visited, isInfinite };
};

const firstSteps = perform(originalGrid).visited;
console.log(firstSteps.size);

let infiniteLoops = 0;

firstSteps.forEach((coordinates) => {
  const [x, y] = coordinates.split(",").map(Number);
  const newGrid = originalGrid.map((row) => [...row]);
  newGrid[y][x] = "#";
  const { isInfinite } = perform(newGrid);

  if (isInfinite) {
    console.log(y, x);
    infiniteLoops++;
  }
});

console.log(infiniteLoops);
