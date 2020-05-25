import * as React from 'react';
import {Component} from "react";
import { connect } from "react-redux";
import axios from "../../store/axios";
import ListItem from "../../components/ui-elements/list-item/expenseListItem";


const singleExpense = {
    Id: null,
    Title: null,
    Costs: null,
    CategoryId: null,
    GroupId: null,
    Owner: null,
    CreatedAt: null
};


 class Expense extends Component {

     state = singleExpense;


     componentDidMount() {
         //Not an optimal solution, need to either let a dispatch method handle this or somehow else
         const config = {
             'headers': {
                 'authentication': 'Bearer ' + this.props.token,
                 'Content-Type': 'application/json'
             }
         };
         axios.get("/api/expense/" + this.props.match.params.id, config)
             .then(res => {
                 const expense = {
                     Id: res.data[0].Id,
                     Title: res.data[0].Title,
                     Costs: res.data[0].Costs,
                     CategoryId: res.data[0].CategoryId,
                     GroupId: res.data[0].GroupId,
                     Owner: res.data[0].Owner,
                     CreatedAt: res.data[0].CreatedAt
                 }
                 this.setState(
                     expense)
             })
     }

     render() {
         let singleExpense = null;
         if (this.state.Id !== null){
             singleExpense = <ListItem
             title={this.state.Title}
             costs={this.state.Costs}
             />
         }

             return (
                 <div>
                     {singleExpense}
                 </div>
             );
         }
         ;
     }



const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};



export default connect(mapStateToProps)(Expense);
