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
  * 显式指定谁: obj.xxx()  obj
  * 通过call/apply指定谁调用: xxx.call(obj)  obj
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

## 原型与原型链

* 所有函数都有一个特别的属性:
  * `prototype` : 显式原型属性
  * 显式原型属性默认指向一个Object空对象(即称为: 原型对象)
  * 原型对象中有一个属性constructor, 它指向函数对象
  * **函数的原型对象的构造函数，指向该函数对象** Fun.prototype.constructor===Fun
  * **实例对象的隐式原型指向其构造函数的显式原型** fun.__proto__ == Fun.prototype
* 所有实例对象都有一个特别的属性:
  * `__proto__` : 隐式原型属性
  * [[prototype]]和__proto__意义相同，均表示对象的内部属性，其值指向对象原型
* 显式原型与隐式原型的关系
  * 函数的prototype: 定义函数时被自动赋值, 值默认为{}, 即用为原型对象
  * 实例对象的__proto__: 在创建实例对象时被自动添加, 并赋值为构造函数的prototype值
  * 程序员能直接操作显式原型, 但不能直接操作隐式原型(ES6之前)
  * 原型对象即为当前实例对象的父对象
* 原型链
  * 别名: 隐式原型链
  * 作用: 查找对象的属性(方法)
  * 访问一个对象的属性时，
    * 先在自身属性中查找，找到返回
    * 如果没有, 再沿着__proto__这条链向上查找, 找到返回
    * 如果最终没找到, 返回undefined
  * 所有的实例对象都有__proto__属性, 它指向的就是原型对象
  * 这样通过__proto__属性就形成了一个链的结构---->原型链
  * 当查找对象内部的属性/方法时, js引擎自动沿着这个原型链查找
  * 当给对象属性赋值时不会使用原型链, 而只是在当前对象中进行操作

* 原型  

```js
  // 每个函数都有一个prototype属性, 它默认指向一个Object空对象(即称为: 原型对象)
  console.log(Date.prototype, typeof Date.prototype)
  function Fun () {//alt + shift +r(重命名rename)

  }
  console.log(Fun.prototype)  // 默认指向一个Object空对象(没有我们的属性)

  // 原型对象中有一个属性constructor, 它指向函数对象
  console.log(Date.prototype.constructor===Date)
  console.log(Fun.prototype.constructor===Fun) // true， 函数的原型对象的构造函数，指向该函数对象

  //给原型对象添加属性(一般是方法) ===>实例对象可以访问
  Fun.prototype.test = function () {
    console.log('test()')
  }
  var fun = new Fun()
  console.log(fun.__proto__ == Fun.prototype); // true，实例对象的隐式原型指向其构造函数的显式原型
  fun.test()
```

* 显式原型和隐式原型

```js
  //定义构造函数
  function Fn() {   // 内部语句: this.prototype = {}

  }
  // 1. 每个函数function都有一个prototype，即显式原型属性, 默认指向一个空的Object对象
  console.log(Fn.prototype)
  // 2. 每个实例对象都有一个__proto__，可称为隐式原型
  //创建实例对象（将该实例对象的隐式原型指向该构造函数的显式原型）
  var fn = new Fn()  // 内部语句: this.__proto__ = Fn.prototype
  console.log(fn.__proto__)
  // 3. 对象的隐式原型的值为其对应构造函数的显式原型的值
  console.log(Fn.prototype===fn.__proto__) // true
  //给原型添加方法
  Fn.prototype.test = function () {
    console.log('test()')
  }
  //通过实例调用原型的方法
  fn.test()
```

* 原型链

