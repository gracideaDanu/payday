import React, { Component } from 'react';
import PasswordIcon from "../../../../assets/icons/icon_password.svg";
import MailIcon from "../../../../assets/icons/icon_mail.svg";
import TextIcon from "../../../../assets/icons/icon_name.svg";
import './tagList.css'

class TagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headerTitle: this.props.elementConfig.placeholder
        }
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

        const listOpen = this.state.listOpen
        const values = this.props.elementConfig.values.location

        const valuesArray = [];
        for (let key in values) {
            valuesArray.push({
                id: key,
                config: values[key],
            });
        }
        console.log(valuesArray)
        console.log(values)
        const list = valuesArray.map((item) => (
            <li className="ui-dropdown-list-item" key={item.id}>{item.config.title}</li>
        ));

        console.log(list)
        return (
            <div className="ui-input-container">
                <div className="ui-input-img-wrapper">
                    <img src={icon} alt="icon" />
                    <p className="ui-input">{this.state.headerTitle} </p>
                </div>
                <ul className="ui-tag-list-list">
                    {list}
                </ul>
                <div className="ui-input-line"></div>
            </div>
        )
    }

}

export default TagList