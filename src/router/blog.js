const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delData
} = require('../controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

// 统一验证登录
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const handlerBlogRouter = ((req, res) => {
    const method = req.method
    const {
        author = '', keyword = '', id = ''
    } = req.query

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let resultData = getList(author, keyword)
        return resultData.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)
        let row = getDetail(id)
        return row.then(res => {
            return new SuccessModel(res)
        })
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        let loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            return loginCheck(req)
        }

        req.body.author =req.session.username
        let result = newBlog(req.body)
        return result.then(res => {
            return new SuccessModel(res)
        })
    }

    // 修改博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        let loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            return loginCheck(req)
        }
        let result = updateBlog(id, req.body)
        return result.then(res => {
            if (res) {
                return new SuccessModel()
            } else {
                return new ErrorModel('博客更新失败')
            }
        })
    }

    if (method === 'POST' && req.path === '/api/blog/delete') {
     let loginCheckRes = loginCheck(req)
      if (loginCheckRes) {
          return loginCheck(req)
      }
        let author = req.session.username
        let result = delData(id, author)
        return result.then(res => {
            if (res) {
                return new SuccessModel()
            } else {
                return new ErrorModel('博客删除失败')
            }
        })
    }
})

module.exports = handlerBlogRouter