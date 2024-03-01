const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minLength: 10,
    },
    username: {
        type: String,
        require: true,
        minLength: 4,
    },
    password: {
        type: String,
        require: true,
        minLength: 4,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

