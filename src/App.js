import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SideMenu from "./components/SideMenu";
import MSGrid from "./components/MSGrid";

function App() {
  return (
    <div className="App">
      <Router>
        <SideMenu />
        <div id="Content">
          <Switch>
            <Route exact path="/"></Route>
            <Route path="/minesweeper" render={() => <MSGrid></MSGrid>}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
