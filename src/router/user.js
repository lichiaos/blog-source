const {
  loginCheck
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const handlerUserRouter = ((req, res) => {
  const method = req.method
  const {
    username,
    password
  } = req.query

  if (method === 'GET' && req.path === '/api/user/login') {
    let result = loginCheck(username, password)
    return result.then(loginData => {
      if (loginData.username) {
        req.session.username = loginData.username
        req.session.realname = loginData.realname
        console.log(req.session)
        return new SuccessModel(loginData)
      }
      return new ErrorModel('登录失败')
    })
  }
})

module.exports = handlerUserRouter