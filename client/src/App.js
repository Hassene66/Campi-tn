import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./Screens/Login_Pages";
import "./App.css";
import "./animate.css";
import HomePage from "./Screens/HomePages";
import Register from "./Screens/Register_Pages";
const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/Register" component={Register} />
    </Switch>
  );
};
export default App;
