---
title: CSS相关
date: 2020-08-13
tags:
- CSS
categories: 
- CSS
author: 尘丶骁
---

# CSS
## flex简写表示
1. 默认值: [flex: 0 auto]: [0 1 auto]
2. [flex: 1]: [1 1 0%]
3. [flex: auto]: [1 1 auto]
4. [flex: none]: [0 0 auto]
## 三栏布局
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>三栏布局</title>
	<link rel="stylesheet" href="">
	<style type="text/css" media="screen">
		html *{
			margin: 0;
			padding: 0;
		}
	</style>
</head>
<body>
	<section class="layout float">
		<style type="text/css" media="screen">
			.layout.float .wrapper>div{
				min-height: 100px;
			}
			.layout.float .left{
				float: left;
				width: 300px;
				background: red;
			}
			.layout.float .center{
				background: yellow;
			}
			.layout.float .right{
				float: right;
				width: 300px;
				background: blue;
			}
			
		</style>
		<article class="wrapper">
			<div class="left"></div>
			<div class="right"></div>
			<div class="center">
				<h1>float布局</h1>
				1.我是float布局的中间部分
				2.我是float布局的中间部分
			</div>
		</article>
	</section>


	<section class="layout absolute">
		<style type="text/css" media="screen">
			.layout.absolute .wrapper{
				width: 100%;
				margin-top: 20px;
			}
			.layout.absolute .wrapper>div{
				min-height: 100px;
			}
			.layout.absolute .left{
				position: absolute;
				left: 0;
				width: 300px;
				background: red;
			}
			.layout.absolute .center{
				position: absolute;
				left: 300px;
				right: 300px;
				background: yellow;
			}
			.layout.absolute .right{
				position: absolute;
				right: 0;
				width: 300px;
				background: blue;
			}
		</style>
		<article class="wrapper">
			<div class="left"></div>
			<div class="center">
				<h1>absolute布局</h1>
				1.我是absolute布局的中间部分
				2.我是absolute布局的中间部分
			</div>
			<div class="right"></div>
		</article>
	</section>


	<section class="layout flex">
		<style type="text/css" media="screen">
			.layout.flex .wrapper{
				width: 100%;
				min-height: 100px;
				display: flex;
				margin-top: 140px;
			}
			.layout.flex .left{
				width: 300px;
				background: red;
			}
			.layout.flex .center{
				flex: 1;
				background: yellow;
			}
			.layout.flex .right{
				width: 300px;
				background: blue;
			}
		</style>
		<article class="wrapper">
			<div class="left"></div>
			<div class="center">
				<h1>flex布局</h1>
				1.我是flex布局的中间部分
				2.我是flex布局的中间部分
			</div>
			<div class="right"></div>
		</article>
	</section>


	<section class="layout table">
		<style type="text/css" media="screen">
			.layout.table .wrapper{
				display: table;
				width: 100%;
				min-height: 100px;
				margin-top: 20px;
			}
			.layout.table .left{
				display: table-cell;
				width: 300px;
				background: red;
			}
			.layout.table .center{
				display: table-cell;
				background: yellow;
			}
			.layout.table .right{
				display: table-cell;
				width: 300px;
				background: blue;
			}
			
		</style>
		<article class="wrapper">
			<div class="left"></div>
			<div class="center">
				<h1>table布局</h1>
				1.我是table布局的中间部分
				2.我是table布局的中间部分
			</div>
			<div class="right"></div>
		</article>
	</section>


	<section class="layout grid">
		<style type="text/css" media="screen">
			.layout.grid .wrapper{
				display: grid;
				grid-template-columns: 300px auto 300px;
				grid-template-rows: 100px;
				width: 100%;
				margin-top: 20px;
			}
			.layout.grid .left{
				background: red;
			}
			.layout.grid .center{
				background: yellow;
			}
			.layout.grid .right{
				background: blue;
			}
			
		</style>
		<article class="wrapper">
			<div class="left"></div>
			<div class="center">
				<h1>grid布局</h1>
				1.我是grid布局的中间部分
				2.我是grid布局的中间部分
			</div>
			<div class="right"></div>
		</article>
	</section>
</body>
</html>

```
## BFC(块级格式化上下文)
> BFC作为一个面试常考点, 往往都是知其然的情况, 再加上工作中接触的少, 所以有必要探究他的一些原理.
::: tip 概述
1. 什么是BFC?
2. BFC的作用什么?
3. 怎么使用BFC?
:::
### 什么是BFC?
常见的文档流分为三种: 定位流, 浮动流, 普通流. 而普通流是指BFC中的FC. 格式化上下文其实指的是页面中的一块
渲染区域, 有一套渲染规则, 决定了其子元素如何布局, 以及和其他元素之间的关系和作用. 
### 触发方式
1. 浮动元素: float的值为`left`丶 `right`
2. overflow的值不为`visible`, 为`auto`丶`scroll`丶`hidden`
3. display值为 `inline-block`、 `table-cell`、 `table-caption`、 `table`、 `inline-table`、 `flex`、 `inline-flex`、 `grid`、 `inline-grid`
4. position的值为`absolute`丶`fixed`
### 作用?
可以当做一个用于隔离的容器, 容器里面的子元素不会影响到外面元素, 反之亦然.
1. 阻止元素被浮动元素覆盖
 一个正常文档流的block元素被一个float元素覆盖,挤占正常文档流,
 2. 
 
 
### 水平垂直居中
1. table
```css
.parent {
     display: table-cell;
     vertical-align: middle;
     text-align: center;
}
.child {
    display: inline-block;
}
```
2. transform
```css
.parent {
position: relative;
}
.child {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
```
3. flex
```css
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
```