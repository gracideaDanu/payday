import React from "react";
import "./groupListItem.css";
import {Link} from "react-router-dom";

const GroupListItem = (props) => {
  return (
          <div className="group-list-item" onClick={props.clicked}>
          <p className="group-list-item-title">{props.title}</p>
          <div className="group-list-item-costs">
              <p className="group-list-item-costs-title">Deine Bilanz:</p>
              <p className={parseFloat(props.costs) > 0 ? "green" : "red"}>
                  {props.costs}€
              </p>
          </div>
      </div>

  );
};

export default GroupListItem;
