const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
        id: {type: String, required: true},
        title: {type: String, required: true},
        dueDate: Date,
        status: {type: String, enum: ['pending', 'completed'], required: true},
        tags: [String],
        category: String
    
})

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    date_created: { type: Date, default: Date.now },
    todos: {type: [todoSchema], default: []}
  },
  { collection: "users" }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
