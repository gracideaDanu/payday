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

  onChangeHandler = (open) => {
    this.setState({
      showSheet: open
    })

  }

  render() {
    // const [Modal, open, close, isOpen] = useModal('root', {
    //   preventScroll: true
    // });

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
        <button onClick={this.onClickCreateGroupHandler.bind(this)}>Bottom Sheet anzeigen</button>

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
