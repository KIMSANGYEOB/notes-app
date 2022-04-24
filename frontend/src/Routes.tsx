import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound"; // --> 상단에 추가

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        {/* 가장 마지막에 선언해주자 */}
        <Route>
            <NotFound />
        </Route>
        </Switch>
  );
}