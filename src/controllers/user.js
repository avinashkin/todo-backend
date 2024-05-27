const UserModel = require('../models/user-model');

const createUser = (req, res) => {
    const doc = new UserModel(req.body);
    doc.save().then((response) => {
        res.status(200).send({_id: response._id, message: 'New User created sucessfully. Login now.'});
    }).catch((err) => {
        if (err?.code === 11000) {
            res.status(500).send({message: 'Email already exists. Try logging in.'})
            return;
        }
        res.status(500).send({message: 'Unable to create new user. Try again later.'})
    })
}

const addTodo = (req, res) => {
    const doc = req.body;
    const userId = req.body.userId;
    delete doc.userId;
    if (!userId) {
        res.status(500).send({message: "user Id is missing"});
        return;
    }

    UserModel.findOneAndUpdate({_id: userId}, {$push: {todos: doc}}, { runValidators: true, new: true })
        .then((response) => {
            res.status(200).send({message: "Todo added successfully", id: response._id});
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                res.status(500).send({message: "Missig fields.", error: err.message})
                return;
            }
            res.status(500).send({message: "Error occured.", error: err.message})
        })
}

module.exports = {
    createUser,
    addTodo
}