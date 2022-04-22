const { Schema, model } = require('mongoose')

const schema = new Schema({
    phone_number: {
        type: String,
        required: true
    },
    device_type: {
        type: Boolean,
        default: false,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    defect: {
        type: String
    },
    comment: {
        type: String
    },
})

module.exports = model('model', schema)