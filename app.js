const querystring = require('querystring')
const hadnlerBlogRouter = require('./src/router/blog')
const hadnlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')
const {
  resolve
} = require('path')
const {
  rejects
} = require('assert')

let getPostData = ((req) => {
  return new Promise((resolve, rejects) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
})

const serverHandler = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])


  getPostData(req).then(postData => {
    req.body = postData
    let blogData = handlerBlogRouter(req, res)
    if (blogData) {
        blogData.then(blogData => {
           res.end(JSON.stringify(blogData))
        }) 
        return
    }
    let userData = hadnlerUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }
      res.writeHead(404, {
    'Content-type': 'text/plain'
      })
      res.write('404 Not Found')
      res.end()
  })
}

module.exports = serverHandler