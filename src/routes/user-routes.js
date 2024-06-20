const router = require('express').Router();
const user = require('../controllers/user');
const auth = require("../middliwares/auth");


router.post("/create", (req, res) => {
    user.createUser(req, res);
});

router.post("/login", (req, res) => {
    user.login(req, res);
})

router.get("/", auth, (req, res) => {
    res.status(200).send("Get all posts");
});

router.put("/add", auth, (req, res) => {
    user.addTodo(req, res);
});

router.delete("/delete/:id", auth, (req, res) => {
    user.deleteTodo(req, res);
})

router.put("/update", auth, (req, res) => {
    user.updateTodo(req, res);
})

module.exports = router;