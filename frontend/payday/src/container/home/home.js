import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/groupListItem";
// import BottomSheet from "../../components/bottom-sheet/bottomSheet";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: "",
      showBottomSheet: false
    };
  }

  componentDidMount() {
    this.props.fetchGroups(this.props.token);
  }

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
       groups = this.props.groups.map((group) =>(
               <ListItem title={group.Name} key={group.Id} costs="50"/>
           )
          );
     }

    return (
      <div>
         {groups}
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
    expenses: state.expenses.expenses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroups: (token) => dispatch(actions.fetchGroups(token)),
    fetchExpenses: (token, groupID) =>
      dispatch(actions.fetchExpenses(token, groupID)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Groups);
