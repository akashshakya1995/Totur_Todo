const mongoose = require("mongoose");

const dbConnect = async function () {
    mongoose.connect('mongodb://localhost:27017/todoList', {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log("we are connected now!");
    });
}

module.exports = { dbConnect }