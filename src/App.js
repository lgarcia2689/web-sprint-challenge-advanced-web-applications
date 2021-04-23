import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute'

import Login from "./components/Login";
import "./styles.scss";

function App() {

  const logout = () => {
    // request to /api/logout
    window.localStorage.removeItem("token");
  };
  
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <Link onClick={logout} to="/">
          <a data-testid="logoutButton" href="#">logout</a>
          </Link>
        </header> 

        <Route exact path="/" component={Login} />
        <Switch>
          {/* history (navigating), match (access params), location (url info) */}
          <PrivateRoute exact path="/protected" component={BubblePage} />
          <Route path="/login" component={Login} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.