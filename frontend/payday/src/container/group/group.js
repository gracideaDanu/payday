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

    // this.state = {
    //   showSheet: false,
    //   title: '',
    //   costs: '',
    //   categoryId: ''
    // }
  }

  componentWillMount() {
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

  // onChangeHandler = (vals, open) => {
  //   this.setState({
  //     [vals.target.name]: vals.target.value
  //   });
  //   console.log(this.state);

  // }

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
  // onClickButtonHandler = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     showSheet: false
  //   })
  //   console.log("clicked")
  // }

  render() {
    // const [Modal, open, close, isOpen] = useModal('root', {
    //   preventScroll: true
    // });

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
        {/* <p>Modal is Open? {isOpen ? 'Yes' : 'No'}</p>
        <button onClick={open}>OPEN</button>
        <Modal>
          <div>
            <h1>Title</h1>
            <p>This is a customizable modal.</p>
            <button onClick={close}>CLOSE</button>
          </div>
        </Modal> */}


        {/* onChange={this.onChangeHandler.bind(this) */}
        <BottomSheet open={this.state.showSheet} overlay={true} onChange={this.onClickCloseHandler.bind(this)}>
          <div>
            <h1>Add new expense</h1>
            <div>
              <form onSubmit={this.submitHandler}>
                <div>
                  {form}
                  {/*  <input
                    type="text"
                    name="groupname"
                    placeholder="groupname"
                    value={this.state.groupname}
                    onChange={this.onChangeHandler.bind(this)}></input>
                </div>
                <div>
                  <input
                    type="text"
                    name="participants"
                    placeholder="participants"
                    value={this.state.participants}
                    onChange={this.onChangeHandler.bind(this)}>
                  </input> */}

                </div>
                <Button clicked={this.submitHandler} btnStyle="mint">Add new group</Button>
              </form>
            </div>
          </div>
        </BottomSheet>


        {/* {groups}  */}
        <ListItem
          costs="+34,12"
          title="Saufgruppe"
          participants="1"
          owner="Niklas"
        />
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

        <Button btnStyle="blue" clicked={this.onClickCreateGroupHandler.bind(this)}>Add new group</Button>

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
    onPostExpense: (token, data) => dispatch(actions.postExpense(token, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
