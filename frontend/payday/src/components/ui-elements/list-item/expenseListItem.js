import React from "react";
import "./expenseListItem.css";

const expenseListItem = (props) => {
  return (

    <div className="expense-list-item" onClick={props.click}>
      <div>
        <p className="expense-list-item-title">{props.title}</p>
        <p className="expense-list-item-owner">Kategorie {props.category}</p>
      </div>
      <div className="expense-list-item-costs">
        <p>{props.costs}€</p>
        <p className="expense-list-item-costs-participants">
          Beteiligte: {props.participants}
        </p>
      </div>
    </div>
  );
};

export default expenseListItem;
