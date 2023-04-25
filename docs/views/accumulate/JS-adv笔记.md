---
title: JS-adv笔记
date: 2019-07-24
tags:
  - adv
categories:
  - advance
---

## 执行上下文

:::tip 前言
JS 引擎在执行过程中分为三个阶段

1. 词法分析(分析代码块语法是否正确, 如果不正确, 则向外抛出一个`语法错误(SyntaxError)`
2. 预编译阶段(执行上下文)
3. 执行阶段(执行上下文栈)
   :::
   > 定义: 在代码执行之前要进行一些'准备工作',这些准备工作就包括以下:
4. 变量 , 函数表达式--变量声明,默认赋值为 undefined
5. this--赋值
6. 函数声明--赋值

- **这三种数据的准备情况我们称之为"执行上下文"或者是"执行上下文环境"**
  - 通俗点就是在代码执行之前把用到的变量拿出来,挨个赋值,没有直接赋值的就用 undefined 占个空

**JavaScript 的三种运行环境:**

- 全局环境:JavaScript 代码运行起来首先会进入该环境, 也就是`window`对象, `this`指向这个全局对象.
- 函数环境 :当函数被调用时,会进入当前函数中执行代码
- eval: 指的是运行`eval`函数中的代码

执行上下文可以理解为当前的代码的**执行环境**,他会形成作用域,运行环境也分为大致上面三种

**执行上下文的两个阶段:**

- **创建阶段**
  - 执行上下文会分别创建`变量对象`,建立`作用域链`,以及确定`this`的指向.
- **代码执行阶段**
  - 这个阶段就会进行变量赋值,函数引用

在函数**没有**调用的时候并不会创建上下文.

:::tip 问题
变量对象和活跃对象有什么区别 ?

他们其实是一个对象,只是所处的执行上下文阶段不同,活跃对象指的是哪个处于函数调用栈顶的变量对象
另: 函数表达式是不包含在 VO 对象中的
:::

### 补充:

​ **变量对象(Variable Object):**

1.建立 arguments 对象,检查当前上下文的参数,建立该对象下的属性,和属性值

2.检查 当前上下文函数声明,在变量对象中以函数名建立一个属性,属性值为指向该函数所在地址值的引用.若已存在,会被新的引用覆盖

3.检查变量声明,每找到一个变量声明,就会以变量名建立一个属性,属性值为 undefined.

### 执行上下文栈

```js
var a = 10,
    fn,
    bar = function () {
        var b = 5,
            fn(x + b)
    };
fn = function (y) {
	var c = 5;
    console.log(y + c);
}
bar(10);
```

**每次调用函数都会创建上下文环境,当函数调用完之后,上下文环境的数据就会销毁,但是处于活跃状态的上下文环境只有一个,这其实是一个压栈和出栈的过程,称之为执行上下文栈**

以上都是处于理想状态,但是有一种情况不会再函数执行完之后就销毁,其中就有闭包的产生

本来一个函数执行完就应该被销毁,但是如果这个函数内部的函数引用了他作用域中上下文环境中的变量

## 作用域

**定义:**

**引子:** 编程语言都有的能力储存变量---访问---修改,储存在哪?----怎么去找????------所有指定了一套良好的规则,来储存变量,方便访问查找,这套规则就是作用域.
:::tip

1. js 中没有块级作用域
2. 作用域和自由变量息息相关
   :::

```js
if (true) {
  var name = "tom";
}
console.log(name); // tom
```

- **作用域**
  - 我们将作用域定义为一套**规则,**这套规则规定了如何在当前作用域以及他嵌套的子作用域中根据**标识符**进行变量查找(在其创建的执行上下文环境中查找)
  - **作用**: 隔离变量,以免造成变量冲突
  - **怎样查找:** 在其创建变量的作用域中查找,也就是静态作用域.
- **作用域链:**
  - 有当前的执行环境和上层执行环境的一系列**变量对象**组成,它保证了当前执行环境对**符合访问权限**的变量和函数的**有序访问**

```js
JavaScript代码的执行过程分为两个阶段,
   1.  代码编译阶段
       	`词法分析
		语法分析
		可执行代码生成
		作用域规则确定`
   2.  代码执行阶段.
		`执行上下创建
		代码执行
		垃圾回收`
```

1. 执行环境有全局执行环境和函数执行环境之分;

2. 每次进入一个新的执行环境都会创建一个用于搜索变量和函数的作用域链;

3. 函数的局部环境不仅可以函数作用域中的环境,还可访问父环境,甚至是全局环境.

4. 但是全局环境只能访问全局环境,而不能访问局部环境中的变量;

5. 变量的执行环境有助于确定何时释放内存.

   - <u>js 是一门具有自动垃圾收集机制的编程语言.</u>

   离开作用域的值将被自动标记为可以回收,因此将在垃圾收集期间被删除.

   **作用:** ==作用域最大的用处就是隔离变量,不同作用域下同名变量不会有冲突.==

   **拓展:**

**静态作用域与动态作用域**

- 因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。
- 而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。

## this

本质上来说,在 js 里 this 是一个指向函数执行环境的指针.this 永远指向最后调用他的对象,并且在执行时才能获取值,

**在函数中 this 如何取值是在其`调用`的时候确定的,函数定义的时候确定不了**,this 得取值是上下文环境的一部分,每次调用函数,都会产生一个新的执行上下文环境.

1. 默认绑定
   - 直接通过函数名调用
   - this 就是 window.
2. 隐式绑定
   - obj.foo()
   - this 就是前面的这个对象.

### this 取值的四种情况

1. **构造函数**: 如果函数作为构造函数来用的,this 指的就是它即将 new 出来的对象.

```js
function Foo() {
   this.name = 'DustSmile';
    this.age = '20'

    console.log(this)  //Foo {name: Dustsmile, age: 20}
}
var fn1 = new Foo()
console.log(fn1.name); // Dustsmile
console.log(fn1.age);  //20

--如果在不是newFoo而是直接调用Foo--
Foo()  //this:  window
```

1. **函数作为对象的一个属性** :如果函数作为对象的一个属性,并且作为对象的一个**属性被调用时**,函数中的 this 指向该对象.

   如果函数独立调用,那么函数内部的 this 则指向 undefined,但是在**非严格模式**下他指向全局对象

   ```js
   var obj = {
     x: 10,
     fn: function () {
       console.log(this);
       console.log(this.x);
     },
   };
   var fn1 = obj.fn;
   fn1();

   //fn 函数被赋值给了一个新的变量,this不在指向原来的那个对象
   //所以this指向window   this.x 等于undefined
   ```

   3.**函数用 call 或者 apply 调用**

   - 是 JavaScript 内部提供的一种机制,所有函数都具有这两个方法,他们第一个参数都为 this 要指向的对象.其中 call 挨个传递,apply 是以数组的形式.

   ```js
   var obj = {
     x: 10,
   };
   var fn = function () {
     x: 22;
     console.log(this); // {x : 10;}
     console.log(this.x); //10;
   };
   fn.call(obj);
   ```

   4.**全局&调用普通函数**

   在全局环境下,this 永远指代 window.

   ```
   var obj = {
       x : 10,
       fn : function(){
           function f(){
               console.log(this);  	//window
               console.log(this.x); 	//undefined;
           }
           f();
       }
   };
   obj.fn();
   ```

### 补充:

​ \***\*this 丢失\*\***:

在函数调用的时候,并没有上下文对象,只是对函数的引用

### this 的应用场景

**【场景 1】全局环境中的 this 指向全局对象**

```js
this.a = 10;
alert(a); //10
b = 20;
alert(this.b); //20
var c = 30;
alert(this.c); //30
```

**【场景 2】对象内部函数的 this 指向调用函数的当前对象**

```js
var a = 10;
var bar = {
  a: 20,
  test: function () {
    alert(this.a);
  },
};
bar.test(); //20
```

**【场景 3】全局环境函数的 this 指向全局对象**

```js
var a = 10;
function foo() {
  alert(this.a);
}
foo(); //10
```

**【场景 4】匿名函数中的 this 指向全局对象**

```js
var a = 10;
var foo = {
  a: 20,
  fn: (function () {
    alert(this.a);
  })(),
};
foo.fn; //10
```

**【场景 5】setInterval 和 setTimeout 定时器中的 this 指向全局对象**

```js
var a = 10;
var oTimer1 = setInterval(function () {
  var a = 20;
  alert(this.a); //10
  clearInterval(oTimer1);
}, 100);
```

**【场景 6】eval 中的 this 指向调用上下文中的 this**

```js
(function () {
  eval("alert(this)"); //[object Window]
})();
function Foo() {
  this.bar = function () {
    eval("alert(this)"); //[object Object]
  };
}
var foo = new Foo();
foo.bar();
```

**【场景 7】构造函数中的 this 指向构造出的新对象**

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    alert(this.name);
  };
}
var p1 = new Person("lily", "20");
p1.sayName(); //'lily'
```

**【场景 8】new Function 中的 this 指向全局对象**

```js
(function () {
  var f = new Function("alert(this)");
  f(); //[object Window]
})();
function Foo() {
  this.bar = function () {
    var f = new Function("alert(this)");
    f(); //[object Window]
  };
}
var foo = new Foo();
foo.bar();
```

**【场景 9】apply 和 call 中的 this 指向参数中的对象**

```js
var a = 10;
var foo = {
  a: 20,
  fn: function () {
    alert(this.a);
  },
};
var bar = {
  a: 30,
};
foo.fn.apply(); //10(若参数为空，默认指向全局对象)
foo.fn.apply(foo); //20
foo.fn.apply(bar); //30
```

## 函数

1. 函数的声明

   - 作为赋值表达式的一部分,则他是函数表达式.
   - 如果是函数体的一部分则他是函数声明.
   - 函数声明也会提前,并且会优先于变量名如果变量名重复的话
   - **函数表达式和变量声明一样**

2. 函数的 arguments

   - 在非严格模式下,arguments 中的值会根据形参的变换而变化
   - 如果传入的实参长度大于形参的长度则会把多出来的保存在 arguments 里面

3. 未声明的变量

   - 如果一个变量直接进行赋值,则这个变量则直接会变为全局变量.

4. 构造函数其实也可以手动添加返回值

   1. 如果返回的是一个基本类型的数据 js 引擎会忽略这个返回自动返回 this.
   2. 如果返回的是一个对象,this 失效,使用的得这个返回值.

5. 函数中参数的传递

   - 本质上都是值传递

     - 基本类型

       ```js
       var num1 = 10 ;
       var num2 = num1;
       num += 2;
       console.log(num1) //10;
       console.log(num2)  //12
       num1将他自己的值克隆给num2,但是他们两者之间确实相互独立的.修改任何一个都不会影响另一个.
       ```

     - 对象类型

     - 判断一个变量是不是对象,值类型的判断用 typeof,引用类型的类型用 instanof.

       ```js
       1.
       var obj1= {
           name : "张三"
       };
       var obj2 = obj1;
       console.log(obj2.name) //张三
       obj2.name = "李四";
       console.log(obj1.name) = "李四";
       obj1 和 obj2 共同指向同一个对象,他们其中任何一个做出改动都会反映在另一个身上
       2.
       function seeName(obj){
           obj.name = "Bob";
           obj = new Object();
           obj.name = "Tom"
       }
       var person = new Object();
       setName(person);
       console.log(person.name)   // "Bob";

       创建的新对象person和obj指向的是同一个对象,当在函数内部重新创建一个对象时改变了obj的指向,但他是在函数内部引用的一个变量对象,会在执行立即销毁,所person还是指向原来的对象.
       ```

## 原型

- 每个函数都有一个属性叫做`prototype` .这个`prototype` 的属性是一个对象(_属性的集合_),默认的是一个叫做 constructor 的属性,指向这个函数本身.
- 所有的引用类型(包括数组/函数/对象)都有一个隐式原型\***\*proto\*\***

### 原型规则

1. 每个引用类型都有可拓展的属性({}.a, [].a, fn.a)
2. 每个引用类型都有隐式原型**proto**
3. 每个函数都有显示原型
4. 引用类型的隐式原型等于其构造函数的显示原型

### 手写一个原型继承的例子

```js
function Elem(el) {
  this.elem = document.querySelector(el);
}
Elem.prototype.html = function (val) {
  if (val) {
    this.elem.innerHTML = val;
    return this;
  } else {
    return this.elem.innerHTML;
  }
};