```js
  // console.log(Object)
  //console.log(Object.prototype)
  console.log(Object.prototype.__proto__) //null
  function Fn() {
    this.test1 = function () {
      console.log('test1()')
    }
  }
  console.log(Fn.prototype)// {test2: f(), constructor: f Fn(), [[prototype]]: Object}
  Fn.prototype.test2 = function () {
    console.log('test2()')
  }
  console.log(Fn.prototype)// {test2: f(), constructor: f Fn(), [[prototype]]: Object}

  var fn = new Fn()
  console.log(fn.__proto__)// 输出内容和Fn.prototype一样, 因为fn.__proto__ == Fn.prototype
  console.log(fn)// {test1: f(), [[prototype]] {test2: f(), constructor: f Fn(), [[prototype]]: Object}}

  fn.test1()//test1()
  fn.test2()//test2()
  console.log(fn.toString()) //[object Object]
  console.log(fn.test3) // undefined
  // fn.test3()


  /*
  1. 函数的显示原型指向的对象默认是空Object实例对象(但Object不满足)
   */
  console.log(Fn.prototype instanceof Object) // true
  console.log(Object.prototype instanceof Object) // false
  console.log(Function.prototype instanceof Object) // true
  /*
  2. 所有函数都是Function的实例(包含Function)
  */
  console.log(Function.__proto__===Function.prototype)
  /*
  3. Object的原型对象是原型链尽头
   */
  console.log(Object.prototype.__proto__) // null
```

* 原型链和属性问题
  1. 读取对象的属性值时: 会自动到原型链中查找
  2. 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值
  3. 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上

```js
  function Fn() {

  }
  Fn.prototype.a = 'xxx'

  // 1. 读取对象的属性值时: 会自动到原型链中查找
  var fn1 = new Fn()
  console.log(fn1.a, fn1)// xxx Fn{[[prototype]]{a:xxx, constructor: f Fn(), [[prototype]]: Object}}

  // 2. 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值
  var fn2 = new Fn()
  fn2.a = 'yyy'
  console.log(fn1.a, fn2.a, fn2)// xxx yyy Fn{a:yyy, [[prototype]]{a:'xxx', constructor: f Fn() [[prototype]]: Object}}

  function Person(name, age) {
    this.name = name
    this.age = age
  }
  Person.prototype.setName = function (name) {
    this.name = name
  }

  // 3. 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上
  var p1 = new Person('Tom', 12)
  p1.setName('Bob')
  console.log(p1)//Person {name:Bob,age:12, [[prototype]] {setName: f(name), constructor: f Person(name, age), [[prototype]]: Object }}

  var p2 = new Person('Jack', 12)
  p2.setName('Cat')
  console.log(p2)
  console.log(p1.__proto__===p2.__proto__) // true
```

* instanceof
  * instanceof是如何判断的?
    * 表达式: A instanceof B
    * 如果B函数的显式原型对象在A对象的原型链上, 返回true, 否则返回false
  * Function是通过new自己产生的实例

```js
  /*
  案例1
   */
  function Foo() {  }
  var f1 = new Foo()
  console.log(f1 instanceof Foo) // true
  console.log(f1 instanceof Object) // true

  /*
  案例2
   */
  console.log(Object instanceof Function) // true
  console.log(Object instanceof Object) // true
  console.log(Function instanceof Function) // true
  console.log(Function instanceof Object) // true

  function Foo() {}
  console.log(Object instanceof  Foo) // false
```

* 测试题

```js
  /*
  测试题1
   */
  function A () {

  }
  A.prototype.n = 1
  console.log(A.prototype)//{n:1, constructor: f A(), [[prototype]]: Object}

  var b = new A()
  console.log(b)//{[[prototype]]: {n:1, constructor: f A(), [[prototype]]: Object}}

  A.prototype = {
    n: 2,
    m: 3
  }
  console.log(A.prototype)//{m:3, n:2, [[prototype]]: Object}

  var c = new A()
  console.log(c)//{m:3, n:2, [[prototype]]: Object}

  console.log(b.n, b.m, c.n, c.m)//1 undefined 2 3

  /*
   测试题2
   */
  function F (){}
  Object.prototype.a = function(){
    console.log('a()')
  }
  Function.prototype.b = function(){
    console.log('b()')
  }
  
  var f = new F()
  f.a()//a()
  // f.b()//找不到b
  F.a()//a()
  F.b()//b()
  console.log(f)
  console.log(F.prototype)
  console.log(Object.prototype)
  console.log(Function.prototype)
```

## 执行上下文与执行上下文栈

* 变量提升与函数提升
  * 变量提升:
    * 通过var定义(声明)的变量, 在定义语句之前就可以访问到
    * 值: undefined
  * 函数提升:
    * 通过function声明的函数, 在之前就可以直接调用
    * 值: 函数定义(对象)
  * 先有变量提升, 再有函数提升
