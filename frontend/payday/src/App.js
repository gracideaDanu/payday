import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import Auth from "./container/authentication/auth";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./container/home/home";
import Group from "./container/group/group";
import Navbar from './components/navbar/Navbar'

class App extends Component {
  state = {
    token: "",
  };

  componentDidMount() {
      console.log(this.props.groups);
      if (this.props.location.pathname === "/"){
          if (this.props.tkn !== null) {

              this.props.history.push("/home");
          }
          else {
              this.props.history.push("/auth")
          }
      }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
     if (prevProps.tkn !== this.props.tkn){
         this.props.history.replace("/auth");
     }
  }

    render() {
     var privateRoutes = [];
     if (this.props.tkn !== null) {
      privateRoutes.push(<Route path="/home" component={Home} />);
      privateRoutes.push(<Route path="/group/:id" component={Group} />);

     }
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/auth" component={Auth} />
           {privateRoutes}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     tkn: state.auth.token,
      groups: state.groups.groups
  };
};

export default withRouter(connect(mapStateToProps)(App));
