
# ES

## 什么是ECMA

ECMA（European Computer Manufacturers Association）中文名称为欧洲计算机制造商协会，这个组织的目标是评估、开发和认可电信和计算机标准。1994年后该组织改名为Ecma国际

## 为什么要学习ES6

* ES6的版本变动内容最多，具有里程碑意义
* ES6加入许多新的语法特性，编程实现更简单、高效
* ES6是前端发展趋势，就业必备技能

## ECMASript 6新特性

### let关键字

let关键字用来声明变量，使用let声明的变量有几个特点：

* 1)不允许重复声明
* 2)块儿级作用域
* 3)不存在变量提升
* 4)不影响作用域链

应用场景：以后声明变量使用let就对了  

### const关键字

const 关键字用来声明常量，const声明有以下特点

* 1)声明必须赋初始值
* 2)标识符一般为大写
* 3)不允许重复声明
* 4)值不允许修改
* 5)块儿级作用域
* 6)对于数组和对象的元素修改, 不算做对常量的修改, 不会报错

**注意:对象属性修改和数组元素变化不会出发const错误**
**应用场景：声明对象类型使用const，非对象类型声明选择let**

### 变量的解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。

```js
//数组的解构赋值
const arr = ['张学友', '刘德华', '黎明', '郭富城'];
//对象的解构赋值
const lin = {name: '林志颖',tags: ['车手', '歌手', '小旋风', '演员']};
let {name, tags} = lin;
//复杂解构
let wangfei = {
  name: '王菲',
  age: 18,
  songs: ['红豆', '流年', '暧昧', '传奇'],
  history: [
    {name: '窦唯'},
    {name: '李亚鹏'},
    {name: '谢霆锋'}
  ]};
let {songs: [one, two, three], history: [first, second, third]} = wangfei;
```

**注意：频繁使用对象方法、数组元素，就可以使用解构赋值形式**

### 模板字符串模板字符串（template string）

是增强版的字符串，用反引号（`）标识，特点：

* 1)字符串中可以出现换行符
* 2)可以使用${xxx} 形式输出变量

```js
// 定义字符串
let str = `<ul><
          li>沈腾</li>
          <li>玛丽</li>
          <li>魏翔</li>
          <li>艾伦</li>
      </ul>`;
// 变量拼接
let star = '王宁';let result = `${star}在前几年离开了开心麻花`;
```

**注意：当遇到字符串与变量拼接的情况使用模板字符串**

### 简化对象写法
ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
let name = '尚硅谷';
let slogon = '永远追求行业更高标准';
let improve = function () {
  console.log('可以提高你的技能');
}
//属性和方法简写
let atguigu = {
  name,
  slogon,
  improve,
  change() {
    console.log('可以改变你')
  }
};
```

**注意：对象简写形式简化了代码，所以以后用简写就对了**

### 箭头函数ES6

允许使用「箭头」（=>）定义函数。箭头函数的注意点:

* 1)如果形参只有一个，则小括号可以省略
* 2)函数体如果只有一条语句，则花括号可以省略，函数的返回值为该条语句的执行结果
* 3)箭头函数this指向声明时所在作用域下this 的值
* 4)箭头函数不能作为构造函数实例化
* 5)不能使用arguments
适用场景：
* 箭头函数适合与 this 无关的回调. 定时器, 数组的方法回调
* 箭头函数不适合与 this 有关的回调.  事件回调, 对象的方法
注意：箭头函数不会更改this指向，用来指定回调函数会非常合适

```js
/*** 1. 通用写法*/
let fn = (arg1, arg2, arg3) => {return arg1 + arg2 + arg3;}
/*** 2. 省略小括号的情况*/
let fn2 = num => {return num * 10;};
/*** 3. 省略花括号的情况*/
let fn3 = score => score * 20;
/*** 4. this指向声明时所在作用域中this 的值*/
let fn4 = () => {console.log(this);}
let school = {
  name: '尚硅谷',
  getName(){
    let fn5 = () => {
      console.log(this);
    }
    fn5();
  }
};
```

### rest参数

ES6引入rest参数，用于获取函数的实参，用来代替arguments

```js
// ES5 获取实参的方式
function date(){
    console.log(arguments);
    console.log(arguments[0], arguments[1], arguments[2]);// 白芷 阿娇 思慧
    console.log(typeof arguments);//object
    console.log(arguments instanceof Array);//false
}
date('白芷','阿娇','思慧');
/*** 作用与arguments 类似*/
function add(...args){
  console.log(args);
}
add(1,2,3,4,5);
/*** rest 参数必须是最后一个形参*/
function minus(a,b,...args){
  console.log(a,b,args);
}
minus(100,1,2,3,4,5,19);
```

注意：rest参数非常适合不定个数参数函数的场景

### spread扩展运算符

扩展运算符（spread）也是三个点（...）。它好比rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列，对数组进行解包。

```js
/*** 展开数组*/ 
let tfboys = ['德玛西亚之力','德玛西亚之翼','德玛西亚皇子'];
function fn(){
  console.log(arguments);
}
fn(...tfboys)
/*** 展开对象*/
let skillOne = {q: '致命打击',};
let skillTwo = {w: '勇气'};
let skillThree = {e: '审判'};
let skillFour = {r: '德玛西亚正义'};
let gailun = {...skillOne, ...skillTwo,...skillThree,...skillFour};
```

### Symbol

#### Symbol基本使用

ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。  
Symbol特点
1)Symbol的值是唯一的，用来解决命名冲突的问题
2)Symbol值不能与其他数据进行运算
3)Symbol定义的对象属性不能使用for...in循环遍历，但是可以使用Reflect.ownKeys来获取对象的所有键名

```js
//创建Symbol
let s1 = Symbol();
console.log(s1, typeof s1);
//添加标识的Symbol
let s2 = Symbol('尚硅谷');
let s2_2 = Symbol('尚硅谷');
console.log(s2 === s2_2);
//使用Symbol for 定义
let s3 = Symbol.for('尚硅谷');
let s3_2 = Symbol.for('尚硅谷');
console.log(s3 === s3_2);
```

注: 遇到唯一性的场景时要想到Symbol

#### Symbol内置值

除了定义自己使用的Symbol 值以外，ES6 还提供了11个内置的Symbol值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为它们会在特定的场景下自动执行。  
属性|定义
--|--
| **Symbol.hasInstance**|当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法|
| **Symbol.isConcatSpreadable**|对象的Symbol.isConcatSpreadable属性等于的是一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。|
| **Symbol.species**|创建衍生对象时，会使用该属性Symbol.match当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。|
| **Symbol.replace**|当该对象被str.replace(myObject)方法调用时，会返回该方法的返回值。|
| **Symbol.search**|当该对象被str.search(myObject)方法调用时，会返回该方法的返回值。|
| **Symbol.split**|当该对象被str.split(myObject)方法调用时，会返回该方法的返回值。|
| **Symbol.iterator**|对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器|
| **Symbol.toPrimitive**|该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。|
| **Symbol.toStringTag**|在该对象上面调用toString方法时，返回该方法的返回值|
| **Symbol.unscopables**|该对象指定了使用with关键字时，哪些属性会被with环境排除|  

