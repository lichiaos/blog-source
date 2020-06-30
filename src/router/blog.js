const { getList, getDetail } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')

const handlerBlogRouter = ((req, res) => {
  const method = req.method
  const { author = '', keyword = '', id='' } = req.query
  
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

   // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }

   // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '新增博客接口'
    }
  }
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '修改接口'
    }
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    return {
      msg: '删除接口'
    }
  }
})

module.exports = handlerBlogRouter