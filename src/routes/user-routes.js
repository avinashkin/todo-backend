const router = require('express').Router();
const user = require('../controllers/user');


router.get("/", (req, res) => {
    res.status(200).send("Get all posts");
});

router.post("/create", (req, res) => {
    user.createUser(req, res);
});

router.put("/add", (req, res) => {
    user.addTodo(req, res);
})


module.exports = router;