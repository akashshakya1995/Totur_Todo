
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is mandatory"
    },
    task: {
        type: String,
        required: "This field is mandatory"
    },
});

//now creating document in database
const todoModel = mongoose.model('todo', todoSchema);

module.exports = { todoModel }
