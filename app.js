const querystring = require('querystring')
const hadnlerBlogRouter = require('./src/router/blog')
const hadnlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')

const serverHandler = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])

  let blogData = handlerBlogRouter(req, res)
  let userData = hadnlerUserRouter(req, res)

  
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return 
  }
   if (userData) {
    res.end(JSON.stringify(userData))
    return 
  }
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 Not Found')
  res.end()
}

module.exports = serverHandler