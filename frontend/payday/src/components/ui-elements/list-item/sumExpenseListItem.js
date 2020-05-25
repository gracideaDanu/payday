import React from "react";
import "./sumExpenseListItem.css";

const sumExpeneseListItem = (props) => {
    return (
        <div className="Sumexpense-list-item">
            <div>
                <p className="expense-list-item-title">{props.title}</p>
            </div>
            <div className="expense-list-item-costs">
                <p>{props.costs}€</p>
            </div>
        </div>
    );
};

export default sumExpeneseListItem;
