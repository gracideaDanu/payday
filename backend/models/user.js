const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const UserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: "placeholder.png" },
    createdAt: { type: Date, default: Date.now()}
})

//create model for todo
const User = mongoose.model('users', UserSchema);

module.exports = User;