const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const CategorySchema = new Schema({
    name: { type: String, required: true},
    image: { type: String, required: true},
})

//create model for todo
const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;