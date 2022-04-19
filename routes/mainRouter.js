const { Router } = require('express')
const { route } = require('express/lib/application')
const model = require('../models/model')
const router = Router()

router.get('/', async (req, res) => {
    const massiv = await model.find({}).lean()

    res.render('index', {
        title: 'Здрасьте',
        massiv
    })
})

router.get('/create_application', (req, res) => {
    res.render('create_application', {
        title: 'Создание',
    })
})

router.post('/send_application', async (req, res) => {
    const poc = new model({
        name: req.body.name
    })
    await poc.save()
    res.redirect('/')

})

router.post('/complete', async (req, res) => {
    const poc = await model.findById(req.body.id)

    poc.completed = !!req.body.completed
    await poc.save()
    res.redirect('/')


}
)




module.exports = router