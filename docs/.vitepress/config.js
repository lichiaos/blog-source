export default {
  title: "Dust の blog",
  description: "种一棵树最好的时间是十年前，其次是现在",
  markdown: { lineNumbers: true },
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  base: "/Blog/",
  themeConfig: {
    startYear: "2019",
    author: "dustSmile",
    logo: "/head.png",
    repo: "lichiaos/Blog",
    docsDir: "docs", // 设置 Markdown 存放目录。
    displayAllHeaders: false, // 默认为 false 仅打开当前文件标题。
    activateHeaderLinks: true,
    lastUpdated: "上次更新",
    socialLinks: [{ icon: "github", link: "https://github.com/lichiaos" }],
    nav: [
      {
        text: "积累",
        link: "/views/accumulate/常用utils",
      },
      {
        text: "interview",
        link: "/views/interview/手写代码",
      },
    ],
    sidebar: require("./sidebar"),
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "Category", // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "Tag", // 默认文案 “标签”
      },
    },
    markdown: {
      anchor: { permalink: true },
      lineNumbers: true,
      toc: { includeLevel: [1, 2, 3, 4] },
    },
  },
};
