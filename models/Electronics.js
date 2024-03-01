const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 10,
    },
    type: {
        type: String,
        required: true,
        minLength: 2,
    },
    damages: {
        type: String,
        required: true,
        minLength: 10,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200
    },
    production: {
        type: Number,
        required: true,
        minValue: 1900,
        maxValue: 2023
    },
    exploitation: {
        type: Number,
        required: true,
        minLength: 0,
    },
    price: {
        type: Number,
        required: true,
        minValue: 0,
    },
    buyingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
    
});

const User = mongoose.model('Electronics', electronicsSchema);

module.exports = User;

