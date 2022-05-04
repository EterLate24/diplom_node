const {Schema, model} = require('mongoose')

const pricelist = new Schema({
    brand:{
        type: String
    },
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