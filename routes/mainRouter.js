const{Router} = require('express')
const model = require('../models/model')
const router = Router()

router.get('/', async (req, res) =>{
    const pisi = await model.find({})
    res.render('index',{
        title: 'Здрасьте',
        pisi
    })
})

module.exports = router