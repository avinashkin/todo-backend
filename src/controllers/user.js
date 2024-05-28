const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  const doc = new UserModel(req.body);
  doc
    .save()
    .then((response) => {
      res
        .status(200)
        .send({
          _id: response._id,
          message: "New User created sucessfully. Login now.",
        });
    })
    .catch((err) => {
      if (err?.code === 11000) {
        res
          .status(500)
          .send({ message: "Email already exists. Try logging in." });
        return;
      }
      res
        .status(500)
        .send({ message: "Unable to create new user. Try again later." });
    });
};

const findUser = async (email, password) => {
    const res = await UserModel.find({email: email, password: password});
    return res;
};

const login = async (req, res) => {
    const user = await findUser(req?.body?.email, req?.body?.password);
    if (!!user[0]) {
        const id = user[0]._id;
        const access_token = jwt.sign({
          userId: id
        }, process.env.SECRET_KEY);
    
        return res.status(200).send({success: true, userDetails: user[0], access_token})
      } else {
        return res.status(404).json({message: "Username or password incorrect."});
      }
};

const addTodo = (req, res) => {
  const doc = req.body;
  const userId = req.user.userId;

  if (!userId) {
    res.status(500).send({ message: "user Id is missing" });
    return;
  }

  UserModel.findOneAndUpdate({ _id: userId }, { $push: { todos: doc } }, { runValidators: true, returnDocument: 'after' })
    .then((response) => {
      res.status(200).send({ message: "Todo added successfully", id: response._id });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(500).send({ message: "Missig fields.", error: err.message });
        return;
      }
      res.status(500).send({ message: "Error occured.", error: err.message });
    });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;

  if (!id) {
    res.status(500).send({ message: "Todo id missing" });
    return;
  }
  if (!userId) {
    res.status(500).send({ message: "user Id is missing" });
    return;
  }

  UserModel.updateOne({ _id: userId }, { $pull: { todos: { id: id } } })
    .then((response) => {
      console.log(response);
      res.status(200).send({ message: "Todo deleted." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error occured" });
    });
};



module.exports = {
  createUser,
  addTodo,
  deleteTodo,
  login
};
