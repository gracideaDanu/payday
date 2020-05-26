import React, { Component } from "react";
import PasswordIcon from "../../../../assets/icons/icon_password.svg";
import MailIcon from "../../../../assets/icons/icon_mail.svg";
import TextIcon from "../../../../assets/icons/icon_name.svg";

import "./textField.css";

class TextField extends Component {
    // var cssClasses = [props.classes];

    // if (props.invalid && props.shouldValidate && props.touched) {
    //     cssClasses.push("invalid");
    // } else {
    //     cssClasses = [props.classes]
    // }
    constructor(props) {
        super(props)
    }

    inputChangedHandler = (event) => {
        this.props.changed(event.target.value);
    }

    render() {
        var icon = null;
        switch (this.props.elementConfig.type) {
            case "password":
                icon = PasswordIcon;
                break;
            case "email":
                icon = MailIcon;
                break;
            case "text":
                icon = TextIcon;
                break;
            default:
                icon = TextIcon;
        }

        return (
            <div className="ui-input-container">
                <div className="ui-input-img-wrapper">
                    <img src={icon} alt="icon" />
                    <input
                        className="ui-input"
                        {...this.props.elementConfig}
                        value={this.props.value}
                        onChange={this.inputChangedHandler}
                    />
                </div>
                <div className="ui-input-line"></div>
            </div>
        );
    }
};

export default TextField;
