import React, { Component } from 'react';
import Button from '../ui-elements/buttons/button'
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";


class Navbar extends Component {

    onClickLogoutHandler = () => {
        this.props.onLogout()
    }
    render() {
        return (
            <Button btnStyle="blue" clicked={this.onClickLogoutHandler.bind(this)}>Logout</Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    };
};

export default connect(null, mapDispatchToProps)(Navbar);