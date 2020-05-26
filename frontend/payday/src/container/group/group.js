import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/expenseListItem";
import SumListItem from "../../components/ui-elements/list-item/sumExpenseListItem";
import BottomSheet from "react-swipeable-bottom-sheet";
import Button from "../../components/ui-elements/buttons/button";
import Input from "../../components/ui-elements/input/input";


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
    this.props.fetchCategories(this.props.token)
      .then(res => {
        const valuesArray = [];
        for (let key in res.data.categories) {
          valuesArray.push({
            id: key,
            config: {
              title: res.data.categories[key].Name,
              id: res.data.categories[key].Id
            }
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
                values: valuesArray
              }
            }
          }
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

  onClickDeleteExpenseHandler = (event) => {
    const expenseId = 4;
    this.props.onDeleteExpense(
      this.props.token,
      expenseId,
      this.props.match.params.id
    );
  };

  accessSingleExpenseHanlder = (id) => {
    this.props.history.push(this.props.location.pathname + "/expense" + id);
  };

  getCategoryNameById = (id) => {
    const category = this.props.categories.filter(function (item) {
      return item.Id === id
    })
    return category[0] ? category[0].Name : ""
  }

  render() {
    const expensesArray = [];
    let sumExpenses = null;
    let sumExpensesItem = null;
    var expenses = null;

    var expenses = <p>Loading</p>;
    if (!this.props.expenses.loading) {
      expenses = this.props.expenses.map((expense) => (
        <ListItem
          expenseId={expense.Id}
          costs={expense.Costs}
          title={expense.Title}
          participants={expense.Participants}
          owner={expense.Owner}
          category={this.getCategoryNameById(expense.CategoryId)}
          click={() => this.accessSingleExpenseHanlder(expense.Id)}
          key={expense.Id}
        />
      ));
    }

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
        <BottomSheet
          open={this.state.showSheet}
          overlay={true}
          onChange={this.onClickCloseHandler.bind(this)}
        >
          <div>
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
        <Button
          btnStyle="blue"
          clicked={this.onClickCreateExpenseHandler.bind(this)}
        >
          Add new expense
        </Button>
        {/* <Input ></Input> */}
        <Button
          clicked={this.onClickDeleteExpenseHandler.bind(this)}
          btnStyle="delete"
        >
          Delete expense
        </Button>
        <Button
          clicked={this.onClickDeleteGroupHandler.bind(this)}
          btnStyle="delete"
        >
          Delete group
        </Button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostExpense: (token, data) => dispatch(actions.postExpense(token, data)),
    fetchExpenses: (token, groupId) => dispatch(actions.fetchExpenses(token, groupId)),
    onDeleteExpense: (token, expenseId, groupId) => dispatch(actions.deleteExpense(token, expenseId, groupId)),
    // onDeleteGroup: (token, groupID) => dispatch(actions.deleteGroup(token, groupId))
    fetchCategories: (token) => dispatch(actions.fetchCategories(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);



// const dropdown = {
//   location: [
//     {
//       id: 0,
//       title: "New York",
//       selected: false,
//       key: "location",
//     },
//     {
//       id: 1,
//       title: "Dublin",
//       selected: false,
//       key: "location",
//     },
//     {
//       id: 2,
//       title: "California",
//       selected: false,
//       key: "location",
//     },
//     {
//       id: 3,
//       title: "Istanbul",
//       selected: false,
//       key: "location",
//     },
//     {
//       id: 4,
//       title: "Izmir",
//       selected: false,
//       key: "location",
//     },
//     {
//       id: 5,
//       title: "Oslo",
//       selected: false,
//       key: "location",
//     },
//   ],
// };