import React from 'react';
import PasswordIcon from '../../../assets/icons/icon_password.svg';
import './input.css'

const input = (props) => {
    // var cssClasses = [props.classes];

    // if (props.invalid && props.shouldValidate && props.touched) {
    //     cssClasses.push("invalid");
    // } else {
    //     cssClasses = [props.classes]
    // }
    var icon = PasswordIcon;
    switch props.elementType {
        case "Password": icon = PasswordIcon
    }

    return (
        <div className="ui-input-container">
            <div className="ui-input-img-wrapper">
                <img src={icon} />
                <input
                    className="ui-input"
                    {...props.elementConfig}
                    value={props.value}
                    // placeholder={props.title}
                    onChange={props.changed} />
            </div>
            <div class="ui-input-line"></div>
        </div>
    )
}

export default input;