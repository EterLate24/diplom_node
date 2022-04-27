const jwt = require('jsonwebtoken')
const {secret} = require('../config')



module.exports = (req, res, next) => {
    const { cookies } = req
    try {
        if ('UserHash' in cookies) {
            try {
                jwt.verify(cookies.UserHash, secret)
                next();
            }
            catch (e) {
                if (e instanceof jwt.JsonWebTokenError) {
                    res.redirect('/enter')
                }
            }
        }
        else {
            res.redirect('/enter')
        }
    } catch (e) {
        res.redirect('/enter')
    }

}

// module.exports = function(req, res, next){
//     if(req.method === 'OPTIONS'){
//         next()
//     }

//     try{
//         const token = req.headers.authorization.split(' ')[1]
//         if(!token){
//             return res.status(403).json({message:'Пользователь не авторизован'})
//         }
//         const decodedData = jwt.verify(token,secret)
//         req.user = decodedData
//         next()
//     }catch(e){
//         console.log(e)
//         return res.status(403).json({message:'Пользователь не авторизован'})
//         }
// }