* 执行上下文
  * 理解
    * 执行上下文: 由js引擎自动创建的对象, 包含对应作用域中的所有变量属性
    * 执行上下文栈: 用来管理产生的多个执行上下文
  * 分类:
    * 全局: window
    * 函数: 对程序员来说是透明的
  * 生命周期
    * 全局 : 准备执行全局代码前产生, 当页面刷新/关闭页面时死亡
    * 函数 : 调用函数时产生, 函数执行完时死亡
  * 全局执行上下文
    * 在执行全局代码前将window确定为全局执行上下文
    * 对全局数据进行预处理
      * var定义的全局变量==>undefined, 添加为window的属性
      * function声明的全局函数==>赋值(fun), 添加为window的方法
      * this==>赋值(window)
    * 开始执行全局代码
  * 函数执行上下文
    * 在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象(虚拟的, 存在于栈中)
    * 对局部数据进行预处理
      * 形参变量==>赋值(实参)==>添加为执行上下文的属性
      * arguments==>赋值(实参列表), 添加为执行上下文的属性
      * var定义的局部变量==>undefined, 添加为执行上下文的属性
      * function声明的函数 ==>赋值(fun), 添加为执行上下文的方法
      * this==>赋值(调用函数的对象)
    * 开始执行函数体代码
* 执行上下文栈
  栈：后进先出  
  队列：先进先出
  1. 在全局代码执行前, JS引擎就会创建一个栈来存储管理所有的执行上下文对象
  2. 在全局执行上下文(window)确定后, 将其添加到栈中(压栈)
  3. 在函数执行上下文创建后, 将其添加到栈中(压栈)
  4. 在当前函数执行完后,将栈顶的对象移除(出栈)
  5. 当所有的代码执行完后, 栈中只剩下window

* 变量提升和函数提升

```js
  var a = 3
  function fn () {
    console.log(a)
    var a = 4
  }
  fn()//undefined

  console.log(b) //undefined  变量提升
  fn2() //可调用  函数提升
  // fn3() //不能  变量提升,undefined

  var b = 3
  function fn2() {
    console.log('fn2()')
  }

  var fn3 = function () {
    console.log('fn3()')
  }

  // * 先有变量提升, 再有函数提升
  console.log(c)//c()
  var c = 4;
  function c(){
    console.log("c");
  }
  console.log(c)//4

  console.log(d)//d()
  function d(){
    console.log("d");
  }
  var d = 4;
  console.log(d)//4
```

* 执行上下文栈

```js
  var a = 10
  var bar = function (x) {
    var b = 5
    foo(x + b)
  }
  var foo = function (y) {
    var c = 5
    console.log(a + c + y)
  }
  bar(10)//30

/*   foo:
  y 15
  c 5
  a+c+y 10+5+15=30

  bar:
  x 10
  b 5
  x+b 10+5=15

  global:
  a 10
  bar function
  foo function */
```

1. 依次输出什么?
2. 整个过程中产生了几个执行上下文?  

```js
  console.log('gb: '+ i)
  var i = 1
  foo(1)
  function foo(i) {
    if (i == 4) {
      return
    }
    console.log('fb:' + i)
    foo(i + 1) //递归调用: 在函数内部调用自己
    console.log('fe:' + i)
  }
  console.log('ge: ' + i)
/* 
  foo:
  i:4

  foo:
  i:3
  console.log('fb:' + i)
  i+1=4
  console.log('fe:' + i)

  foo:
  i:2
  console.log('fb:' + i)
  i+1=3
  console.log('fe:' + i)

  foo:
  i:1
  console.log('fb:' + i)
  i+1=2
  console.log('fe:' + i)


  global:
  i:1
  foo:function
  console.log('ge: ' + i)
 */

/*   1. 依次输出什么?
    gb: undefined
    fb: 1
    fb: 2
    fb: 3
    fe: 3
    fe: 2
    fe: 1
    ge: 1
  2. 整个过程中产生了几个执行上下文?  5 */
```

```js
  /*
   测试题1:  先执行变量提升, 再执行函数提升
   */
  function a() {}
  var a
  console.log(typeof a) // 'function'


  /*
   测试题2:
   */
  if (!(b in window)) {
    var b = 1
  }
  console.log(b) // undefined

  /*
   测试题3:
   */
  var c = 1
  function c(c) {
    console.log(c)
    var c = 3
  }
  c(2) // 报错

```