Elem.prototype.on = function (event, fn) {
  this.elem.addEventListener(event, fn);
};

var div = new Elem("gad1");
div.html("123213");
div.on("click", () => alert(123123));
```

```js
console.log(Object intanceof Function) //true
console.log(Function intanceof Object) //true
console.log(Function intanceof Function)  //true
```

<script setup>
import { withBase } from 'vitepress'

</script>
<img :src="withBase('/prototype.png')" />

### 原型链

-每个对象都会在其内部初始化一个属性，就是**proto**，当我们访问一个对象的属性 时，如果这个对象内部不存在这个属性，那么他就会去**proto**里找这个属性，这个**proto**又会有自己的**proto**，于是就这样 一直找下去，也就是我们平时所说的原型链的概念。

## 闭包

- **定义:** 当一个函数在他的作用域之外能够访问它的作用域,并在他的作用域外执行它时,这个函数就是一个闭包.**能够访问自由变量的函数**
  - **自由变量:** 在函数中能够使用的,但既不是函数的参数,也不是函数能够局部能够访问的变量
- **举个栗子 :** 函数 inner 在函数 outer 内部,本来在他的执行环境外时访问不了 他的但是通过把他赋值给全局变量或者是当做返回值.被他引用的变量也就不会进行垃圾回收.
- **闭包的产生:**
  - 执行上下文函数 outer,以及执行上下文中的函数 inner,inner 函数执行时并访问了 outer 中的变量对象的值,这个时候闭包就产生了
  - 闭包实在函数被调用执行的时候才被确认创建的
- **闭包与作用域**
  - 作用域分为定义作用域和执行作用域, 当闭包中用到自由变量的时候最先去找的是定义作用域

```js
var fn = null;
function foo() {
  var a = 2;
  function innnerFoo() {
    console.log(a);
  }
  fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
  fn(); // 此处的保留的innerFoo的引用
}

