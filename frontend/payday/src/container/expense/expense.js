import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import axios from "../../store/axios";
import ListItem from "../../components/ui-elements/list-item/expenseListItem";
import Button from "../../components/ui-elements/buttons/button";
import * as actions from "../../store/actions/index";
import Navbar from "../../components/navbar/Navbar";

const singleExpense = {
  Id: null,
  Title: null,
  Costs: null,
  CategoryId: null,
  GroupId: null,
  Owner: null,
  CreatedAt: null,
};

class Expense extends Component {
  state = singleExpense;

  componentDidMount() {
    //Not an optimal solution, need to either let a dispatch method handle this or somehow else
    const config = {
      headers: {
        authentication: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("/api/expense/" + this.props.match.params.id, config)
      .then((res) => {
        const expense = {
          Id: res.data[0].Id,
          Title: res.data[0].Title,
          Costs: res.data[0].Costs,
          CategoryId: res.data[0].CategoryId,
          GroupId: res.data[0].GroupId,
          Owner: res.data[0].Owner,
          CreatedAt: res.data[0].CreatedAt,
        };
        this.setState(expense);
      });
  }

  onClickDeleteExpenseHandler = (event) => {
    var path = this.props.location.pathname;
    console.log(path);
    path = path.match(/[a-z]+|[^a-z]+/gi);
    var groupId = path[2].slice(0, -1);
    var expenseId = path[4];
    this.props.onDeleteExpense(
      this.props.token,
      expenseId,
      this.props.match.params.id
    );
    console.log("deleted expense with id " + expenseId);
    this.props.history.push("/group" + groupId);
  };

  render() {
    let singleExpense = null;
    if (this.state.Id !== null) {
      singleExpense = (
        <ListItem title={this.state.Title} costs={this.state.Costs} />
      );
    }

    return (
      <div>
        <Navbar
          title={this.state ? this.state.Title : ""}
          history={this.props.history}
        />
        <div>{singleExpense}</div>
        <Button
          clicked={this.onClickDeleteExpenseHandler.bind(this)}
          btnStyle="delete"
        >
          Delete expense
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteExpense: (token, expenseId, groupId) =>
      dispatch(actions.deleteExpense(token, expenseId, groupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