## 作用域与作用域链

* 理解:
  * 作用域: 一块代码区域, 在编码时就确定了, 不会再变化
  * 作用域链: 多个嵌套的作用域形成的由内向外的结构, 用于查找变量
* 分类:
  * 全局
  * 函数
  * js没有块作用域(在ES6之前)
* 作用
  * 作用域: 隔离变量, 可以在不同作用域定义同名的变量不冲突
  * 作用域链: 查找变量
* 区别作用域与执行上下文
  * 作用域: 静态的, 编码时就确定了(不是在运行时), 一旦确定就不会变化了
  * 执行上下文: 动态的, 执行代码时动态创建, 当执行结束消失
  * 联系: 执行上下文环境是在对应的作用域中的
* 作用域与执行上下文
  * 区别1
    * 全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了。而不是在函数调用时
    * 全局执行上下文环境是在全局作用域确定之后, js代码马上执行之前创建
    * 函数执行上下文是在调用函数时, 函数体代码执行之前创建
  * 区别2
    * 作用域是静态的, 只要函数定义好了就一直存在, 且不会再变化
    * 执行上下文是动态的, 调用函数时创建, 函数调用结束时就会自动释放
  * 联系
    * 执行上下文(对象)是从属于所在的作用域
    * 全局上下文环境==>全局作用域
    * 函数上下文环境==>对应的函数使用域
* 作用域链
  * 理解
    * 多个上下级关系的作用域形成的链, 它的方向是从下向上的(从内到外)
    * 查找变量时就是沿着作用域链来查找的
  * 查找一个变量的查找规则
    * 在当前作用域下的执行上下文中查找对应的属性, 如果有直接返回, 否则进入2
    * 在上一级作用域的执行上下文中查找对应的属性, 如果有直接返回, 否则进入3
    * 再次执行2的相同操作, 直到全局作用域, 如果还找不到就抛出找不到的异常

```js
  var a = 10,
    b = 20
  function fn(x) {
    var a = 100,
      c = 300;
    console.log('fn()', a, b, c, x)
    function bar(x) {
      var a = 1000,
        d = 400
      console.log('bar()', a, b, c, d, x)
    }

    bar(100)
    bar(200)
  }
  fn(10)
  /* 
    fn() 100 20 300 10
    bar() 1000 20 300 400 100
    bar() 1000 20 300 400 200
   */
```

```js
  var x = 10;
  function fn() {
    console.log(x);
  }
  function show(f) {
    var x = 20;
    f();
  }
  show(fn);//fn在全局环境中，不在show中，访问全局变量
  // 10
```

```js
  var fn = function () {
    console.log(fn)
  }
  fn()//f(){console.log(fn)}

  var obj = {
    fn2: function () {
     console.log(fn2)
     //console.log(this.fn2)
    }
  }
  obj.fn2()
```

## 闭包

* 理解:
  * 当嵌套的内部函数引用了外部函数的变量时就产生了闭包
  * 通过chrome工具得知: 闭包本质是内部函数中的一个对象, 这个对象中包含引用的变量属性
* 作用:
  * 延长局部变量的生命周期，使用函数内部的变量在函数执行完后, 仍然存活在内存中
  * 让函数外部能操作内部的局部变量
  * 问题:
    1. 函数执行完后, 函数内部声明的局部变量是否还存在?  一般是不存在, 存在于闭中的变量才可能存在
    2. 在函数外部能直接访问函数内部的局部变量吗? 不能, 但我们可以通过闭包让外部操作它
* 产生闭包的条件?
  * 函数嵌套
  * 内部函数引用了外部函数的数据(变量/函数)
* 常见的闭包
  1. 将函数作为另一个函数的返回值
  2. 将函数作为实参传递给另一个函数调用
* 闭包应用:
  * 模块化: 封装一些数据以及操作数据的函数, 向外暴露一些行为
  * 循环遍历加监听
  * JS框架(jQuery)大量使用了闭包
* 缺点:
  * 变量占用内存的时间可能会过长
  * 可能导致内存泄露
  * 能不用闭包就不用
  * 解决:
    * 及时释放 : f = null; //让内部函数对象成为垃圾对象

