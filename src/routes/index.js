// Core
import React from "react";
import { Route, Router,Switch } from "react-router-dom";
import Dashboard from "../containers/Dashboard/index";
import Profile from "../containers/Profile/index";
import Page404 from "../components/page404";
import Review from "../containers/Review/review";
import { Container } from "react-bootstrap";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const Routes = () => {
  return (
    <React.Fragment>
      <Router history={history}>

      <Switch>
        <Route exact component={Dashboard} path="/" />
        <Route component={Profile} path="/profile" />
        <Route component={Review} path="/review" />
        <Route component={Page404} />
      </Switch>
    </Router>
    </React.Fragment>
  );
};

export default Routes;
