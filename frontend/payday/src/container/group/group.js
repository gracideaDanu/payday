import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/expenseListItem";
import BottomSheet from 'react-swipeable-bottom-sheet';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSheet: false
    }
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
    console.log(this.state)
  }

  onChangeHandler = (open) => {
    this.setState({
      showSheet: open
    })

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

    return (
      <div>
        <BottomSheet open={this.state.showSheet} overlay={true} onChange={this.onChangeHandler.bind(this)}>
          <div>
            <h1>Bottom sheet modal content</h1>
            <ul>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
            </ul>
            <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /><ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            /> <ListItem
              costs="+34,12"
              title="Saufgruppe"
              participants="1"
              owner="Niklas"
            />
          </div>
        </BottomSheet>
        {expenses}

        <button onClick={this.onClickCreateGroupHandler.bind(this)}>Bottom Sheet anzeigen</button>

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
    fetchExpenses: (token, groupID) => dispatch(actions.fetchExpenses(token, groupID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
