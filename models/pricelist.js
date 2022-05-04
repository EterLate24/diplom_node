const {Schema, model} = require('mongoose')

const pricelist = new Schema({
    model:{
        type: String
    },
    defect:{
        type: String
    },
    price:{
        type: Number
    },
    coef:{
        type: Number
    }
})

module.exports = model ('pricelist', pricelist)