常见的闭包

```js
// 1. 将函数作为另一个函数的返回值
function fn1() {
  //此时闭包就已经产生了(函数提升, 内部函数对象已经创建了)
  var a = 2
  function fn2() {
    a++
    console.log(a)
  }
  return fn2
}
var f = fn1()
f() // 3
f() // 4
f = null //闭包死亡(包含闭包的函数对象成为垃圾对象)

// 2. 将函数作为实参传递给另一个函数调用
function showDelay(msg, time) {
  setTimeout(function () {
    alert(msg)
  }, time)
}
showDelay('测试', 2000)
```

* 闭包的应用 - 定义JS模块  
  * 具有特定功能的js文件
  * 将所有的数据和功能都封装在一个函数内部(私有的)
  * 只向外暴露一个包信n个方法的对象或函数
  * 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能

```js
// module.js
function myModule() {
  //私有数据
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing () {
    console.log('doOtherthing() '+msg.toLowerCase())
  }

  //向外暴露对象(给外部使用的方法)
  return {
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
}
// page.js
var module = myModule()
module.doSomething()
module.doOtherthing()
```

```js
// module.js
(function () {
  //私有数据
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing () {
    console.log('doOtherthing() '+msg.toLowerCase())
  }

  //向外暴露对象(给外部使用的方法)
  window.myModule2 = {
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
})()

// page.js
myModule2.doSomething()
myModule2.doOtherthing()
```

测试  

```js
  //代码片段一
  var name = "The Window";
  var object = {
    name : "My Object",
    getNameFunc : function(){
      return function(){
        return this.name;
      };
    }
  };
  alert(object.getNameFunc()());  //  the window


  //代码片段二
  var name2 = "The Window";
  var object2 = {
    name2 : "My Object",
    getNameFunc : function(){
      var that = this;
      return function(){
        return that.name2;
      };
    }
  };
  alert(object2.getNameFunc()()); //  my object
```

```js
  function fun(n,o) {
    console.log(o)
    return {
      fun:function(m){
        return fun(m,n)
      }
    }
  }
  var a = fun(0) // n = 0; o = undefined;  console.log(o); a = { fun: function(m){  return fun(m,n) } }
  a.fun(1) // m =  1; n = 0; => n = 1; o = 0; console.log(o);
  a.fun(2) // m = 2; n = 0; =>  n = 2; o = 0; console.log(o);
  a.fun(3) // m = 3; n = 0; =>  n = 3; o = 0; console.log(o);
  /* 
    undefined
    0
    0
    0
   */

  var b = fun(0).fun(1).fun(2).fun(3) //undefined 0 1 2 
  //  fun(0): n = 0; o = unfined; console.log(o);  return { fun: function(m){  return fun(m,n) } }
  // fun(1): m = 1; n = 0; console.log(o); return fun(m,n)
  // fun(2): m = 2; n =; console.log(o);

  var c = fun(0).fun(1)
  c.fun(2)
  c.fun(3)
```

## js中分号问题

```js
  /* 
  1. js一条语句的后面可以不加分号
  2. 是否加分号是编码风格问题, 没有应该不应该，只有你自己喜欢不喜欢
  3. 在下面2种情况下不加分号会有问题
    * 小括号开头的前一条语句
    * 中方括号开头的前一条语句
  4. 解决办法: 在行首加分号
  5. 强有力的例子: vue.js库
  6. 知乎热议: https://www.zhihu.com/question/20298345 
  */
  var a = 3
  ;(function () {

  })()
  /*
   错误理解
   var a = 3(function () {

   })();
  */

  var b = 4
  ;[1, 3].forEach(function () {

  })
  /*
  错误理解
   var b = 4[3].forEach(function () {

   })
   */
```

## 内存溢出与内存泄露

* 内存溢出
  * 一种程序运行出现的错误
  * 当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误
* 内存泄露
  * 占用的内存没有及时释放
  * 内存泄露积累多了就容易导致内存溢出
  * 常见的内存泄露:
    * 意外的全局变量
    * 没有及时清理的计时器或回调函数
    * 闭包

