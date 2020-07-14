const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handlerUserRouter = ((req, res) => {
    const method = req.method
    const {
        username,
        password
    } = req.body

    if (method === 'GET' && req.path === '/api/user/login') {
       let result = loginCheck(username, password)
      return  result.then(loginData => {
           if (loginData.username) {
               return new SuccessModel(loginData)
           }
           return new ErrorModel('登录失败')
       })
    }

})

module.exports = handlerUserRouter