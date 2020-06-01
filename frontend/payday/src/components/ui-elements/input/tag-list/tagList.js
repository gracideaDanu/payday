import React, { Component, useState } from "react";
import PasswordIcon from "../../../../assets/icons/icon_password.svg";
import MailIcon from "../../../../assets/icons/icon_mail.svg";
import TextIcon from "../../../../assets/icons/icon_name.svg";
import "./tagList.css";

const TagList = (props) => {

  var icon = null;
  switch (props.elementConfig.type) {
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


  const list = props.elementConfig.values.map((item) => (
    <li
      className={props.value === item.value ? "ui-tag-list-item-selected" : ""}
      key={item.id}
      onClick={() => props.changed(item.value)}
    >
      {item.label}
    </li >
  ));

  return (
    <div className="ui-input-container">
      <div className="ui-input-img-wrapper">
        <img src={icon} alt="icon" />
        <p className="ui-input">{props.elementConfig.placeholder} </p>
      </div>
      <ul className="ui-tag-list-list">{list}</ul>
      <div className="ui-input-line"></div>
    </div>
  );

}

export default TagList;