foo();
bar(); // 2
```

首先`foo()`在执行完之后将 innerFoo 赋值给了全局变量中的 fn,按照常理在在执行之后会被垃圾回收器回收,但由于赋值操作,innerFoo 的引用被保留了现在,它内部所引用的变量对象也被保留下来.所以在`bar()`函数执行的时候任然可以拿到变量 a 的值.

- **闭包的铺垫:**
  - 内存空间
  - 执行上下文
  - 垃圾回收机制

### 闭包的两种应用

- **函数作为返回值传递:**

- **函数作为参数传递**

  ```js
  var max = 10,
    fn = (function (x) {
      if (x > max) {
        console.log(x); //15
      }
    })(function (f) {
      var max = 100;
      f(15);
    })(fn);
  ```

  **必刷题:**

  ```js
  var data = [];
  for (var i = 0; i < 3; i++) {
    data[i] = function () {
      console.log(i);
    };
  }

  data[0]();
  data[1]();
  data[2]();
  ```

  在执行 data[0]中之前,此时的全局上下文为

  ```js
  globalContext = {
      VO: {
          data: [...]
          i: 3
      }
  }
  ```

  因为 js 没有块级作用域时, 函数内部在访问自由变量的时候就会去父级作用域查找,
  然后执行 data[0]的时候他的活动对象中没有 i 的值,只能去全局上下文中 VO 读取,所有输出会是 3

  **改成闭包:**

  ```js
  var data = [];

  for (var i = 0; i < 3; i++) {
    data[i] = (function (i) {
      return function () {
        console.log(i);
      };
    })(i);
  }

  data[0]();
  data[1]();
  data[2]();
  ```

  此时的作用域链发生了改变

  ```js
  data[0]Context = {
      Scope: [AO, 匿名函数Context.AO globalContext.VO]
  }

  匿名函数的执行上下文
  匿名函数Context = {
      AO: {
          arguments: {
              0: 0,
              length: 1
          },
          i: 0
      }
  }
  ```

## 内存空间

- **栈(stack):**
  - 先进后出,后进先出.(类似于**羽毛球筒**)
  - 执行上下文的顺序借用了栈数据结构的存取方式.
- **堆(heap):**
  - 是无序的(类似于**书架**,只要知道书名就可以拿到想要的书)
- **队列(queue):**
  - 先进先出(FIFO)--(类似于过安检,挨个执行)

## 事件轮循

![](F:\study\核心结构图\2. 事件循环.PNG)

当前执行栈

## 面向对象

### 什么是面向对象?

**1. 概念**
js 中能够表现面向对象的就是类, 相当于一个模板
**2. 三要素**

1. 继承: 子类继承父类
2. 封装: 数据的权限和保密

- protected: 受保护的属性只能自己和子类访问
- private: 只能自己访问

3. 多态: 同一接口不同实现, 保持子类的开放性和灵活性
   **3. 意义**
   数据结构化

## 创建对象的多种方式

#### 1.工厂模式

```
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');
```

缺点：对象无法识别，因为所有的实例都指向一个原型

#### 2 构造函数模式

```
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

