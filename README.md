# JavaScript: The Good Parts (by Douglas Crockford)

## 目录

* [part-1 精华](#part-1)
* [part-2 语法](#part-2)
* [part-3 对象](#part-3)
* [part-4 函数](#part-4)
* [part-5 继承](#part-5)
* [part-6 数组](#part-6)
* [part-7 正则表达式](#part-7)
* [part-8 方法](#part-8)
* [part-9 代码风格](#part-9)
* [part-10 优美的特性](#part-10)
* [JSON](#json)


## part-1 精华 <a id="part-1"></a>
* 函数式编程
* 弱类型
* 动态对象及对象字面量表示法
* 原型继承

## part-2 语法 <a id="part-2"></a>

### 2.1 空白

空白可能表现为格式化字符串或注释的形式。

### 2.2 标识符

标识符由字母、数字或下划线组成，由字母或下划线开头。保留字不能作为标识符。

### 2.3 数字

JavaScript 只有一个单一的数字类型。它在内部被表示为64位的浮点数。

### 2.4 字符串

字符串字面量可以被包围在单引号或双引号中，它可能包含0个或多个字符。

JavaScript 中的所有字符都是16位的。

JavaScript 没有字符类型。要表示一个字符，只需创建仅包含一个字符的字符串即可。

*\u* 约定允许指定用数字表示的字符码位。

字符串是不可变的。一旦字符串被创建，就永远无法改变它。

通过 **+** 运算符去连接其它的字符串将得到一个新的字符串。两个包含完全相同的字符且字符顺序也相同的的字符串被认为是相同的字符串。

字符串有一个 *length* 属性。

字符串有一些方法。 

### 2.5 语句（大致来说, 语句执行的是操作。变量和函数声明归类为语句。）

* var statement, like `var a;`
* expression statement, like `function fn() {}`
* try statement
* if statement
* switch statement
* while statement
* for statement
* do statement
* disruptive statement
  - break statement
  - return statement
  - throw statement

### 2.6 表达式（大致来说,表达式产生一个值并且该值可在任何需要的场景下被改写）

* 运算符表达式
  - 前置运算符，如`typeof` `+` `-` `!`
  - 后置运算符，如`*` `/` `%`  `+` `-`  `>=` `<=` `>` `<`  `===` `!==`  `||` `&&`
  - 三元运算符，`? : `

* 函数表达式，如 `var fn = function() {}`
* 函数调用表达式，如 `fn();`
* 立即执行函数表达式 (IIFEs)，如 `(function (params) {})(dataBlob);`
* 属性存取表达式，如 `obj.name;`


[表达式和语句的区别](http://www.cnblogs.com/ziyunfei/archive/2012/09/16/2687589.html)


### 2.7 字面量

* 对象字面量，如 `var obj = {};`
* 数组字面量，如 `var arr = [];`
* 正则字面量，如 `var reg = /[abc]/gi;`

### 2.8 函数
	
	// 函数声明，也可以认为是函数字面量
	function fnName(parameters) {
		// function body
	}

## part-3 对象 <a id="part-3"></a>

JavaScript 中对象是可变的键控集合；存放在堆中，是引用类型。

数组、函数、正则表达式都是对象，对象自然也是对象。

对象包括一个原型链特性，允许对象继承（共享）另一个对象的属性。

### 3.1 对象字面量

属性名可以是包括空字符串在内的任何字符串。

当然，属性名使用更严格的合法的标识符（包含字、数字和下划线）是更好的做法。

	// 对象是可嵌套的
	var flight = {
		airline: "Oceanic",
		number: 815,
		"not-identifier": "非标识符属性必须加引号",
		departure: {
			city: "Sydney"
		}
	};


### 3.2 检索

当属性名是字符串且是合法的标识符时，可用 `.` 号检索；其它情况可用 `[]` 号检索。

	flight.airline; // 
	flight["not-identifier"]; //
	flight.unkonwn; // undefined

	var num = "number";
	flight[num]; // 815
	
|| 运算符可以用来填充默认值（遇真值而止）

	var price = flight.price || 100; 

&& 运算符可以用来避免错误（遇假值而止）
	
	// 尝试检索一个 undefined 值将会导致 TypeError 异常
	var arrival_city = flight.arrival && flight.arrival.city;

### 3.3 更新

对象中的值可以通过赋值语句来更新。

	// 已有的则替换
	flight.number = 1000;

	// 没有的则扩充
	flight.status = 'overdue';

### 3.4 引用

对象通过引用来传递。它们永远不会被拷贝。

	var stooge = {name: 'Lily'};
	var x = stooge;
	x.nickname = 'cherry';

	// that's true
	stooge.nickname === x.nickname; 

### 3.5 原型

每个对象都连接到一个原型对象，并且从中继承属性。

所有通过对象字面量创建的对象都连接到 `Object.prototype` 这个 JavaScript 中标准的对象。
	
	// Object.beget
	// 创建一个使用原对象作为其原型的新对象
	// 改方法为道格拉斯所创，被 ECMAScript 标准采纳，实现标准为 Object.create
	if (typeof Object.beget !== 'function') {
		Object.beget = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		}
	}

	var another_stooge = Object.beget(stooge);
	another_stooge.name; // Lily

	// ES6 中有了更为先进的方式让两个对象之间建立原型关系
	Object.setPrototypeOf(another_stooge, stooge);

原型连接只有在检索的时候才被用到。

对象的属性检索时，除非检索结果被返回，否则原型链的查找会持续到 `Object.prototype` 为止，这个过程称为**委托**。

原型关系是一种动态关系。如果添加一个属性到原型中，该属性会立即对所有基于该原型创建的对象可见。

### 3.6 反射

检索对象的属性时过滤出需要的并对其进行操作，这一过程称为反射。过滤的方法大致有两步：

其一，hasOwnProperty 方法不检查原型链

	flight.hasOwnProperty('number');      // true
	flight.hasOwnProperty('constructor'); // false

其二，typeof 操作符确定属性的类型

	typeof flight.number;    // 'number'
	typeof flight.departure; // 'object'
	typeof flight.unkown;    // 'undefined'

### 3.7 枚举

`for in` 语句可用来遍历一个对象的所有属性，顺序不确定，且包括函数和原型中的属性；注意使用 `hasOwnProperty` 和 `typeof` 过滤。

还可以用数组存放待枚举属性，通过 `for` 语句进行遍历。这是个好主意。

### 3.8 删除

`delete` 运算符可以用来删除对象的属性。它将会移除对象中确定包含的属性。它不会触及原型链中的任何对象。

删除对象的属性可能会让来自原型链中的属性浮现出来。

### 3.9 减少全局变量污染

最小化使用全局变量的一个方法是在你的应用中只创建唯一一个全局变量：

	var MYAPP = {};

	MYAPP.stooge = {};

	MYAPP.flight = {};

另一个减少全局变量的方法是使用闭包。

## part-4 函数 <a id="part-4"></a>

函数包含一组语句，它们是 JavaScript 的基础模块单元，用于代码复用、信息隐藏和组合调用。

### 4.1 函数对象

在 JavaScript 中函数就是对象。

对象是 “名/值” 对的集合并拥有一个连到原型对象的隐藏连接。

函数对象连接到 `Function.prototype` （该原型对象本身连接到 `Object.prototype`）

每个函数对象在创建时会附带一个隐藏的 “调用” 属性和函数上下文（即作用域）。

每个函数对象在创建时也随带有一个 `prototype` 属性。它的值是一个拥有 `constructor` 属性且值为该函数的对象。这和隐藏连接到 `Function.prototype` 完全不同。

	// 令人费解的 prototype 属性
	function fn () {}

	fn.prototype.constructor === fn;     // true
	fn.__proto__ === Function.prototype; // true

每个函数对象在创建时还随带了其它的属性，如 `name`, `apply`, `bind`, `isPrototypeOf` 等

因为函数是对象，所以它们可以像任何其他的值一样被使用。可以存放在变量、对象和数组中，可以作为参数传递给其他函数，函数也可以再返回函数，而且，函数可以拥有方法。

函数的与众不同之处在于它们可以被调用。

### 4.2 函数字面量

函数可以通过函数字面量来创建

	// 创建一个名为 add 的变量，并把两个数字相加的函数赋值给它
	var add = function (a, b) {
		return a + b;
	}

### 4.3 调用

调用一个函数将暂停当前函数的执行，传递控制权和参数给新函数。

每个函数接收两个附加的参数：this 和 arguments。

一共有四种调用模式：
* 方法调用模式		--  `this` 被绑定到调用方法的对象
* 函数调用模式		--  `this` 被绑定到全局对象，这是语言设计上的失误
* 构造器调用模式	--  `this` 被绑定到 new 出的新对象上，这是对流行的基于类的语言的一种妥协
* apply 调用模式 	--  `this` 被绑定到 apply 方法后的第一个参数上
 
这些模式在如何初始化关键参数 this 上存在差异。

调用运算符是跟在函数表达式之后的一对圆括号。圆括号内可包含零个或多个用逗号隔开的**表达式*。每个表达式产生一个参数值。

### 4.4 参数

当函数被调用时，会得到一个 “免费” 奉送的参数，那就是类数组 `arguments` 。它有 `length` 属性，却缺少所有的数组方法。

作者认为这也是设计上的一个错误。

### 4.5 返回

`return` 语句可以使函数提前返回。默认返回 `undefined`。

如果是 `new` 前缀的方式来调用，且返回值不是一个对象，则返回 `this` （该新对象）。

### 4.6 异常

当函数体执行遇到 `throw` 语句抛出异常时，函数体中断执行。该异常被 `try` 语句的 `catch` 从句捕获。

### 4.7 给类型增加方法

JavaScript 允许给语言的基本类型增加方法。

JavaScript 中所有类型都可以看成是基本类型构造函数的实例。

	// 给所有内置类型（构造函数）添加扩充自身原型的方法
	Function.prototype.method = function (name, func) {
		if (!this.prototype[name]) {
			this.prototype[name] = func;
		}
	}

	// 使用示范
	String.method('trim', function () {
		return this.replace(/^\s+|\s+$/g, '');
	})

	'hello '.trim(); // 'hello'

### 4.8 递归

### 4.9 作用域

作用域控制着变量与参数的可见性及生命周期。它减少了名称冲突，并且提供了自动内存管理。

JavaScript 中由函数提供作用域。

### 4.10 闭包

函数可以访问它被创建时所处的上下文环境，这被称为闭包。

内部函数能访问外部函数的实际变量而无须复制。

	// 用闭包创建对象从而保护属性的私有性，代替 new 运算符方法；可用于单例模式
	var quo = function (status) {
		return {
			get_status: function () {
				return status;
			}
		}
	}

	// 构造一个 quo 实例
	var myQuo = quo('amazed');

	myQuo.get_status(); // 'amazed'

[how-do-javascript-closures-work](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work?page=1)

### 4.11 回调

函数可以让不连续事件的处理变得更容易。

回调，就是非阻塞事件的应用基础。

### 4.12 模块

我们可以使用函数和闭包来构造模块。

模块是一个提供接口却隐藏状态与实现的函数或对象。 

### 4.13 级联

如果对象的方法返回对象本身 `this` 而不是 `undefined` 就可以启用级联。

	getElement('myBoxDiv').
		move(350, 150).
		width(100).
		height(100).
		on('click', function () {
			// 启用级联
		})

### 4.14 套用 (curry)

套用允许我们将函数与传递给它的参数相结合去产生出一个新的函数。

	Function.method('curry', function () {
		var slice = Array.prototype.slice,
				args = slice.apply(arguments),
				that = this;

		return function () {
			return that.apply(null, args.concat(slice.apply(arguments)))
		}
	});

	var addTen = add.curry(10);
	console.log('curry addTen plus 5:', addTen(5)); // 15

### 4.15 记忆 (memoization)

函数可以用对象去记住先前操作的结果，从而能避免无谓的运算。这种优化被称为记忆。


## part-5 继承 <a id='part-5'></a>

JavaScript 是一种基于原型的语言，对象直接从其他对象继承。当然，它也可以模拟成基于类的模式，如 Java

### 5.1 伪类

JavaScript 中每个函数都被设计成具有构造器功能，函数对象在被创建时附带的那个 `prototype` 属性就是存放继承特征的地方。

约定：所有将被当做构造器使用的函数，都要首字母大写。必须用 `new` 来调用，否则会污染全局变量。

事实上，伪类没有私有环境。

### 5.2 对象说明符

构造器传参数时，可以传入对象说明符

	var myObject = maker({
		first: f,
		last: l
	});

### 5.3 原型

在纯粹的原型模式中，我们会摒弃类，转而专注于对象。

	// 这种理念在 ES6 中得到了实现
	var _obj = { name: 'old obj' };

	var obj = Object.create(_obj);

	obj.name; // 'old obj'

	// 或者让两个已存在的对象建立原型链
	var myObj = {};

	Object.setPrototypeOf(myObj, _obj);

	myObj.name; // 'old obj'

但是，ES6 也同样提供了 Class 语法。

### 5.4 函数化

使用函数化的方法同样可以达到构造函数的目的；优点是明晰、属性和方法都是私有化；缺点是方法将不再共享。

### 5.5 部件

我们可以从一套部件中组合出对象来。

## part-6 数组 <a id="part-6"></a>

数组是一段线性分配的内存，它通过整数去计算偏移并访问其中的元素。

不幸的是，JavaScript 没有像这种数组一样的数据结构。

JavaScript 提供了一种拥有一些类数组 (array-like) 特性的对象。它把数组的下标转变成字符串，用其作为属性。

### 6.1 数组字面量

数组字面量是在一对方括号中包围零个或多个用逗号分隔的值的表达式。

它继承自 `Array.prototype` 。

	// 数组字面量
	var arr = ['zero', 'one'];

### 6.2 长度

`length` 属性的值是这个数组的最大整数属性名加上1。

设置更大的 `length` 无须给数组分配更多的空间。

	arr.length; // 2

	arr[1000] = 'thousand';

	arr.length; // 1001

### 6.3 删除

由于 JavaScript 的数组其实就是对象，所以 `delete` 运算符可以用来从数组中移除元素。但这会使数组留下一个洞 (undefined)

`.splice` 方法可以对数组做个手术，删除一些元素并将它们替换为其它的元素。

	arr.splice(2, 999);

	arr; // ["zero", "one"]

### 6.4 枚举

JavaScript 可以用 `for` 语句进行枚举。

	var i;
	for (i=0; i<arr.length; i++) {
		console.log(arr[i])
	}

### 6.5 混淆的地方

当属性名是小而连续的整数时，使用数组。否则，使用对象。

### 6.6 方法

数组的方法被存储在原型 `Array.prototype` 中。

给数组增加一个非整数属性，不会改变它的长度。

### 6.7 维度

	// ES6 Array.prototype.fill
	var arr_fill = [];
	arr_fill.length = 3;
	arr_fill.fill('fill'); // ['fill', 'fill', 'fill']

## part-7 正则表达式 <a id="part-7"></a>

JavaScript 的正则表达式借鉴自 Perl

### 7.1 一个例子

* (...) 表示一个捕获型分组
* (?:...) 表示一个非捕获型分组
* (...)? 重复 0 或 1 次，表示分组是可选的
* [...] 表示字符类
* [^...] 表示除之外的字符类
* {0,3} 表示重复的次数
* /^ ... $/ 表示匹配的开始和结束

	// reg url
	var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;


### 7.2 结构

	var reg = /[A-Za-z]+/gi;

### 7.3 元素

正则表达式选择 `|`

正则表达式序列：包含一个或多个正则表达式因子

正则表达式因子：可以是一个字符、一个有圆括号包围的组、一个字符类，或者是一个转义序列。

正则表达式转义：
* \d 等同于 [0-9]
* \s 等同于 [\f\n\r\t\u000B\u0020\u00A0\u2028\u2029] 表示空格
* \w 等同于 [0-9A-Z_a-z] 表示字母、数字和下划线

正则表达式分组
* 捕获型 `()`
* 非捕获型 `(?:)`

正则表达式类 `[aeiou]`

正则表达式类转义 `-` `/` `[` `\` `]` `^`

正则表达式量词
* {n}  n 表示匹配的次数
* ? 等同于 {0,1}
* * 等同于 {0,}
* + 等同于 {1,}


## part-8 方法 <a id="part-8"></a>

### Array
* array.concat(item...)
* array.slice(start, end)
* array.join(separator)

### Function
* function.apply(thisArg, argArray)
* function.bind(thisArg)

### Number
* number.toFixed(fractionDigits)
* number.toString(radix)   

### Object
* object.hasOwnProperty(name)

### RegExp
* regexp.exec(string)
* regexp.test(string)

### String
* string.charAt(pos)
* string.charCodeAt(pos)
* string.indexOf(searchString, position)
* string.lastIndexOf(searchString, position)
* string.slice(start, end)
* string.split(separator, limit)
* string.search(regexp)
* string.replace(searchValue, replaceValue)
* string.match(regexp)
* String.fromCharCode(number)

## part-9 代码风格 <a id="part-9"></a>
* 良好的注释
* 代码缩进
* 空格的使用
* 总是把语句块包含在花括号内
* 变量统一声明在函数体顶部

## part-10 优美的特性 <a id="part-10"></a>

函数是头等对象。函数是有词法作用域的闭包。

基于原型继承的动态对象。

对象字面量和数组字面量。

## JSON (JavaScript Object Notation) <a id="json"></a>

JSON 是一种轻量的数据交换格式。它是纯字符串。

JSON 建构于两种结构：
* "名称/值" 对的集合。名称必须用**双引号**包围。
* 值的有序列表。

两种结构可相互嵌套。

JSON 的值**只有**四种类型：
* 字符串
* 数字
* 布尔值 (true / false)
* 特殊值 null

在浏览器中，可以使用内置的 `JSON.stringify` 和 `JSON.parse` 把 JavaScript 对象和 JSON 字符串相互转换。