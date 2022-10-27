const mongoose = require('mongoose');
// const vaccination = require('./vaccination');
const memberSchema = mongoose.Schema({

    memberName: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    adress: {
        type: String
    },
    bornDate: {
        type: Date,
        required: true
    },
    phone: {
        type: Number
    },
    mobilePhone: {
        type: Number
    },
   
})
module.exports = mongoose.model('members', memberSchema)