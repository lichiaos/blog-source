const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      createTime: 1593475119574,
      author: '张三'
    },
     {
      id: 2,
      title: '标题2',
      content: '内容2',
      createTime: 1593475167334,
      author: '李思思'
    }
  ]
}


const getDetail = (id) => {
  return {
      id: 1,
      title: '标题1',
      content: '内容1',
      createTime: 1593475119574,
      author: '张三'
  }
}

module.exports  = {
  getList,
  getDetail
}