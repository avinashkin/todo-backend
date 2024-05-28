const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log('Database Connected!!!');
    } catch (err) {
        console.log("Error occured while connecting to database: ", err);
    }
}

module.exports = connect;