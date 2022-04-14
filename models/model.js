const {Schema, model} = require('mongoose')

const schema = new Schema({
    name:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

module.exports = model('model', schema)