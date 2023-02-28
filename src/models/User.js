const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        min: 3,
        max: 128
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    numberPhone: {
        type: Number,
        required: false,
        min: 8,
        max: 14,
        default: 0000000000
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 512
    },
    role: {
        type: String,
        required: true
    },
    isActive: {
        type:Boolean,
        default: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);