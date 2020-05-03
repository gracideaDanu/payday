import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/groupListItem";
import BottomSheet from "../../components/bottom-sheet/bottomSheet";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: "",
      showBottomSheet: false,
    };
  }

  componentDidMount() {
    this.props.fetchGroups(this.props.token);
  }

  onClickGroupHandler(id) {
    console.log(this.props.groups[id]._id);
    const select = this.props.groups[id];
    console.log(select);
    this.setState({
      selectedGroup: select,
    });
    this.props.fetchExpenses(this.props.token, this.props.groups[id]._id);

    console.log(this.props.groups[id]);
    console.log(this.state);
  }

  showBottomSheet() {
    this.setState({
      ...this.state,
      showBottomSheet: true,
    });
  }

  render() {
    var groups = <p>Loading</p>;
    if (!this.props.groups.loading) {
      groups = this.props.groups.map((group) => (
        <p
          key={group._id}
          onClick={this.onClickGroupHandler.bind(this, group.id)}
        >
          {group.name}
        </p>
      ));
    }

    var bottomSheet = null;
    if (this.state.showBottomSheet) {
      bottomSheet = <BottomSheet></BottomSheet>;
    }

    return (
      <div>
        {/* {groups} */}
        <ListItem
          onClick={this.showBottomSheet.bind(this)}
          costs="+34,12"
          title="Saufgruppe"
        />
        <ListItem costs="-3,12" title="Biergruppe" />
        <ListItem costs="+334,12" title="1. Maigruppe" />
        <ListItem costs="+34,12" title="Saufgruppe" />
        <ListItem costs="-3,12" title="Biergruppe" />
        <ListItem costs="+334,12" title="1. Maigruppe" />
        <ListItem costs="+34,12" title="Saufgruppe" />
        <ListItem costs="-3,12" title="Biergruppe" />
        <ListItem costs="+334,12" title="1. Maigruppe" />
        <ListItem costs="+34,12" title="Saufgruppe" />
        <ListItem costs="-3,12" title="Biergruppe" />
        <ListItem costs="+334,12" title="1. Maigruppe" />
        {bottomSheet}
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
