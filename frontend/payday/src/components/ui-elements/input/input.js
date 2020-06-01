import React from "react";
import TextField from "./text-field/textField";
import Dropdown from "./dropdown/dropdown";
import TagList from "./tag-list/tagList";

import "./input.css";

const input = (props) => {
  var inputComponent = null;

  switch (props.elementType) {
    case ('tagList'):
      inputComponent = (
        <TagList
          elementConfig={props.elementConfig}
          value={props.value}
          changed={props.changed}
        />);
      break;
    case ('dropdown'):
      inputComponent = (
        <Dropdown
          elementConfig={props.elementConfig}
          value={props.value}
          changed={props.changed}
        />);
      break;
    default:
      inputComponent = (
        <TextField
          elementConfig={props.elementConfig}
          value={props.value}
          changed={props.changed}
        />
      );
  }

  return <div className="ui-input-container">{inputComponent}</div>;
};

export default input;
