# JS 高级

## 数据类型的分类和判断

**分类(2大类)**

* 基本(值)类型
  * Number: 任意数值
  * String: 任意文本
  * Boolean: true/false
  * undefined: undefined
  * null: null
* 对象(引用)类型
  * Object: 一般对象类型
  * Array: 特别的对象类型(下标/内部数据有序)
  * Function: 特别的对象类型(可执行)

**判断**

* typeof:
  * 可以区别: 数值, 字符串, 布尔值, undefined, function
  * 不能判断: null与object  object与array
* instanceof
  * 专门用来判断对象数据的类型: Object, Array与Function
* ===
  * 可以判断: undefined和null

```js
  // typeof: 返回的是数据类型的字符串表达形式
  //1. 基本类型
  var a
  console.log(a, typeof a, a===undefined) // undefined 'undefined' true
  console.log(a===typeof a) // false

  a = 3
  console.log(typeof a === 'number')
  a = 'atguigu'
  console.log(typeof a === 'string')
  a = true
  console.log(typeof a === 'boolean')

  a = null
  console.log(a===null) // true
  console.log(typeof a) // 'object'

  console.log('--------------------------------')

  //2. 对象类型
  var b1 = {
    b2: [2, 'abc', console.log],
    b3: function () {
      console.log('b3()')
    }
  }
  console.log(b1 instanceof Object, typeof b1) // true 'object'
  console.log(b1.b2 instanceof Array, typeof b1.b2) // true 'object'
  console.log(b1.b3 instanceof Function, typeof b1.b3) // true 'function'

  console.log(typeof b1.b2[2]) // 'function'
  console.log(b1.b2[2]('abc')) // 'abc' undefined
```

### undefined与null的区别?

* undefined代表定义未赋值
* nulll定义并赋值了, 只是值为null

### 什么时候给变量赋值为null呢?

* 初始赋值, 表明将要赋值为对象
* 结束前, 让对象成为垃圾对象(被垃圾回收器回收)

### 严格区别变量类型与数据类型?

* 数据的类型
  * 基本类型
  * 对象类型
* 变量的类型(变量内存值的类型)
  * 基本类型: 保存就是基本类型的数据
  * 引用类型: 保存的是地址值

```js
  // 实例: 实例对象
  // 类型: 类型对象
  function Person (name, age) {// 构造函数  类型
    this.name = name
    this.age = age
  }
  var p = new Person('tom', 12) // 根据类型创建的实例对象

  // Person('jack', 12)

  // 1. undefined与null的区别?
  var a
  console.log(a)  // undefined
  a = null
  console.log(a) // null

  //起始
  var b = null  // 初始赋值为null, 表明将要赋值为对象
  //确定对象就赋值
  b = ['atguigu', 12]
  //最后
  b = null // 让b指向的对象成为垃圾对象(被垃圾回收器回收)
  // b = 2

  var c = function () {

  }

  console.log(typeof c) // 'function'
```

## 数据,变量, 内存的理解

* 什么是数据?
  * 在内存中可读的, 可传递的保存了特定信息的'东东'，本质就是0101二进制
  * 数据的特点: 可传递, 可运算
  * 一切皆数据, 函数也是数据
  * 在内存中的所有操作的目标: 数据
    * 算术运算
    * 逻辑运算
    * 赋值
    * 调用函数传参（**形参本质就是变量，实参本质就是数据**）
* 什么是变量?
  * 在程序运行过程中它的值是允许改变的量, 由变量名和变量值组成
  * 每个变量都对应的一块小内存, 变量名用来查找对应的内存, 变量值就是内存中保存的数据
* 什么是内存?
  * 内存条通电后产生的存储空间(临时的)
  * 内存产生和死亡: 内存条(电路版)==>通电==>产生内存空间==>存储数据==>处理数据==>断电==>内存空间和数据都消失
  * 内存的空间是临时的, 而硬盘的空间是持久的
  * 分配内存: 声明变量和函数或创建对象时, JS引擎会自动为此分配一定大小的内存来存放对应的数据
  * 释放内存: 清空内存中的数据, 标识内存可以再分配使用(内存不释放就不能复用)
    * 自动释放: 栈空间的局部变量
    * 垃圾回调器回调: 堆空间的垃圾对象  
  * 一块内存包含2个方面的数据
    * 内部存储的数据(一般数据/地址数据)
    * 地址值数据
  * 内存空间的分类
    * 栈空间: 全局变量和局部变量 (空间较小)
    * 堆空间: 对象  (空间较大)
* 内存,数据, 变量三者之间的关系
  * 内存是容器, 用来存储不同数据
  * 变量是内存的标识, 通过变量我们可以操作(读/写)内存中的数据  

### var a = xxx, a内存中到底保存的是什么?

* xxx是基本数据, 保存的就是这个数据
* xxx是对象, 保存的是对象的地址值
* xxx是一个变量, 保存的xxx的内存内容(可能是基本数据, 也可能是地址值)

### 关于引用变量赋值问题

* 2个引用变量指向同一个对象, 通过一个变量修改对象内部数据, 另一个变量看到的是修改之后的数据
* 2个引用变量指向同一个对象, 让其中一个引用变量指向另一个对象, 另一引用变量依然指向前一个对象

