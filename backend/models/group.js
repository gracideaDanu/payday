const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const GroupSchema = new Schema({
    name: { type: String, required: true },
    users: { type: [Schema.Types.ObjectId], required: true },
    image: { type: String, default: "placeholder.png" }
})

//create model for todo
const Group = mongoose.model('groups', GroupSchema);

module.exports = Group;