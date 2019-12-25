# ES6
目录
[toc]

## ECMAScript 6 简介

### ECMAScript 和 JavaScript 的关系
该标准从一开始就是针对 JavaScript 语言制定的，但是之所以不叫 JavaScript，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现

### ES6 与 ECMAScript 2015 的关系
ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。ES6 一般是指 ES2015 标准，但有时也是泛指“下一代 JavaScript 语言”

### Babel 转码器


## let 和 const 命令

### let 命令
let声明的变量只在它所在的代码块有效。  
```
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1

for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined  
let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。  
```
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
<!-- 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。 -->
```
“暂时性死区”也意味着typeof不再是一个百分之百安全的操作
```
typeof x; // ReferenceError
let x;
```
let不允许在相同作用域内，重复声明同一个变量。
```
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

### 块级作用域

为什么需要块级作用域
ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。
```
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```
上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

第二种场景，用来计数的循环变量泄露为全局变量。
```
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```
上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

### const 命令
const声明一个只读的常量。一旦声明，常量的值就不能改变。
const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值
const的作用域与let命令相同：只在声明所在的块级作用域内有效
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用
const声明的常量，也与let一样不可重复声明
```
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.

const foo;
// SyntaxError: Missing initializer in const declaration

if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
```
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
如果真的想将对象冻结，应该使用Object.freeze方法。
```
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

### ES6 声明变量的六种方法
ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法

### 顶层对象的属性
顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。
```
window.a = 1;
a // 1

a = 2;
window.a // 2
```

ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
```
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

## 变量的解构赋值

### 数组的解构赋值
“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
```
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
```
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let [x = 1] = [null];
x // null
```
如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
```
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

### 对象的解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]
```

注意点
（1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。
```
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});
```
上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
(2）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
```
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

### 字符串的解构赋值
字符串被转换成了一个类似数组的对象,类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的解构赋值 

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 函数参数的解构赋值
```
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```
函数参数的解构也可以使用默认值。

函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值
```
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到写法不同的结果
```
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

```

### 圆括号问题
只要有可能，就不要在模式中放置圆括号

#### 不能使用圆括号的情况
以下三种解构赋值不得使用圆括号。

（1）变量声明语句
```
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```
上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。

（2）函数参数

函数参数也属于变量声明，因此不能带有圆括号。
```
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```
（3）赋值语句的模式
```
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```
上面代码将整个模式放在圆括号之中，导致报错。
```
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```
上面代码将一部分模式放在圆括号之中，导致报错。

#### 可以使用圆括号的情况
可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
```
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```
上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致


### 用途
变量的解构赋值用途很多。

（1）交换变量的值
```
let x = 1;
let y = 2;

[x, y] = [y, x];
```
2）从函数返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
```
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

3）函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。
```
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```
（4）提取 JSON 数据

解构赋值对提取 JSON 对象中的数据，尤其有用。
```
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```
上面代码可以快速提取 JSON 数据的值。

（5）函数参数的默认值
```
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```
指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句

（6）遍历 Map 结构

任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
```
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```
如果只想获取键名，或者只想获取键值，可以写成下面这样。
```
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```
（7）输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

const { SourceMapConsumer, SourceNode } = require("source-map");


## 字符串的扩展

### 字符串的遍历器接口 
ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
```
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

### 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
```
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
```
let greeting = `\`Yo\` World!`;
```

表示多行字符串，所有的空格和缩进都会被保留在输出之中,如果你不想要这个换行，可以使用trim方法消除它
```
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
```

嵌入变量，需要将变量名写在${}之中,大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性,还能调用函数
```
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

