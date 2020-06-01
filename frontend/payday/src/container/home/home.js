import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/groupListItem";
import BottomSheet from "react-swipeable-bottom-sheet";
import Button from "../../components/ui-elements/buttons/button";
import Input from "../../components/ui-elements/input/input";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const postGroupState = {
  controls: {
    name: {
      elementType: "textField",
      elementConfig: {
        type: "text",
        placeholder: "Titel der Gruppe",
      },
      value: "",
    },
    participants: {
      elementType: "dropdown",
      elementConfig: {
        type: "text",
        placeholder: "Teilnehmer Array",
        values: [],
      },
      value: "",
    },
  },
  showSheet: false,
};

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = postGroupState;
  }

  componentDidMount() {
    this.props.fetchGroups(this.props.token);
    this.props.fetchUsers(this.props.token).then((res) => {
      const valuesArray = [];
      for (let key in res.data.users) {
        valuesArray.push({
          id: key,

          label: res.data.users[key].Username,
          value: res.data.users[key].Id,

        });
      }
      this.setState({
        ...this.state,
        controls: {
          ...this.state.controls,
          participants: {
            ...this.state.controls.participants,
            elementConfig: {
              ...this.state.controls.participants.elementConfig,
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

  onClickCreateGroupHandler = () => {
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
    console.log("clicked");
  };

  submitHandler = (event) => {
    event.preventDefault();
    // const category = this.props.categories.filter(function (item) {
    //   return item.Id === id;
    // });
    const participants = []
    this.state.controls.participants.value.map((participant) => {
      participants.push(participant.value)
    })
    const groupData = {
      name: this.state.controls.name.value,
      participants: [2],
    };
    this.props.postGroup(this.props.token, groupData);
    this.setState({
      ...this.state,
      showSheet: false,
    });
  };

  accessGroupExpensesHandler = (id) => {
    this.props.history.push("/group" + id);
  };

  onClickGroupHandler(id) {
    // console.log(this.props.groups[id]._id);
    // const select = this.props.groups[id];
    // console.log(select);
    // this.setState({
    //   selectedGroup: select,
    // });
    // this.props.fetchExpenses(this.props.token, this.props.groups[id]._id);
    // console.log(this.props.groups[id]);
    // console.log(this.state);
  }

  render() {
    var groups = <p>Loading</p>;
    if (!this.props.groups.loading) {
      groups = this.props.groups.map((group) => {
        return (
          <ListItem
            path={"/group/" + group.Id}
            title={group.Name}
            clicked={() => this.accessGroupExpensesHandler(group.Id)}
            key={group.Id}
            costs="50"
          />
        );
      });
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
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <div>
        <Navbar title="Meine Gruppen" history={this.props.history} />
        <BottomSheet
          open={this.state.showSheet}
          overlay={true}
          onChange={this.onClickCloseHandler.bind(this)}
        >
          <div className="home-bottom-sheet">
            <h1>Add new group</h1>
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
        {groups}
        <div className="home-add-button">
          <Button
            btnStyle="blue"
            clicked={this.onClickCreateGroupHandler.bind(this)}
          >
            Add new group
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tokenloading: state.auth.loading,
    token: state.auth.token,
    groups: state.groups.groups,
    loading: state.groups.loading,
    selectedGroup: state.expenses.selectedGroup,
    expenses: state.expenses.expenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroups: (token) => dispatch(actions.fetchGroups(token)),
    postGroup: (token, data) => dispatch(actions.postGroup(token, data)),
    fetchUsers: (token) => dispatch(actions.fetchUsers(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
