const { Router } = require('express')
const { route } = require('express/lib/application')
const applications = require('../models/model')
const router = Router()
const controller = require('../authController')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


// Главная
router.get('/', async (req, res) => {
    
    res.render('index', {
        title: 'EterService - главная',
        home: true
    })
})

//----------------------------------------Авторизация
// Регистрация
router.post('/registration',[
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 15 символов').isLength({min:4, max:15}),
    check('phone_number', 'Неверный формат номера телефона').isMobilePhone('ru-RU')
    ], 
    controller.registration)

//Страничка регистрации
router.get('/registration_page', (req,res)=>{
    res.render('registration_page',{
        title: 'EterService - зарегистрироваться'
    })
})
//Логин
router.post('/login', controller.login)

//Страничка входа
router.get('/enter', (req,res)=>{
    res.render('enter',{
        title: 'EterService - войти'
    })
})

// Кабинет админа
router.get('/adminCab', roleMiddleware(['ADMIN']))

 // Личный кабинет
router.get('/cab', authMiddleware,async (req,res)=>{
    const massiv = await applications.find({}).lean()
    res.render('cab',{
        massiv,
        cab:true
    })
})


// Просмотр заявок
router.get('/view_application')

// Создание заявки
router.get('/create_application', (req, res) => {
    res.render('create_application', {
        title: 'EterService - запись',
        create_application: true
    })
})

// Отправка заявки
router.post('/send_application', async (req, res) => {
    const poc = new applications({
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