```js
  // 1. 内存溢出
  var obj = {}
  for (var i = 0; i < 10000; i++) {
    obj[i] = new Array(10000000)
    console.log('-----')
  }

  // 2. 内存泄露
    // 意外的全局变量
  function fn() {
    a = new Array(10000000)
    console.log(a)
  }
  fn()

   // 没有及时清理的计时器或回调函数
  var intervalId = setInterval(function () { //启动循环定时器后不清理
    console.log('----')
  }, 1000)

  // clearInterval(intervalId)

  // 闭包
  function fn1() {
    var a = 4
    function fn2() {
      console.log(++a)
    }
    return fn2
  }
  var f = fn1()
  f()

  // f = null
```

## 对象的创建模式

* Object构造函数模式
  * 套路: 先创建空Object对象, 再动态添加属性/方法
  * 适用场景: 起始时不确定对象内部数据
  * 问题: 语句太多

  ```js
    // 先创建空Object对象
    var p = new Object()
    p = {} //此时内部数据是不确定的
    // 再动态添加属性/方法
    p.name = 'Tom'
    p.age = 12
    p.setName = function (name) {
      this.name = name
    }
  ```

* 对象字面量模式
  * 套路: 使用{}创建对象, 同时指定属性/方法
  * 适用场景: 起始时对象内部数据是确定的
  * 问题: 如果创建多个对象, 有重复代码

  ```js
  var obj = {
    name : 'Tom',
    setName : function(name){this.name = name}
  }
  ```

* 工厂模式
  * 套路: 通过工厂函数动态创建对象并返回
  * 适用场景: 需要创建多个对象
  * 问题: 对象没有一个具体的类型, 都是Object类型

  ```js
    function createPerson(name, age) { //返回一个对象的函数===>工厂函数
      var obj = {
        name: name,
        age: age,
        setName: function (name) {
          this.name = name
        }
      }
      return obj
    }

    // 创建2个人
    var p1 = createPerson('Tom', 12)
    var p2 = createPerson('Bob', 13)
  ```

* 自定义构造函数模式
  * 套路: 自定义构造函数, 通过new创建对象
  * 适用场景: 需要创建多个类型确定的对象
  * 问题: 每个对象都有相同的数据, 浪费内存

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.setName = function(name){this.name=name;};
  }
  new Person('tom', 12);
  ```

* 构造函数+原型的组合模式
  * 套路: 自定义构造函数, 属性在函数中初始化, 方法添加到原型上
  * 适用场景: 需要创建多个类型确定的对象

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.setName = function(name){this.name=name;};
  new Person('tom', 12);
  ```

### new一个对象背后做了些什么?

* 创建一个空对象
* 给对象设置__proto__, 值为构造函数对象的prototype属性值   this.__proto__ = Fn.prototype
* 执行构造函数体(给对象添加属性/方法)

## 继承模式

* 原型链继承 : 得到方法
  1. 套路
      1. 定义父类型构造函数
      2. 给父类型的原型添加方法
      3. 定义子类型的构造函数
      4. 创建父类型的对象赋值给子类型的原型
      5. 将子类型原型的构造属性设置为子类型
      6. 给子类型原型添加方法
      7. 创建子类型的对象: 可以调用父类型的方法
  2. 关键
      1. 子类型的原型为父类型的一个实例对象

  ```js
    function Parent(){}
    Parent.prototype.test = function(){};
    function Child(){}
    Child.prototype = new Parent(); // 子类型的原型指向父类型实例
    Child.prototype.constructor = Child //让子类型的原型的constructor指向子类型
    var child = new Child(); //有test()
  ```

* 借用构造函数 : 得到属性
  1. 套路:
      1. 定义父类型构造函数
      2. 定义子类型构造函数
      3. 在子类型构造函数中调用父类型构造
  2. 关键:
      1. 在子类型构造函数中通用call()调用父类型构造函数

```js
  function Parent(xxx){
    this.xxx = xxx
  }
  Parent.prototype.test = function(){};
  function Child(xxx,yyy){
      Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
  }
  var child = new Child('a', 'b');  //child.xxx为'a', 但child没有test()
```

* 组合继承
  1. 利用原型链实现对父类型对象的方法继承
  2. 利用super()借用父类型构建函数初始化相同属性

