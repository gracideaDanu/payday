// import React, { Component } from 'react';
// import './bottomSheet.css'
// import ListItem from '../ui-elements/list-item/groupListItem'

// class BottomSheet extends Component {

//   render() {
//     return (
//       <div className="bottom-sheet">

//         <ListItem
//           costs="+34,12"
//           title="Saufgruppe"
//           participants="1"
//           owner="Niklas"
//         />
//         <ListItem
//           costs="-3,12"
//           title="Biergruppe"
//           participants="2"
//           owner="Niklas"
//         />
//         <ListItem
//           costs="+334,12"
//           title="1. Maigruppe"
//           participants="3"
//           owner="Pascal"
//         />
//         <ListItem
//           costs="+34,12"
//           title="Saufgruppe"
//           participants="1"
//           owner="Niklas"
//         />
//         <ListItem
//           costs="-3,12"
//           title="Biergruppe"
//           participants="2"
//           owner="Niklas"
//         />
//         <ListItem
//           costs="+334,12"
//           title="1. Maigruppe"
//           participants="3"
//           owner="Pascal"
//         />
//         <ListItem
//           costs="+34,12"
//           title="Saufgruppe"
//           participants="1"
//           owner="Niklas"
//         />
//         <ListItem
//           costs="-3,12"
//           title="Biergruppe"
//           participants="2"
//           owner="Niklas"
//         />
//         <ListItem
//           costs="+334,12"
//           title="1. Maigruppe"
//           participants="3"
//           owner="Pascal"
//         /></div>
//     )
//   }


// }

// export default BottomSheet;









































// // import React, { Component } from "react";
// // import AnimatedView from "./animatedView";
// // import {
// //   Animated,
// //   View,
// //   StyleSheet,
// //   Modal,
// //   Dimensions,
// //   PanResponder,
// // } from "react-native";

// // class BottomSheet extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       valueY: new Animated.Value(Dimensions.get("screen").height),
// //     };

// //     const reset = Animated.timing(this.state.panY, {
// //       toValue: 0,
// //       duration: 300,
// //     });

// //     const close = Animated.timing(this.state.panY, {
// //       toValue: Dimensions.get("screen").height,
// //       duration: 500,
// //     });

// //     this._panResponders = PanResponder.create({
// //       onStartShouldSetPanResponder: () => true,
// //       onMoveShouldSetPanResponder: () => false,
// //       onPanResponderMove: Animated.event([null, { dy: this.state.panY }]),
// //       onPanResponderRelease: (e, gs) => {
// //         if (gs.dy > 0 && gs.vy > 2) {
// //           return this.close.start(() => this.props.onDismiss());
// //         }
// //         return this.reset.start();
// //       },
// //     });
// //   }

// //   componentDidUpdate(prevProps, prevState) {
// //     if (prevProps.visible !== this.props.visible && this.props.visible) {
// //       this._resetPositionAnim.start();
// //     }
// //   }
// //   _handleDismiss() {
// //     this._closeAnim.start(() => this.props.onDismiss());
// //   }

// //   render() {
// //     const styles = StyleSheet.create({
// //       overlay: {
// //         backgroundColor: "rgba(0,0,0,0.2)",
// //         flex: 1,
// //         justifyContent: "flex-end",
// //       },
// //       container: {
// //         backgroundColor: "white",
// //         paddingTop: 12,
// //         borderTopRightRadius: 12,
// //         borderTopLeftRadius: 12,
// //       },
// //     });

// //     const top = this.state.panY.interpolate({
// //       inputRange: [-1, 0, 1],
// //       outputRange: [0, 0, 1],
// //     });

// //     return (
// //       <Modal
// //         animated
// //         animationType="fade"
// //         visible={this.props.visible}
// //         transparent
// //         onRequestClose={() => this._handleDismiss()}
// //       >
// //         <View style={styles.overlay}>
// //           {" "}
// //           <Animated.View style={[styles.container, { top }]}>
// //             {this.props.children}
// //           </Animated.View>
// //         </View>
// //       </Modal>
// //     );
// //   }
// // }

// // export default BottomSheet;
