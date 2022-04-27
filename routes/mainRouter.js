const { Router } = require('express')
const { route } = require('express/lib/application')
const applications = require('../models/model')
const router = Router()
const controller = require('../authController')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')


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
        title: 'EterService - войти',
        cab: true
    })
})

//Выход из аккаунта
router.get('/out',(req,res)=>{
    res.clearCookie('UserHash')
    res.clearCookie('UserData')
    res.redirect('/enter')
})
//----------------------------------------Кабинет и управление
// Кабинет админа
router.get('/adminCab', roleMiddleware(['ADMIN']), async(req,res) =>{
    const massiv = await applications.find().lean()
    res.render('adminCab',{
        massiv,
        title: 'EterService - управление',
        cab:true
    })
})

 // Личный кабинет
router.get('/cab', authMiddleware,async (req,res)=>{
    const { cookies } = req
    const phone = JSON.parse(cookies.UserData).phone_number
    //const { phone_number: phone } = jwt.verify(token, secret)
    const massiv = await applications.find({phone_number:phone}).lean()
    res.render('cab',{
        title: 'EterService - личный кабинет',
        massiv,
        cab:true
    })
})

//----------------------------------------Заявки
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

//----------------------------------------Странички
// Контакты
router.get('/contacts', (req, res) => {
    res.render('contacts', {
        title: 'EterService - Контакты',
        contacts: true
    })
})

// router.post('/complete', async (req, res) => {
//     const poc = await model.findById(req.body.id)

//     // poc.completed = !!req.body.completed
//     await poc.save()
//     res.redirect('/')


// }
// )




module.exports = router