var person1 = new Person('kevin');
```

优点：实例可以识别为一个特定的类型

缺点：每次创建实例时，每个方法都要被创建一次

#### 3 原型模式

```
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();
```

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

#### 4 组合模式

构造函数模式与原型模式双剑合璧。

```
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：该共享的共享，该私有的私有，使用最广泛的方式

缺点：有的人就是希望全部都写在一起，即更好的封装性

#### 5 寄生构造函数模式

```
function Person(name) {

    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;

}

var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
```

## 函数防抖节流

::: tip 概述

1.  什么是函数防抖节流?
2.  防抖节流的作用什么?
    :::

### 定义

**函数防抖**: 以周期为单位, 如果在周期内没有触发事件, 那么事件处理函数才会执行一次,
否则重新计时.

**函数节流**: 在周期内给你保证事件处理函数执行一次;

**区别**: 以远程搜索框为例, 防抖不管你输入多少关键字,他只在停止输入的最后给你执行周期函数,
然而节流是每隔一个周期给你执行一次, 不管你有没有结束搜索, 两者是动作上区别.防抖有个停下来的动作

#### 防抖函数封装

```js
/**
 * @param func 回调函数
 * @param delay 延迟执行时间
 * @returns {Function}
 */
export const debounce = (func, delay, immediate) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      callNow && func.apply(this, args);
    } else {
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  };
};
```

