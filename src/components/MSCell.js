import React from "react";

function MSCell({ cell, setFlag, setOpen }) {
  function click(e) {
    if (e.button === 2) {
      if (!cell.opened) {
        setFlag(cell);
      }
    } else {
      setOpen(cell);
    }
  }
  React.useEffect(() => {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  }, []);
  return (
    <div
      className={cell.opened ? "cell opened" + cell.count : "cell"}
      onMouseDown={(e) => click(e)}
    >
      {cell.flagged && !cell.opened
        ? "🚩"
        : cell.opened
        ? cell.mine
          ? "😂"
          : cell.count > 0
          ? cell.count
          : ""
        : ""}
    </div>
  );
}

export default MSCell;
