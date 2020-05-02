import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import Auth from "./container/authentication/auth";
import { Route, Switch } from "react-router-dom";
import Home from "./container/home/home";
import Group from "./container/group/group";

class App extends Component {
  state = {
    token: "",
  };

  render() {
    var privateRoutes = null;
    if (this.state.token !== "") {
      privateRoutes = <Route path="/home" component={Home} />;
    }
    return (
      <div className="App">
        <Switch>
          <Route path="/auth" component={Auth} />
          {privateRoutes}
          <Route path="/home" component={Home} />
          <Route path="/group" component={Group} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tkn: state.auth.token,
  };
};

export default connect(mapStateToProps)(App);
