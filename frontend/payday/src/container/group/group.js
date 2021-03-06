import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/expenseListItem";
import SumListItem from "../../components/ui-elements/list-item/sumExpenseListItem";
import BottomSheet from "react-swipeable-bottom-sheet";
import Button from "../../components/ui-elements/buttons/button";
import Input from "../../components/ui-elements/input/input";
import Navbar from "../../components/navbar/Navbar";

import "./group.css";

const postExpenseState = {
  controls: {
    title: {
      elementType: "text-field",
      elementConfig: {
        type: "text",
        placeholder: "Titel der Ausgabe",
      },
      value: "",
    },
    costs: {
      elementType: "text-field",
      elementConfig: {
        type: "text",
        placeholder: "Kosten",
      },
      value: "",
    },
    category: {
      elementType: "tagList",
      elementConfig: {
        type: "text",
        placeholder: "Kategorie",
        values: [],
      },
      value: "",
    },
  },
  showSheet: false,
};

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = postExpenseState;
  }

  componentDidMount() {
    const fetchId = this.props.match.params.id;
    this.props.fetchExpenses(this.props.token, fetchId);
    this.props.fetchCategories(this.props.token).then((res) => {
      const valuesArray = [];
      for (let key in res.data.categories) {
        valuesArray.push({
          id: key,
          label: res.data.categories[key].Name,
          value: res.data.categories[key].Id,
        });
      }
      this.setState({
        ...this.state,
        controls: {
          ...this.state.controls,
          category: {
            ...this.state.controls.category,
            elementConfig: {
              ...this.state.controls.category.elementConfig,
              values: valuesArray,
            },
          },
        },
      });
    });
    this.setState({
      ...this.state,
      showSheet: false,
    });
  }

  onClickCreateExpenseHandler = () => {
    this.setState({
      ...this.state,
      showSheet: true,
    });
  };

  inputChangedHandler = (value, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: value,
        // valid: this.checkValidity(
        //   event.target.value,
        //   this.state.controls[controlName].validation
        // ),
        // touched: true,
      },
    };
    this.setState({ ...this.state, controls: updatedControls });
  };

  onClickCloseHandler = () => {
    this.setState({
      ...this.state,
      showSheet: false,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: this.state.controls.title.value,
      costs: this.state.controls.costs.value,
      categoryId: this.state.controls.category.value,
      groupId: this.props.match.params.id,
    };
    this.props.onPostExpense(this.props.token, expenseData);
    this.setState({
      ...this.state,
      showSheet: false,
    });
  };

  onClickDeleteGroupHandler = (event) => {
    // this.props.onDeleteGroup(this.props.token, groupId);
  };

  accessSingleExpenseHandler = (id) => {
    this.props.history.push(this.props.location.pathname + "/expense" + id);
    console.log(id);
  };

  getCategoryNameById = (id) => {
    const category = this.props.categories.filter(function (item) {
      return item.Id === id;
    });
    return category[0] ? category[0].Name : "";
  };

  getGroupNameById = (id) => {
    const group = this.props.groups.filter(function (item) {
      console.log(item.Id);
      console.log(id);
      console.log(item.Id === Number(id));
      return item.Id === Number(id);
    });
    console.log(group);
    return group[0] ? group[0].Name : "";
  };

  render() {
    const expensesArray = [];
    let sumExpenses = null;
    let sumExpensesItem = null;
    var expenses = null;

    var expenses = <p>Loading</p>;
    if (!this.props.expenses.loading) {
      expenses = this.props.expenses.map((expense) => {
        sumExpenses += expense.Costs;
        return (
          <ListItem
            expenseId={expense.Id}
            costs={expense.Costs}
            title={expense.Title}
            participants={expense.Participants}
            owner={expense.Owner}
            category={this.getCategoryNameById(expense.CategoryId)}
            click={() => this.accessSingleExpenseHandler(expense.Id)}
            key={expense.Id}
          />
        );
      });
    }

    sumExpensesItem = (
      <SumListItem title="Sum of all expenses" costs={sumExpenses} />
    );

    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        // invalid={!formElement.config.valid}
        // shouldValidate={formElement.config.validation}
        // touched={formElement.config.touched}
        changed={(value) => this.inputChangedHandler(value, formElement.id)}
      />
    ));

    return (
      <div>
        <Navbar
          title={this.getGroupNameById(this.props.match.params.id)}
          history={this.props.history}
        />
        <BottomSheet
          open={this.state.showSheet}
          overlay={true}
          onChange={this.onClickCloseHandler.bind(this)}
        >
          <div className="group-bottom-sheet">
            <h1>Add new expense</h1>
            <div>
              <form onSubmit={this.submitHandler}>
                <div>{form}</div>
                <Button clicked={this.submitHandler} btnStyle="mint">
                  Add new group
                </Button>
              </form>
            </div>
          </div>
        </BottomSheet>
        {sumExpensesItem}
        {expenses}
        <div className="group-buttons-container">
          <Button
            btnStyle="blue"
            clicked={this.onClickCreateExpenseHandler.bind(this)}
          >
            Add new expense
          </Button>
          {/* <Input ></Input> */}

          <Button
            clicked={this.onClickDeleteGroupHandler.bind(this)}
            btnStyle="delete"
          >
            Delete group
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    expenses: state.expenses.expenses,
    categories: state.categories.categories,
    selectedGroup: state.expenses.selectedGroup,
    groups: state.groups.groups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostExpense: (token, data) => dispatch(actions.postExpense(token, data)),
    fetchExpenses: (token, groupId) =>
      dispatch(actions.fetchExpenses(token, groupId)),
    fetchCategories: (token) => dispatch(actions.fetchCategories(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
