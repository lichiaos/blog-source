const querystring = require('querystring')
const hadnlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')
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

let getCookieExpires = () => {
    let date = new Date()
    date.setTime(date.getTime() + 24 * 3600 * 1000)
    return date.toGMTString()
}

const SESSION_DATA = {}

const serverHandler = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    req.cookie = {}

    // 解析cookie
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (item) {
            const [key, value] = item.split('=')
            req.cookie[key] = value
        }
    })

    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userId

    if (!SESSION_DATA[userId]) SESSION_DATA[userId] = {}
    if (!userId) {
        userId = `${Date.now()}_${Math.random()}`
        needSetCookie = true
    }
    req.session =  SESSION_DATA[userId]
    
    getPostData(req).then(postData => {
        req.body = postData
        let blogData = handlerBlogRouter(req, res)
        if (blogData) {
            blogData.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }
        let userData = hadnlerUserRouter(req, res)
        if (userData) {
            userData.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
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