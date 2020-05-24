import React from "react";
import TextField from './text-field/textField'
import Dropdown from './dropdown/dropdown'
import './input.css'

const input = (props) => {

  var inputComponent = null
  console.log(props)
  if (props.elementType === 'dropdown') {
    inputComponent = <Dropdown
      elementConfig={props.elementConfig}
      value={props.value}
      changed={props.changed} />
  } else {
    inputComponent = <TextField
      elementConfig={props.elementConfig}
      value={props.value}
      changed={props.changed} />
  }

  return (
    <div className="ui-input-container">
      {inputComponent}
    </div>
  );
};

export default input;
