const { getList, getDetail, newBlog, updateBlog, delData } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handlerBlogRouter = ((req, res) => {
  const method = req.method
  const { author = '', keyword = '', id='' } = req.query
  
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let resultData = getList(author, keyword)
    return  resultData.then(listData => {
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
      req.body.author = 'tom' // 暂时制造假数据
      let result = newBlog(req.body)
      return result.then(res => {
          return new SuccessModel(res) 
      })
  }

  // 修改博客
  if (method === 'POST' && req.path === '/api/blog/update') {
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
    let author = 'tom'  
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