```js
  // 这里obj1和obj2存储的栈地址相同，同时指向同一条数据
  var obj1 = {name: 'Tom'}
  var obj2 = obj1
  obj2.age = 12
  console.log(obj1.age)  // 12
  // 这里obj为形参，传入的为数据，在函数内部修改了数据，所以指向该数据的内存的对象值随着变化
  function fn (obj) {
    obj.name = 'A'
  }
  fn(obj1)
  console.log(obj2.name) //A


  // 这里一开始a和b的内存地址一样，但是a重新赋值后，会重新为a分配栈内存和堆内存，所以a和b指向的数据不一样
  var a = {age: 12}
  var b = a
  a = {name: 'BOB', age: 13}//重新赋值
  b.age = 14
  console.log(b.age, a.name, a.age) // 14 Bob 13

  function fn2 (obj) {
    obj = {age: 15}
  }
  fn2(a)

  console.log(a.age) // 13 
```

### 在js调用函数时传递变量参数时, 是值传递还是引用传递

* 理解1: 都是值(基本/地址值)传递
* 理解2: 可能是值传递, 也可能是引用传递(地址值)

```js
  var a = 3
  function fn (a) {
    a = a +1
  }
  fn(a)
  console.log(a)//3

  function fn2 (obj) {
    console.log(obj.name)
  }
  var obj = {name: 'Tom'}
  fn2(obj)//Tom
```

### JS引擎如何管理内存?

  1. 内存生命周期
    * 分配小内存空间, 得到它的使用权
    * 存储数据, 可以反复进行操作
    * 释放小内存空间
  2. 释放内存
    * 局部变量: 函数执行完自动释放  
    * 对象: 成为垃圾对象==>垃圾回收器回收

## 对象的理解和使用

* 什么是对象?
  * 多个数据(属性)的集合
  * 用来保存多个数据(属性)的容器
* 属性组成:
  * 属性名 : 字符串(标识)
  * 属性值 : 任意类型
* 属性的分类:
  * 一般 : 属性值不是function  描述对象的状态
  * 方法 : 属性值为function的属性  描述对象的行为
* 特别的对象
  * 数组: 属性名是0,1,2,3之类的索引
  * 函数: 可以执行的
* 如何操作内部属性(方法)
  * .属性名，编码简单, 但有时不能用
  * ['属性名']: 编码麻烦, 但通用。属性名有特殊字符/属性名是一个变量

### 什么时候必须使用['属性名']的方式?

  1. 属性名包含特殊字符: - 空格
  2. 属性名不确定

```js
  var p = {}
  //1. 给p对象添加一个属性: content type: text/json
  // p.content-type = 'text/json' //不能用
  p['content-type'] = 'text/json'
  console.log(p['content-type'])

  //2. 属性名不确定
  var propName = 'myAge'
  var value = 18
  // p.propName = value //不能用
  p[propName] = value
  console.log(p[propName])
```

## 函数的理解和使用

* 什么是函数?
  * 用来实现特定功能的, n条语句的封装体
  * 只有函数类型的数据是可以执行的, 其它的都不可以
* 函数也是对象
  * instanceof Object===true
  * 函数有属性: prototype
  * 函数有方法: call()/apply()
  * 可以添加新的属性/方法
* 为什么要用函数?
  * 提高复用性
  * 便于阅读交流
* 如何定义函数?
  * 函数声明
  * 表达式
    ```js
    function fn1 () { //函数声明
      console.log('fn1()')
    }
    var fn2 = function () { //表达式
      console.log('fn2()')
    }

    fn1()
    fn2()

    var obj = {}
    function test2 () {
      this.xxx = 'atguigu'
    }
    // obj.test2()  不能直接, 根本就没有
    test2.call(obj) // obj.test2()   // 可以让一个函数成为指定任意对象的方法进行调用
    console.log(obj.xxx)
    ```
* 函数的3种不同角色
  * 一般函数 : 直接调用
  * 构造函数 : 通过new调用
  * 对象 : 通过.调用内部的属性/方法
* 函数中的this
  * 显式指定谁: obj.xxx()
  * 通过call/apply指定谁调用: xxx.call(obj)
  * 不指定谁调用: xxx()  : window
  * 回调函数: 看背后是通过谁来调用的: window/其它
* 如何调用(执行)函数?
  * test(): 直接调用
  * obj.test(): 通过对象调用
  * new test(): new调用
  * test.call/apply(obj): 临时让test成为obj的方法进行调用
* 匿名函数自调用:
  ```js
  (function(w, obj){
    //实现代码
  })(window, obj)
  ```
  * 专业术语为: IIFE (Immediately Invoked Function Expression) 立即调用函数表达式
    ```js
    (function () { //匿名函数自调用
      var a = 3
      console.log(a + 3)
    })()
    var a = 4
    console.log(a)

    ;(function () {
      var a = 1
      function test () {
        console.log(++a)
      }
      window.$ = function () { // 向外暴露一个全局函数
        return {
          test: test
        }
      }
    })()

    $().test() // 1. $是一个函数 2. $执行后返回的是一个对象
    ```
* 回调函数的理解
  * 什么函数才是回调函数?
    * 你定义的
    * 你没有调用
    * 但它最终执行了(在一定条件下或某个时刻)
  * 常用的回调函数
    * dom事件回调函数
    * 定时器回调函数
    * ajax请求回调函数(后面讲解)
    * 生命周期回调函数(后面讲解)
  
### this是什么?

* 任何函数本质上都是通过某个对象来调用的,如果没有直接指定就是window
* 所有函数内部都有一个变量this
* 它的值是调用函数的当前对象

### 如何确定this的值?

* test(): window
* p.test(): p
* new test(): 新创建的对象
* p.call(obj): obj