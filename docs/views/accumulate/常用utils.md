---
title: 常用utils 
date: 2019-03-01
tags:
- utils
categories: 
- frontEnd
author: 尘丶骁
---

## SessionStorage简单封装

```js
export const putSession = (name, obj) => {
  let params = getSession(name)
  if (params !== null) {
    sessionStorage[name] = JSON.stringify(Object.assign(params, obj))
  } else {
    sessionStorage[name] = JSON.stringify(obj)
  }
}
export const getSession = (name) => {
  if (sessionStorage.getItem(name) !== null) {
    return JSON.parse(sessionStorage[name])
  } else {
    return null
  }
}
```
## 数组对象中的每一项是否相等
```js
function unique(arr) {
    let init = [JSON.stringify(arr[0])],
    flag = true,
    len = arr.length
    for (let i = 1; i < len; i++) {
        if (init.indexOf(JSON.stringify(arr[i])) === -1) {
            return flag = false
        } else {
            flag = true
        }
    }
    return flag
}
```
## 数组去重

### 1. 利用循环去重
```js
对已经排序的就根据只是否等于相邻位置
如果要将单个数据进行处理, 可以将函数传入第三个参数

function unique(arr, isSorted, iteratee) {
  let res = []
  let seen
  for (let i = 0, len = arr.length; i < len; i++) {
    let value = arr[i]
    let computed = iteratee ? iteratee(value, i, arr) : value
    if (isSorted) {
      if (!i || seen !== computed) {
        res.push(value)
      }
      seen = computed
    } else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        seen.push(computed)
        res.push(value)
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value)
    }
  }
  return res
}
```
### 2. ES5filter
#### 1. 利用indexOf
```js
function unique(array) {
  return array.filter((item, i, arr) => arr.indexOf(item) === i)
}
```
#### 2. 利用sort排序
```js
function unique(arrary) {
  return array.concat().sort().filter((item, i, arr) => !i || item !== arr[i - 1])
}
```
#### 3. 利用对象的同名属性

```js
function unique(array) {
  let obj = {};
  return array.filter((item, i, arr) => obj.hasOwnProperty(typeof item + JSON.stringify(item))
      ? false
      : (obj[typeof item + JSON.stringify(item)] = true))
}
```


---
## 类型判断

```js
let class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
// IE6中会被认为是Object
    if (obj === null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```
### 判断是否是空对象

```js
function isEmptyObj(obj) {
    let key
    for (key in obj) {
        return false
    }
    return ture
}
```
## 深浅拷贝
### 1. 数组浅拷贝
#### slice, concat
::: warning 注意
不适用数组嵌套对象或数组
:::
### 2. 数组深拷贝
#### JSON.parse( JSON.stringify(arr) )
::: warning 注意
不能拷贝函数
:::
### 3. 浅拷贝的实现

```js
const shallowCopy = (obj) => {
  if (typeof obj !== 'object') return
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
```
### 4. 深拷贝的实现

```js
const deepCloneObj = (obj) => {
  if (typeof obj !== 'object') return obj
  const temp = obj.constructor === Array ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { 
      temp[key] = typeof obj[key] === 'object' 
      ? this.deepCloneObj(obj[key]) 
      : obj[key] 
    }
  }
  return temp
}
```

## 格式化时间
```js
/**
 * forMat time to normal time
 * @param time
 * @param fmt
 * @return {string}
 */
export const formatTime = (time, format) => {
  if (arguments.length === 0) return null
  const fmt = format || 'YYYY-MM-DD HH:mm:ss'
  let date
  if (time instanceof Object) {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const o = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  }
  const normalTime = fmt.replace(/(Y|M|D|H|m|s)+/g, (res, k) => {
    let value = o[k]
    if (res.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return normalTime
}

export const time = (time, fmt = 'YYYY-MM-DD HH:mm:ss') => formatTime(time, fmt)

export const minutes = (time, fmt = 'YYYY-MM-DD HH:mm') => formatTime(time, fmt)

export const hour = (time, fmt = 'YYYY-MM-DD HH') => formatTime(time, fmt)

export const date = (time, fmt = 'YYYY-MM-DD') => formatTime(time, fmt)

export const second = (time, fmt = 'HH:mm:ss') => formatTime(time, fmt)

export const month = (time, fmt = 'YYYY-MM') => formatTime(time, fmt)

```
