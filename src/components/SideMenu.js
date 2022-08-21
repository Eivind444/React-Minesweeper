import React from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <div className="mySide" id="SM">
      <ul>
        <h3>Menu</h3>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/minesweeper">Minesweeper</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;
