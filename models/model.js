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
    date_complete: {
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
    worker: {
        type: String,
        ref: 'User'
    },
    approximate_cost: {
        type: Number
    },
    end_cost: {
        type: Number
    },
    status: {
        type: String,
        default: 'В обработке'
    }
})

module.exports = model('applications', applications)