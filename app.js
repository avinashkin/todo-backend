const express = require('express');
const app = express();
const userRouter = require('./src/routes/user-routes');
const connect = require('./src/middliwares/connection');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connect();

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log("App running at localhost:3000");
})
