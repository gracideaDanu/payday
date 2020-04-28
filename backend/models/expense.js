const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const ExpenseSchema = new Schema({
    title: { type: String, required: true },
    costs: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, required: true },
    group: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, required: true },
    participants: [{ type: Schema.Types.ObjectId, required: true }]
})

//create model for todo
const Expense = mongoose.model('expenses', ExpenseSchema);

module.exports = Expense;