function fn() {
  return "Hello World";
}
`foo ${fn()} bar`
// foo Hello World bar
```
如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。

如果模板字符串中的变量没有声明，将报错。
```
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错
```
由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。
```
`Hello ${'World'}`
// "Hello World"
```

模板字符串甚至还能嵌套。
```
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```














1.let 和 const
暂时性死区 （Temporal Dead Zone）
let和const命令声明的变量无变量提升，且都会被锁定在声明的代码块中，在let和const命令执行前，使用该变量都将报错，这一部分称为“暂时性死区”。
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

let tmp将tmp变量绑定至{}代码块之内，外部的tmp声明无效，tmp = 'abc'就处在死区，所以报错。同理在以前没有let和const命令的时候，typeof是一个安全的运算符，即使变量没有被声明，也会正常返回undefined，但如果typeof处在死区中，处理了在后文被let和const的变量，将会报错。
typeof undeclared_variable; // undefined 未被let和const声明反而没事
if (true) {
  // TDZ开始 (Temporal Dead Zone: 暂时性死区)
  typeof tmp // ReferenceError
  let tmp; // TDZ结束
  console.log(tmp); // undefined
}

顶层对象
var和function的全局声明会自动绑定到window或global对象，这是ES5全局变量的一个缺陷，let和const不会。
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined

const命令
const声明的变量只是引用无法修改，对象的内部结构可以改变，使用Object.freeze()可以彻底锁定某对象，需递归锁定多层级对象。
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

2.变量的解构赋值
解构时分为匹配模式和被赋值的变量，若相同可简写，注意区分
// 被解构的对象的key，和后边被赋值的变量同名，可以简写。
let { matchValue } = { matchValue: 123 };
console.log(matchValue); //123

等价于
let { matchValue: matchValue } = { matchValue: 123 }
console.log(matchValue); //123

通过代码的高亮可以看出相互之间的对应关系。所以
let { matchValue: value } = { matchValue: 123 }
console.log(matchValue); //报错，未定义，这个只是匹配模式，不会被赋值
console.log(value); //123

函数参数
首先解构赋值允许指定默认值，这为函数参数设置默认值提供基础。
// 数组解构赋值的默认值
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x = 'a', y = 'b'] = ['aa', undefined]; // x='aa', y='b'

// 对象解构赋值的默认值
let {x, y = 5} = {x: 1};
x // 1
y // 5

这里只讨论一下参数为Object类型时，该如何设置默认值，比如一些options的设置，通过设置默认值，可有效避免var foo = options.foo || 'default foo';。有三种形式，注意这三种的区别：
const ajax1 = function (url, { type = 'GET', dataType = 'json'} = {}) {
  // TODO
}
const ajax2 = function (url, {} = { type = 'GET', dataType = 'json' }) {
  // TODO
}
const ajax3 = function (url, { type = 'GET', dataType = 'json'} ) {
  // TODO
}

ajax1的默认参数表示，如果没有传入options，则用一个没有键值对的对象{}作为默认值，但也正是因此，传入的options没有options.type 和 options.dataType这两个属性，则赋予默认值type = 'GET', dataType = 'json'，这是针对键值对某一个key设默认值。
ajax2的默认参数表示，如果没有传入options对象，则用一个{ type = 'GET', dataType = 'json' }这样的options对象作为默认值，这是针对这一整个options设默认值。弊端就是如果开发者在使用时这样写
ajax2(url, {type = 'POST'})

那么dataType参数将要丢失，因为{type = 'POST'}代替了默认参数{ type = 'GET', dataType = 'json' }，所以一般通过形如ajax1的方式定义默认参数。
ajax3的默认参数有一个问题，就是当没有传入options的时候，相当于从undefined中取值type，dataType来解构，所以会报错，所以ajax1会通过= {}的方式，把不传入options的情况过滤掉。
3.各种数据结构的扩展
字符串
``表示模板字符串，就不多介绍了，功能强大好用。
--------------------
codePointAt可作为charCodeAt的替代品，必要时使用for...of遍历字符串，他们都是为了处理32 位的 UTF-16 字符。
var s = "𠮷a";
s.length // 3  无法正确识别字符串长度，会把‘𠮷’识别为2个字符
s.charAt(0) // '' charAt无法处理这个字
s.charAt(1) // ''
s.charCodeAt(0) // 55362 charCodeAt只能两字节两字节的分开返回
s.charCodeAt(1) // 57271

下面看一下ES6的codePointAt和for...of
let s = '𠮷a';
s.codePointAt(0) // 134071 可以识别一整个字
s.codePointAt(1) // 57271 第三，四字节会被返回
s.codePointAt(2) // 97 字符串长度仍有问题
// 使用for...of循环正确处理
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7 134071是10进制，20bb7为16进制表示
// 61 字符串长度也没问题，循环执行了2次

--------------------
还引入了includes，startWith，endWith，padStart，padEnd等方法，具体使用方法可以通过API手册了解一下。
Number
parseInt等全局方法挂在到Number上，如Number.parseInt，Number.parseFloat等，增加了一些高阶计算函数。
函数
箭头函数，this的指向在函数生成时固定，说白了就是this指向与外部一致。
--------------------
函数参数设置默认值，前文已经说明。补充一点，设置某参数必须可以：
function throwNeedThisParamException(param) {
  throw new Error(`Missing parameter: ${param}`);
}
function demo (x = throwNeedThisParamException('x')) {

}

参数的默认值是在取不到值的情况下才会执行，所以正常情况不会抛出这个错误。
--------------------
参数的rest形式，例子如下：
function demo (...values) {
  console.log(values)
  console.log('-----------------------')
  console.log(arguments)
}
demo(1,2,3,4)   
//[1,2,3,4]  
-----------------------
//[1, 2, 3, 4, callee: (...), Symbol(Symbol.iterator): ƒ]

内置的arguments为类数组结构，可以看见有一个Symbol类型的字段Symbol.iterator，这是它的迭代器，使其可以向数组一样遍历。但如果展开看其__proto__，值为Object。而使用rest形式的参数，可以直接将参数转为数组。注意rest形式的参数只能用作最后一个参数。
--------------------
函数的length属性返回函数参数的个数，name属性返回声明的函数名称，ES6的变量式声明返回变量名。
function f1 () {}
f1.name // f1
const f2 = function (x,y) {}
f2.name // f2
f2.length // 2

--------------------
双冒号运算符，代替bind，call，apply绑定this对象指向。foo::bar(arguments)相当于bar.apply(foo, arguments)
--------------------
尾调用，说白了就是最后返回值为执行另一个函数return anotherFunction()，而return anotherFunction() + 1不属于尾调用，因为在执行完anotherFunction后还需要+1。尾调用的优势就是在return后，可以释放当前函数执行所需要的一切资源空间。对比如下两个例子，是做斐波那契数列求值的：
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出

这是最简单的写法，清晰明了，第n项就是前两项的和。但是，为了计算加号两边的值，必须要保存函数执行的全部资源，递归后造成堆栈溢出。这不属于尾调用。
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};
  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity

这是优化过的递归调用，return之后无需保存函数所需要的资源，所以不会堆栈溢出，只是在逻辑上不好理解。这种写法Fibonacci2 (n - 1, ac2, ac1 + ac2)可以看成一个从前到后推导过程，n相当于一个计数器，每次值的增长是通过两个数求和ac1 + ac2作为第二个数，ac2作为第一个数。
数组
扩展运算符...，与上文的rest参数是相反的用法，rest参数是把一个个的参数总和到数组rest参数中，而扩展运算符是把数组中的元素一个个提取出来。
扩展运算符可以用来方便的复制一个数组。
let arr = [1,2,3]
console.log(...arr)  // 等价于console.log(1,2,3)
let arr2 = [...arr] // 等价于let arr2 = [1,2,3]，新建一个数组
arr.push(4)
console.log(arr2) // [1,2,3]

--------------------
数组可以通过Array.from，Array.of生成，可以通过keys()，values()，entries()遍历。
Array.from可以从具有iterator的数据结构生成数组，比如arguments对象，document.querySelectorAll()获得的DOM对象，这些都是类数组，或者Map，Set等新增的数据结构。
Array.of可以代替new Array()，因为new Array()的参数与行为不统一，当传入一个参数且为数字时，表示数组长度，Array.of不会有这个问题，会通过参数创建数组。
Array还新增了一些工具方法，如find，findIndex，includes等可以参考其他API手册。
对象
Object.assign是合并对象，把多个对象合并到第一个对象上。
Object.create是以某原型，生成一个新对象。可选第二个参数，为属性描述符，使用方式参见下方代码。
Object.getPrototypeOf，Object.setPrototypeOf是获取和设置对象的原型属性__proto__，不应显式使用__proto__这个属性。
Object.getOwnPropertyDescriptors是获取对象的属性信息，包括value，writable，enumerable，configurable。
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
-------------------
Object.setPrototypeOf(target, { myProto: 'PROTO'})
Object.getPrototypeOf(target) //{ myProto: 'PROTO', __proto__: Object}
let newObj = Object.create(Object.getPrototypeOf(target))
newObj // 无显式属性{ __proto__:{ myProto: 'PROTO', __proto__: Object} } 
-------------------
const descriptors = Object.getOwnPropertyDescriptors(target)
console.log(descriptors)
// {
//   a: {value: 1, writable: true, enumerable: true, configurable: true},
//   b: {value: 2, writable: true, enumerable: true, configurable: true},
//   c: {value: 3, writable: true, enumerable: true, configurable: true}
// }
newObj = Object.create(Object.getPrototypeOf(target), descriptors)
newObj // { a:1, b:2, c:3, __proto__:{ myProto: 'PROTO', __proto__: Object} } 

--------------------
ES6允许字面量定义对象时，用表达式作为属性名，把表达式放在方括号内。
const propKey = 'foo';

const obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
obj // { foo: true, abc: 123 }

--------------------
Object.is优化了===运算符，处理了===的两个问题。
NaN === NaN // false
Object.is(NaN, NaN) // true
--------------
+0 === -0 // true 
Object.is(+0, -0) // false

4.Symbol
Symbol为不会重复的值，第七种基本数据类型，类似字符串，可以作为对象的key，但不会被for...of，for...in，Object.getOwnPropertyNames()，Object.keys()返回，如需要遍历，需使用Object.getOwnPropertySymbols()，或者Reflect.ownKeys()返回全部key。
let foo = Symbol('foo');
const obj = { [foo]: 'foobar' }
for (let i in obj) {
  console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj)
// []
Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]
Reflect.ownKeys(obj)
// [Symbol(foo)]

Symbol.for() 和 Symbol.keyFor()
Symbol可以去确保生成的值不同，但有时需要保存下来以便再次使用，类似于单例，如果存在就不会重新创建。这个时候就需要使用Symbol.for()。
let s1 = Symbol('foo');
let s2 = Symbol.for('foo');
let s3 = Symbol.for('foo');
s1 === s2 // false
s2 === s3 // true

从上例可以看出，Symbol.for类似于将这个Symbol登记，所以s1这个未登记的Symbol不会等于其他Symbol。
Symbol.keyFor会返回已登记的Symbol的key，一定是登记过的才会返回。接上例：
Symbol.keyFor(s1) // undefiend
Symbol.keyFor(s2) // "foo"

5.Proxy和Reflect
Proxy代理对象的各种内置方法，get set construct等，类似于拦截器。
Reflect则作为Object的替代者，Object上的一些静态方法被移植到了Reflect上。
Reflect对象一共有 13 个静态方法。

Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
通过Proxy和Reflect可以实现观察者模式，说白了就是：监听set方法，执行相应操作。

const person = { name: 'Li', age: 18}
const personObserved = observe(person)

function observe(obj) {
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      console.log(`setting ${key} to ${value}!`);
      return Reflect.set(target, key, value, receiver);
    }
  })
}

personObserved.name = 'zhang'
// setting name to zhang!

6.Promise
Promise用来处理异步操作，是构造函数，参数为then和catch后需要执行的方法。下面是使用Promise封装的ajax：
const getJSON = function(url) {
  const promise = new Promise((resolve, reject) => {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

7. Iterator 和 for...of循环
Iterator被挂载在对象的Symbol.iterator属性下，Symbol.iterator不是一个Iterator，而是会返回Iterator的函数。
const arr = [1,2,3,4,5]
let iterator = arr[Symbol.iterator]();
iterator // Array Iterator {}
iterator.next() // {value: 1, done: false}
......
iterator.next() // {value: 5, done: false}
iterator.next() // {value: undefined, done: true}

8. Generator 和 yield
Generator会生成一个Iterator，每次iterator.next()返回yield的产出值，且中断程序执行。yield*表示产出的值是另外一个generator的结果。代码如下：
function* demo(){
  console.log(`${yield 1}`);
  console.log(`${yield 2}`);
  yield* demo2(); //返回另一个generator的结果
}
function* demo2(){
  yield 3;
}
let ite = demo();
ite.next() // 返回值：{value: 1, done: false}
ite.next() // console：undefined, 返回值：{value: 2, done: false}
ite.next(123456789) // console: 123456789, 返回值：{value: 3, done: false} 

解释一下运行结果：第一次ite.next()时，程序执行到yield 1被终止，故没有打印日志，再次执行ite.next()时，代码继续，开始执行console.log(`${yield 1}`);，但输出不是1而是undefiend，因为ite.next()的参数值会被当做上次yield语句的执行结果，所以下面的ite.next(123456789)会输出数字123456789

作者：VaryZheng
链接：https://www.jianshu.com/p/fe2aec6f307d
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。