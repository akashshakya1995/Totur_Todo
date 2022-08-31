const { todoModel } = require("./todoModel")

module.exports = {
    createTodo: (req, res) => {
        var myData = new todoModel(req.body);
        myData.save().then(() => {
            res.status(200).render('create', { title: "ToDoList", cont: "TASK SUBMITTED" })
        })
    },

    showTodo: (req, res) => {
        todoModel.find((err, doc) => {
            if (!err) {
                res.render('show.pug', {
                    list: doc
                })
            }
            else
                console.log("error");
        })
    },


    editTodo: (req, res) => {
        todoModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) { res.redirect('show'); }
            else {
                console.log("error =" + err)
            }
        })
    },

    deleteTodo: (req, res) => {
        todoModel.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.redirect('/show'); }
            else {
                console.log("error" + err)
            }
        })
    }
}