import React from 'react';
import PasswordIcon from '../../../assets/icons/icon_password.svg';
import MailIcon from '../../../assets/icons/icon_mail.svg';
import TextIcon from '../../../assets/icons/icon_name.svg';

import './input.css'

const input = (props) => {
    // var cssClasses = [props.classes];

    // if (props.invalid && props.shouldValidate && props.touched) {
    //     cssClasses.push("invalid");
    // } else {
    //     cssClasses = [props.classes]
    // }
    var icon = null;
    switch (props.elementType) {
        case 'password': icon = PasswordIcon;
        case 'email': icon = MailIcon;
        case 'text': icon = TextIcon;
        default: icon = TextIcon;
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