```js
function Parent(xxx){
  this.xxx = xxx
}
Parent.prototype.test = function(){};
function Child(xxx,yyy){
    Parent.call(this, xxx);//借用构造函数   this.Parent(xxx)
}
Child.prototype = new Parent(); //得到test()
var child = new Child(); //child.xxx为'a', 也有test()
```

## 线程与进程

1. 进程：程序的一次执行, 它占有一片独有的内存空间
2. 线程： CPU的基本调度单位, 是程序执行的一个完整流程
3. 进程与线程
    * 一个进程中一般至少有一个运行的线程: 主线程
    * 一个进程中也可以同时运行多个线程, 我们会说程序是多线程运行的
    * 一个进程内的数据可以供其中的多个线程直接共享
    * 多个进程之间的数据是不能直接共享的
4. 浏览器运行是单进程还是多进程?
    * 有的是单进程
      * firefox
      * 老版IE
    * 有的是多进程
      * chrome
      * 新版IE
5. 如何查看浏览器是否是多进程运行的呢?
    * 任务管理器==>进程
6. 浏览器运行是单线程还是多线程?
    * 都是多线程运行的

## 浏览器内核模块组成

* 主线程
  * js引擎模块 : 负责js程序的编译与运行
  * html,css文档解析模块 : 负责页面文本的解析
  * DOM/CSS模块 : 负责dom/css在内存中的相关处理 
  * 布局和渲染模块 : 负责页面的布局和效果的绘制(内存中的对象)
* 分线程
  * 定时器模块 : 负责定时器的管理
  * DOM事件模块 : 负责事件的管理
  * 网络请求模块 : 负责Ajax请求

## 定时器问题

* 定时器并不真正完全定时
* 如果在主线程执行了一个长时间的操作, 可能导致延时才处理

## js线程

* js是单线程执行的(回调函数也是在主线程)
* H5提出了实现多线程的方案: Web Workers
* 只能是主线程更新界面

1. 如何证明js执行是单线程的?
    * setTimeout()的回调函数是在主线程执行的
    * 定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行
2. 为什么js要用单线程模式, 而不用多线程模式?
    * JavaScript的单线程，与它的用途有关。
    * 作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
    * 这决定了它只能是单线程，否则会带来很复杂的同步问题
3. 代码的分类:
    * 初始化代码
    * 回调代码
4. js引擎执行代码的基本流程
    * 先执行初始化代码: 包含一些特别的代码   回调函数(异步执行)
      * 设置定时器
      * 绑定事件监听
      * 发送ajax请求
    * 后面在某个时刻才会执行回调代码

```js
  setTimeout(function () {
    console.log('timeout 2222')
    alert('22222222')
  }, 2000)
  setTimeout(function () {
    console.log('timeout 1111')
    alert('1111111')
  }, 1000)
  setTimeout(function () {
    console.log('timeout() 00000')
  }, 0)
  function fn() {
    console.log('fn()')
  }
  fn()

  console.log('alert()之前')
  alert('------') //暂停当前主线程的执行, 同时暂停计时, 点击确定后, 恢复程序执行和计时
  console.log('alert()之后')
```

## 事件处理机制(图)

* 代码分类
  * 初始化执行代码: 包含绑定dom事件监听, 设置定时器, 发送ajax请求的代码
  * 回调执行代码: 处理回调逻辑
* js引擎执行代码的基本流程:
  * 初始化代码===>回调代码
* 模型的2个重要组成部分:
  * 事件管理模块
  * 回调队列
* 模型的运转流程
  * 执行初始化代码, 将事件回调函数交给对应模块管理
  * 当事件发生时, 管理模块会将回调函数及其数据添加到回调列队中
  * 只有当初始化代码执行完后(可能要一定时间), 才会遍历读取回调队列中的回调函数执行


## H5 Web Workers
* 可以让js在分线程执行
* Worker
  ```
  var worker = new Worker('worker.js');
  worker.onMessage = function(event){event.data} : 用来接收另一个线程发送过来的数据的回调
  worker.postMessage(data1) : 向另一个线程发送数据
  ```
* 问题:
  * worker内代码不能操作DOM更新UI
  * 不是每个浏览器都支持这个新特性
  * 不能跨域加载JS

* svn版本控制
* svn server