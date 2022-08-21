import React, { useEffect } from "react";
import MSCell from "./MSCell";

function MSGrid() {
  const [grid, setGrid] = React.useState(createGrid(16, 30));

  function populate(cell, mines) {
    let indices = getFlatten();
    const omit = getSurrounding(cell);

    for (let i = 0; i < indices.length; i++) {
      for (let j = 0; j < omit.length; j++) {
        if (
          omit[j].y === indices[i].y &&
          omit[j].x === indices[i].x &&
          indices[i] !== undefined
        ) {
          indices.splice(i, 1);
        }
      }
    }

    for (let i = 0; i < mines; i++) {
      const rand = Math.floor(Math.random() * indices.length);
      const index = indices[rand];
      grid[index.y][index.x].mine = true;
      indices.splice(rand, 1);
    }

    setGrid((grid) => [...grid]);
  }

  function getFlatten() {
    const indices = [];
    grid.forEach((column) => {
      column.forEach((element) => {
        indices.push({ x: element.x, y: element.y });
      });
    });

    return indices;
  }

  function checkMines() {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].mine === true) {
          return true;
        }
      }
    }
    return false;
  }

  function revealMines() {
    grid.forEach((column) => {
      column.forEach((element) => {
        if (element.mine === true) {
          element.opened = true;
        }
      });
    });
  }

  function countFlags(cell) {
    let flags = 0;
    getSurrounding(cell).forEach((element) => {
      if (element.flagged) {
        flags++;
      }
    });
    return flags;
  }

  function open(cell) {
    if (!checkMines()) {
      populate(cell, 99);
    }
    let num = countMines(cell);
    let flags = countFlags(cell);
    let c = grid[cell.y][cell.x];

    if (c.flagged) {
      c.flagged = false;
    } else {
      c.opened = true;
      c.count = num;
      c.flagCount = flags;

      if (c.count === 0) {
        openAround(cell);
      }
      if (c.open || c.flagCount === c.count) {
        openAround(cell);
      }
      if (c.mine) {
        revealMines();
      }
    }

    setGrid((c) => {
      return [...c];
    });
  }

  function flag(cell) {
    if (!checkMines()) {
      return;
    }

    setGrid((grid) => {
      let c = grid[cell.y][cell.x];
      c.flagged = !c.flagged;
      return [...grid];
    });
  }

  function openAround(cell) {
    getSurrounding(cell).forEach((element) => {
      if (!element.opened && !element.flagged) {
        open(element);
      }
    });
  }

  function getSurrounding(cell) {
    let surround = [];
    for (let i = cell.x - 1; i < cell.x + 2; i++) {
      if (grid[cell.y - 1] && grid[cell.y - 1][i]) {
        surround.push(grid[cell.y - 1][i]);
      }
      if (grid[cell.y] && grid[cell.y][i]) {
        surround.push(grid[cell.y][i]);
      }
      if (grid[cell.y + 1] && grid[cell.y + 1][i]) {
        surround.push(grid[cell.y + 1][i]);
      }
    }
    return surround;
  }

  function countMines(cell) {
    let mineCount = 0;
    getSurrounding(cell).forEach((element) => {
      if (element.mine) {
        mineCount++;
      }
    });
    return mineCount;
  }

  function createGrid(height, width) {
    let temp = [];
    for (let i = 0; i < height; i++) {
      temp.push([]);
      for (let j = 0; j < width; j++) {
        temp[i].push({
          x: j,
          y: i,
          opened: false,
          flagged: false,
          mine: false,
          count: 0,
          flagCount: 0,
        });
      }
    }
    return temp;
  }

  useEffect(() => {}, []);
  return (
    <div className="mineGrid">
      <button onClick={() => setGrid(createGrid(16, 30))}>
        Start new game
      </button>

      {grid.map((line, i) => (
        <div key={i}>
          <br />
          {line.map((cell, j) => (
            <MSCell
              key={j}
              cell={cell}
              setFlag={flag}
              setOpen={open}
              setAround={openAround}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MSGrid;
