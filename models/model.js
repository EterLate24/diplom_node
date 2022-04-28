const { Schema, model } = require('mongoose')

const applications = new Schema({
    phone_number: {
        type: String,
        required: true
    },
    device_type: {
        type: Boolean,
        default: false,
        required: true
    },
    date_create: {
        type: Date,
        required: true
    },
    date_visit: {
        type: Date
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
    admin_comment: {
        type: String
    },
    result: {
        type: Boolean,
        default: false
    }
})

module.exports = model('applications', applications)