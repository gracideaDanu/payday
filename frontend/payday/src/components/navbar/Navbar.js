import React, { Component } from 'react';
import Button from '../ui-elements/buttons/button'
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import './navbar.css'


class Navbar extends Component {


    onClickLogoutHandler = () => {
        this.props.onLogout()

    }

    accessHomeHandler = () => {
        console.log(this.props)
        history.push("/home");
    }
    render() {
        return (
            <nav className="navbar">
                <Button clicked={this.accessHomeHandler.bind(this)} btnStyle="mint">Home</Button>
                <Button className="navbar-logout-button" btnStyle="blue" clicked={this.onClickLogoutHandler.bind(this)}>Logout</Button>

            </nav>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    };
};

export default connect(null, mapDispatchToProps)(Navbar);
