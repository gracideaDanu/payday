import React, { Component } from 'react';

import './button.css';

const button = (props) => {
    return (
        <button className={"ui-button " + props.btnStyle} type="button" onClick={props.clicked}>{props.children}</button>
    )
}

export default button;