import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ListItem from "../../components/ui-elements/list-item/expenseListItem";

class Group extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* {groups} */}
        <ListItem
          costs="+34,12"
          title="Saufgruppe"
          participants="1"
          owner="Niklas"
        />
        <ListItem
          costs="-3,12"
          title="Biergruppe"
          participants="2"
          owner="Niklas"
        />
        <ListItem
          costs="+334,12"
          title="1. Maigruppe"
          participants="3"
          owner="Pascal"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
