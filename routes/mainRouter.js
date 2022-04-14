const { Router } = require('express')
const model = require('../models/model')
const router = Router()

router.get('/', async (req, res) => {
    const massiv = await model.find({}).lean()

    res.render('index', {
        title: 'Здрасьте',
        massiv
    })
})

router.get('/create',  (req, res) => {
    res.render('create', {
        title: 'Создание',
    })
})

router.post('/create', async (req, res) => {
    const poc = new model({
        name: req.body.name
    })
    await poc.save()
    res.redirect('/')

})




module.exports = router