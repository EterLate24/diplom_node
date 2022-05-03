const { Schema, model } = require('mongoose')

const history = new Schema({
    application_id: {
        type: String,
        required: true
    },
    field_edit: {
        type: String,
        required: true
    },
    date_edit: {
        type: Date,
        required: true
    },
    last_value: {
        type: String,
        required: true
    },
    end_value: {
        type: String,
        required: true
    }
})

module.exports = model('history', history)