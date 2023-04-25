---
title: TypeScript笔记  
date: 2021-03-6
tags:
- 基础概念
categories: 
- frontEnd
author: 尘丶骁
---
## 1. TypeScript简介
  1. 以 JaveScript 为基础构建的语言, JS的超集
  2. 可以在任何支持 JavaScript 的平台中执行
  3. TS拓展了JS, 并增加了类型
  4. TS不能被JS解析器直接执行
### 开发环境搭建
* 使用npm全局安装 => `npm i typescript -g`
* 使用 tsc xxx.ts 进行编译 
## 2. 基本类型
* 类型声明
  * 类型声明是TS非常重要的特点
  * 通过类型声明可以指定TS变量(参数, 形参) 的类型
  * 指定类型后, 当为变量赋值时, TS编译器会自动检查值是否符合类型声明, 符合赋值, 否则报错
  * 语法: 
  ```js
  let 变量: 类型
  let 变量: 类型 = 值
  function fn (参数: 类型, 参数2: 类型): 类型 {
    ...
  }
  ```
* 自动类型判断
  * TS拥有自动类型判断机制
  * 当对变量的声明和赋值时同时进行的, TS编译器自动判断变量的类型
  * 当声明和赋值同时进行时, 可以省略类型声明
* 类型:  
  | 类型 | 例子 | 描述 |   
  | --- | --- | --- |   
  | number | 1, 2, 3 | 任意数字 |   
  | string | 'tom', 'lisa' | 任意字符串 |   
  | boolean | true, false | 布尔值 |   
  | 字面量 | let a: 10 | 限制变量的值就是该字面量的值 |   
  | any | * | 任意类型 |   
  | unknown | * | 类型安全的any(区别在于赋值给其他变量) |   
  | void | 空值(undefined) | 没有值 (或undefined) |   
  | never | 没有值 | 不能时任何值 |   
  | object | { name: 'tom' } | 任意JS对象 |   
  | array | [1, 2, 3] | 任意JS数组 |   
  | tuple | [string, string]  | 元组, TS新增类型, 固定长度 |   
  | enum | enum {A:'A'} | 枚举, TS新增类型 |   
## 3. 编译选项
* 自动编译文件  
  * 编译文件时, 使用-w指令后, TS编译器会自动监视文件的变化, 并在文件变化时对文件进行重新编译
  * 示例: 
    * `tsc xxx.ts -w`
* 自动编译整个项目
  * 如果直接使用tsc指令, 则可以自动将当前项目下的所有ts文件编译为js文件
  * tsconfig.json是一个JSON文件, 添加配置文件后, 只需要tsc命令即可完成对整个项目的编译
  * 配置选项
    * include
      * 定义希望被编译文件所在的目录
      * 默认值: ['**/*']
      * 示例: 
        * `"include": ["src/**/*", "tests/**/*"]`
        * 所有src目录和tests目录下的文件都会被编译
    * exclude 
      * 定义需要排除在外的目录
      * 默认值: ["node_modules", "bower_components", "jspm_packages"]
      * 示例: 
        * `"exclude": ["./src/hello/**/*"]`
        * 上述示例中, src下hello目录下的文件都不会被编译
    * extends
      * 定义被继承的配置文件
      * 示例: 
        * `"extends": "./confis/base"`
        * 上述示例中, 当前配置文件中会自动包含config目录下base.json中的所有配置信息
    * files
      * 指定被编译文件的列表, 只有需要被编译的文件少时才会用到
      * 示例: 
        * ```js
          "files": [
            "cores.ts",
            "sys.ts",
            "types.ts"
          ]
        * 列表中的文件都会被TS编译器所编译
    * compilerOptions
      * 编译选项是配置文件中最重要也是最复杂的选项
      * 在compilerOptions中包含多个子选项, 用来完成对编译的配置
        * 项目选项
          * 示例: 
            * ```js 
              "compilerOptions": {
                "target": "ES6"
              }  
          * target
            * 设置ts代码编译的目标版本
            * 可选值: 
              * ES3(默认)|ES5|ES6/ES2015|ES7/ES2016|ES2017|ES2018|2019|2020|ESNext
            * 如上设置, 我们编写的ts代码将会被编译为ES6版本的js代码
          * lib
            * 指定代码运行时所包含的库(宿主环境)
            * 可选值: 
              * ES5|ES6/ES2015|ES7/ES2016|ES2017|ES2018|2019|2020|ESNext|DOM|WebWorker|ScriptHort 
          * outDir            => 指定编译后代码的文件夹存放位置
          * outFile           => 将编译后的代码合并为一个文件
          * allowJs:          => 是否编译JS文件, 默认是false
          * checkJs           => 是否检查js代码是否符合语法规范
          * removeComents:    => 是否删除注释
          * noEmit:           => 不生成编译后的文件
          * noEmitOnError     => 当有错误时不生产编译后的文件
          * strict            => 所有严格检查的总开关 
          * alwaysStrict:     => 是否使用严格模式编译
          * noImplicitAny:    => 是否允许有隐式的any
          * strictNullChecks: => 是否严格的检查空值 

          
          
## 面向对象
面向对象是程序中非常重要的思想, 简而言之就是程序之中所有的操作都需要通过对象来完成.
* 举个栗子: 
  * 操作浏览器需要使用window对象
  * 操作网页需要使用document对象
  * 操作控制台需要使用console对象

一切操作都要通过对象, 也就是所谓的面向对象, 计算机程序的本质就是对现实事物的抽象. 
抽象的反义词是具体, 比如: 照片是对一个具体的人的抽象, 汽车模型是对具体汽车的抽象等等. 
程序也是对事物的抽象, 在程序中我们可以表示一个人, 一条狗, 一个事物到了程序中就变成了一个对象

在程序中所有的对象都被分成了两个部分: 数据和功能, 以人为例, 人的姓名, 身高, 体重等属于数据, 人可以走路, 说话, 吃饭, 睡觉这些属于人的功能. 数据在对象中被称为属性, 功能在对象中被称为方法, 所以在程序中一切皆对象.

### 1. 类(class)
要想面对对象, 操作对象, 首先便要拥有对象, 要创建对象就要定义一个类, 类相当于对象的模型, 
程序中可以根据类创建指定类型的对象, 不同的类可以创建不同的对象. 
* 示例: 
```js
// 抽象类, 只能用作继承, 不能创建实例
abstract class Person {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  // 抽象方法只能定义在抽象类中,子类必须对抽象方法进行重写
  abstract sayHello(): void
}
```

### 2. 接口
```js
// 描述一个对象的类型
type myType = {
  name: string,
  age: number
}

// 接口用来定义一个类结构, 用来定义一个类中应该包含哪些属性和方法
// 同时接口也可以当成类型声明去使用, 接口只定义对象的结构, 而不考虑实际值
// 在接口中所有的方法都是抽象方法

interface myInterface {
  name: string,
  age: number
}

const obj: myType = {
  name: 'sss',
  age: 111
}
```

### 3. 泛型
* 在定义函数或者类时, 如果遇到类型不明确就可以使用泛型
```js
function fn<T>(a: T): T{
  return a
}
// 可以直接调用具有泛型的函数
let result = fn(a: 10) // 不指定泛型, TS可以自动对类型进行推断
let result2 = fn<string>(a: 'hello') // 指定泛型

functio n fn3<T extends Inter>(a: T) :number {
  return a.length
}
``` 

