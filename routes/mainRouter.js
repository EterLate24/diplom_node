const { Router } = require('express')
const { route } = require('express/lib/application')
const model = require('../models/model')
const router = Router()

router.get('/', async (req, res) => {
    const massiv = await model.find({}).lean()
    res.render('index', {
        title: 'EterService - главная',
        massiv,
        home:true
    })
})

router.get('/create_application', (req, res) => {
    res.render('create_application', {
        title: 'EterService - запись',
        create_application: true
    })
})

router.post('/send_application', async (req, res) => {
    const poc = new model({
        phone_number: req.body.phone_number,
        device_type: req.body.device_type,
        brand: req.body.brand,
        model: req.body.model,
        defect: req.body.defect,
        comment: req.body.comment
    })
    await poc.save()
    res.redirect('/')

})

// router.post('/complete', async (req, res) => {
//     const poc = await model.findById(req.body.id)

//     // poc.completed = !!req.body.completed
//     await poc.save()
//     res.redirect('/')


// }
// )




module.exports = router