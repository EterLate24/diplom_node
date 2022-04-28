const { Router } = require('express')
const { route } = require('express/lib/application')
const applications = require('../models/model')
const router = Router()
const controller = require('../authController')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const jwt = require('jsonwebtoken')
const {formatDateWrong, formatDateBack} = require('./functions')



// Главная
router.get('/', async (req, res) => {

    res.render('index', {
        title: 'EterService - главная',
        home: true
    })
})

//----------------------------------------Авторизация
// Регистрация
router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 15 символов').isLength({ min: 4, max: 15 }),
    check('phone_number', 'Неверный формат номера телефона').isMobilePhone('ru-RU')
],
    controller.registration)

//Страничка регистрации
router.get('/registration_page', (req, res) => {
    res.render('registration_page', {
        title: 'EterService - зарегистрироваться'
    })
})
//Логин
router.post('/login', controller.login)

//Страничка входа
router.get('/enter', (req, res) => {
    res.render('enter', {
        title: 'EterService - войти',
        cab: true
    })
})

//Выход из аккаунта
router.get('/out', (req, res) => {
    res.clearCookie('UserHash')
    res.clearCookie('UserData')
    res.redirect('/enter')
})
//----------------------------------------Кабинет и управление
// Кабинет админа
router.get('/adminCab', roleMiddleware(['ADMIN']), async (req, res) => {
    const massiv = await applications.find().lean()
    massiv.forEach(element =>{
        if(element.date_create != null){
            element.date_create = formatDateWrong(element.date_create)
        }
        if(element.date_visit != null){
            element.date_visit = formatDateWrong(element.date_visit)
        }
    })
    res.render('adminCab', {
        massiv,
        title: 'EterService - управление',
        cab: true
    })
})

// Личный кабинет
router.get('/cab', authMiddleware, async (req, res) => {
    const { cookies } = req
    const phone = JSON.parse(cookies.UserData).phone_number
    const massiv = await applications.find({ phone_number: phone }).lean()
    res.render('cab', {
        title: 'EterService - личный кабинет',
        massiv,
        cab: true
    })
})

//----------------------------------------Заявки

// Создание заявки
router.get('/create_application', (req, res) => {
    const { cookies } = req
    const phone = JSON.parse(cookies.UserData).phone_number
    res.render('create_application', {
        phone,
        title: 'EterService - запись',
        create_application: true
    })
})

// Отправка заявки
router.post('/send_application', async (req, res) => {
    let now = new Date()
    const poc = new applications({
        phone_number: req.body.phone_number,
        device_type: req.body.device_type,
        brand: req.body.brand,
        model: req.body.model,
        defect: req.body.defect,
        comment: req.body.comment,
        date_visit: req.body.date_visit,
        date_create: now
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

//Страничка редактирования заявок
router.get('/edit_applications', (req, res) => {
        _id = req.query._id
        phone_number = req.query.phone_number,
        device_type = req.query.device_type,
        brand = req.query.brand,
        model = req.query.model,
        defect = req.query.defect,
        comment = req.query.comment,
        admin_comment = req.query.admin_comment,
        result = req.query.result,
        date_visit = req.query.date_visit
    res.render('edit_applications', {
        _id,
        phone_number,
        device_type,
        brand,
        model,
        defect,
        comment,
        admin_comment,
        date_visit,
        result,
        title: 'EterService - редактировать',
        cab: true
    })
})

//Сохранение редактирования заявки
router.post('/save_applications', async (req, res) => {
    const poc = await applications.findByIdAndUpdate(req.body._id,{
        phone_number: req.body.phone_number,
        device_type: req.body.device_type,
        brand: req.body.brand,
        model: req.body.model,
        defect: req.body.defect,
        comment: req.body.comment,
        admin_comment: req.body.admin_comment,
        result: req.body.result,
        date_visit: req.body.date_visit

    })
    //await poc.save()
    res.redirect('/adminCab')
})

// router.post('/complete', async (req, res) => {
//     const poc = await model.findById(req.body.id)

//     // poc.completed = !!req.body.completed
//     await poc.save()
//     res.redirect('/')


// }
// )




module.exports = router