const handlerBlogRouter = require("./blog")

const handlerUserRouter = ((req, res) => {
  const method = req.method
  
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '这是登录接口'
    }
  }
})

module.exports = handlerBlogRouter