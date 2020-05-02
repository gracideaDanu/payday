import React from "react";
import "./groupListItem.css";

const GroupListItem = (props) => {
  return (
    <div className="group-list-item">
      <p className="group-list-item-title">{props.title}</p>
      <div className="group-list-item-costs">
        <p className="group-list-item-costs-title">Deine Bilanz:</p>
        <p>{props.costs}€</p>
      </div>
    </div>
  );
};

export default GroupListItem;
