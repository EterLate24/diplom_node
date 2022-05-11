const {Schema, model} = require('mongoose')

const User = new Schema({
    username:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    phone_number:{
        type: String,
        required:true
    },
    fio:{
        type: String
    },
    roles:[{
        type: String,
        ref: 'Role'

    }],
})

module.exports = model ('User', User)