import React, { useEffect } from "react";
import { Router, Route, Switch, Link} from "react-router-dom";
import { createBrowserHistory } from "history";
// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";

var hist = createBrowserHistory();


const App = () => {


  return (
      <Router history={hist}>
        <Switch>
          <Route path='/' component={LandingPage} />
        </Switch>
      </Router>
  );
};

export default App;
