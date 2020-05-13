import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/expenseListItem";
import BottomSheet from 'react-swipeable-bottom-sheet';
import Button from '../../components/ui-elements/buttons/button';
import Input from '../../components/ui-elements/input/input'


const postExpenseState = {
  controls: {
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Titel der Ausgabe"
      },
      value: ""
    },
    costs: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Kosten"
      },
      value: ""
    },
    categoryId: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Kategorie-ID"
      },
      value: ""
    }
  }
};


class Group extends Component {
  constructor(props) {
    super(props);
    this.state = postExpenseState;
  }


  componentDidMount() {
    this.props.fetchExpenses(this.props.token, 1);
    this.setState({
      showSheet: false,
    });
  }

  onClickCreateGroupHandler = () => {
    this.setState({
      showSheet: true
    })
  }


  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
        // valid: this.checkValidity(
        //   event.target.value,
        //   this.state.controls[controlName].validation
        // ),
        // touched: true,
      },
    };
    this.setState({ controls: updatedControls });
    console.log(this.state);
  };

  onClickCloseHandler = () => {
    this.setState({
      showSheet: false
    })
    console.log("clicked")
  }

  submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: this.state.controls.title.value,
      costs: this.state.controls.costs.value,
      categoryId: this.state.controls.categoryId.value,
      groupId: 1
    }
    this.props.onPostExpense(this.props.token, expenseData);
  }


  render() {

    var expensesArray = []
    var expenses = null
    if (typeof this.props.expenses !== undefined && this.props.expenses.length > 0) {
      for (let key in this.props.expenses) {
        expensesArray.push({
          id: key,
          values: this.props.expenses[key],
        });
      }

      expenses = expensesArray.map((expense) => (
        <ListItem
          costs={expense.values.Costs}
          title={expense.values.Title}
          participants={expense.values.Participants}
          owner={expense.values.Owner}
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
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        // invalid={!formElement.config.valid}
        // shouldValidate={formElement.config.validation}
        // touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <div>
        <BottomSheet open={this.state.showSheet} overlay={true} onChange={this.onClickCloseHandler.bind(this)}>
          <div>
            <h1>Add new expense</h1>
            <div>
              <form onSubmit={this.submitHandler}>
                <div>
                  {form}
                </div>
                <Button clicked={this.submitHandler} btnStyle="mint">Add new group</Button>
              </form>
            </div>
          </div>
        </BottomSheet>
        {expenses}
        <Button btnStyle="blue" clicked={this.onClickCreateGroupHandler.bind(this)}>Add new group</Button>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    expenses: state.expenses.expenses,
    selectedGroup: state.expenses.selectedGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostExpense: (token, data) => dispatch(actions.postExpense(token, data)),
    fetchExpenses: (token, groupID) => dispatch(actions.fetchExpenses(token, groupID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
