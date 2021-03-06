import React, { Component, useState } from 'react';
import PasswordIcon from "../../../../assets/icons/icon_password.svg";
import MailIcon from "../../../../assets/icons/icon_mail.svg";
import TextIcon from "../../../../assets/icons/icon_name.svg";
import './dropdown.css'
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },



]
const Dropdown = (props) => {
    const [selected, setSelected] = React.useState([
    ]);

    const onChange = selectedOptions => {
        setSelected(selectedOptions)
        props.changed(selectedOptions)
    };

    return (
        <div>
            <Select
                isMulti
                menuIsOpen={true}
                name={props.placeholder}
                options={props.elementConfig.values}
                value={props.value}
                onChange={(selectedOptions) => props.changed(selectedOptions)}
                className="dropdown-multi-select"
                classNamePrefix="dropdown-multi-select" />
        </div >
    )
}

export default Dropdown



// class Dropdown extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             listOpen: false,
//             headerTitle: this.props.elementConfig.placeholder
//         }
//     }

//     toggleList() {
//         this.setState(prevState => ({
//             listOpen: !prevState.listOpen
//         }))
//     }

//     render() {
//         var icon = null;
//         switch (this.props.elementConfig.type) {
//             case "password":
//                 icon = PasswordIcon;
//                 break;
//             case "email":
//                 icon = MailIcon;
//                 break;
//             case "text":
//                 icon = TextIcon;
//                 break;
//             default:
//                 icon = TextIcon;
//         }

//         const listOpen = this.state.listOpen
//         const values = this.props.elementConfig.values.location

//         const valuesArray = [];
//         for (let key in values) {
//             valuesArray.push({
//                 id: key,
//                 config: values[key],
//             });
//         }
//         console.log(valuesArray)
//         console.log(values)
//         const list = valuesArray.map((item) => (
//             <li className="ui-dropdown-list-item" key={item.id}>Test{item.config.title}</li>
//         ));

//         console.log(list)
//         return (
//             <div className="ui-input-container" onClick={() => this.toggleList()}>
//                 <div className="ui-input-img-wrapper">
//                     <img src={icon} alt="icon" />
//                     <p className="ui-input">{this.state.headerTitle} </p>
//                 </div>
//                 {listOpen && <ul className="ui-dropdown-list">
//                     {list}
//                 </ul>}
//                 <div className="ui-input-line"></div>
//             </div>
//         )
//     }

// }