#### 节流函数

```js
export const throttle = (func, delay) => {
  let initDate = Date.now();
  return (...args) => {
    const nowTime = Date.now();
    if (nowTime - initDate > delay) {
      func.apply(this, args);
      initDate = nowTime;
    }
  };
};

let throttle = (fn, delay) => {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn(...args);
      flag = true;
    }, delay);
  };
};
```

## compose 函数

**介绍**: 将需要嵌套的函数进行平铺, 一个函数的返回值作为另一个函数的参数

```js
// let calculate = x => (x + 10) * 10
let add = (x) => x + 10;
let multiply = (y) => y * 10;

// let calculate  = x => multiply(add(x))

// console.log(calculate(10))

// let compose = (f, g) => x => f(g(x))

// let compose = (...args) => {
//     return (x) => {
//         return args.reduceRight((res, cb) => {
//             return cb(res)
//         }, x)
//     }
// }

let compose =
  (...args) =>
  (x) =>
    args.reduceRight((res, cb) => cb(res), x);

let calculate = compose(multiply, add);

console.log(calculate(10));
```

## 缓存函数

**介绍**: 缓存函数是指将上次的计算结果缓存起来, 当下次调用时, 如果遇到相同的参数, 就直接返回缓存中的数据

```js
let memorize = (func) => {
  let cache = {};
  return function () {
    let key = JSON.stringify(arguments);
    if (!cache[key]) {
      cache[key] = func.apply(this, arguments);
    }
    return cache[key];
  };
};
```

## 柯里化函数

1. **介绍**: 柯里化函数是一种使用多个参数的一个函数, 转换为一系列使用一个参数的函数的技术
2. **使用**:

```js
// 检测字符串中是否空格
let matching = (reg, str) => reg.test(str)
console.log(matching(/\s+/g, 'hello world'))
console.log(matching(/\s+/g, 'test_demo'))

// 使用柯里化进行处理
let curry = (reg) => (str) => reg.test(str)
let hasSpace = curry(/\s+/g')
```
