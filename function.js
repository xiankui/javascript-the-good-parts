/**
 * 第4章 函数
 */

// 函数就是对象
function fn () {}

fn.__proto__ === Function.prototype ? console.log('fn.__proto__ === Function.prototype') : console.log('fn.__proto__ !== Function.prototype');
fn.prototype.constructor === fn && console.log('fn.prototype.constructor === fn');

// 函数字面量，
// 像用对象字面量创建对象一样，用函数字面量创建函数
var add = function (a, b) {
	return a + b;
}

add.__proto__ === Function.prototype && console.log('函数字面量与函数声明并无二致')
add.prototype.constructor === add && console.log('连构造器的指向都是一样的，唯一不同的是函数声明会提升到作用域的顶部')


/**
 * 函数调用之方法调用模式
 * 当函数被保存为对象的一个属性时，我们称它为一个方法。
 * 当方法调用时，this 被绑定到该对象，从而方法可以从对象中取值或修改对象
 */
var myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	}
}

myObject.increment();
console.log('当调用对象的方法时，对象被改变了', myObject.value);  // 1

/**
 * 函数调用之函数调用模式
 * 当函数表达式后面直接跟 `()` 时，就是函数调用模式
 * 此时，this 被绑定到了全局对象，应当小心处理
 */
myObject.double = function () {
	// 解决函数调用模式下，this 的指向问题
	var that = this;  // 这里（方法里）的 this 被绑定到对象 myObject

	var helper = function () {
		// 函数调用模式下的 this 被错误的绑定到了全局对象，注意修正
		that.value = add(that.value, that.value);
	}

	helper();
}

myObject.double();

console.log('函数调用模式下的 this 被换成了你期望的 that', myObject.value); // 2

/**
 * 函数调用之构造器调用模式
 * this 被绑定到 new 出的新对象上
 */
// 创建一个构造器函数。它构造一个带有 status 属性的对象
var Quo = function (string) {
	this.status = string;
}

// 给 Quo 所有实例提供一个名为 get_status 的公共方法
Quo.prototype.get_status = function () {
	return this.status;
}

// 构造一个 Quo 实例
var myQuo = new Quo('confused');
console.log('妥协的，令人困惑的，但依然大量使用的函数构造器', myQuo.status, myQuo.get_status())

Quo.__proto__ === Function.prototype && console.log('函数字面量的原型链依然指向 Function.prototype')
myQuo.__proto__ === Quo.prototype && console.log(
	'构造器实例的原型链指向了函数字面量的附带属性 prototype,' + 
	'\n 这里就知道为什么每个函数创建时都附带一个令人费解的 prototype 属性，'+ 
	'\n 这也是为什么每个函数都可以作为构造器函数调用，' +
	'\n 函数的 prototype 属性，就是构造实例的原型，为所有实例提供公共方法'
	)



/**
 * 函数调用之apply调用
 * this 被绑定到 apply 后的第一个参数上，第二个参数的数组被散列为方法的参数
 */
// 这里 this 被绑定到全局对象，因为不需要
var sum = add.apply(null, [3, 4]); // 7

/**
 * 免费奉送的参数，类数组 arguments
 */
var sum = function () {
	var i, sum = 0;

	for(i=0; i<arguments.length; i++) {
		sum += arguments[i];
	}

	return sum;
}

sum(1, 2, 3, 4, 5); // 15

/**
 * 处理异常
 */
var add = function (a, b) {
	// 异常处理代码，当函数遇到异常时，函数体提前终止，并抛出异常
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		}
	}

	return a + b;
}

// try ...catch 捕获异常
try {
	add('seven');	
} catch (e) {
	// 注意：catch 从句依然没有作用域；但是参数 `e` 具有作用域，对外不可见
	console.log(e.message)

	var var_from_catch = 'catch 从句中定义的变量依然是全局可见，但是参数 e 是全局不可见的。'
}


/**
 * 基本类型之间的原型链问题
 */
(Object.__proto__ === Function.__proto__)            &&
(Function.__proto__ === String.__proto__)            && 
(String.__proto__ === Number.__proto__)              &&
(Number.__proto__ === Array.__proto__)               &&
(Array.__proto__ === Function.prototype)             &&

(Function.prototype.__proto__ === Object.prototype)  &&
(String.prototype.__proto__ === Object.prototype)    &&
(''.__proto__.__proto__ === Object.prototype)        &&

(Object.prototype.__proto__ === null)                &&

console.log(
	'__proto__ 也就是 prototype-chain ，是原型链的连接关系。\n' +
	'prototype 是原型链指向的原型对象。\n' +
	'令人迷惑之处就是构造函数自带的 prototype 属性，它是实例的原型；而所有的 JavaScript 类型都可以看成是某种构造函数的实例！'
)

/**
 * 给所有构造函数（即类型）增加方法
 */
// String.method Array.method ...
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		// 给所有实例扩充原型方法
		this.prototype[name] = func;
	}
}

console.log('String.method , yes the function ', typeof String.method)
console.log('"string".method, sorry, but undefined ', typeof ''.method)

// 调用原型方法 Function.prototype.method ，扩充自身原型对象 String.prototype
String.method('trim', function () {
	return this.replace(/^\s+|\s+$/g, '');
})

console.log('now, every String instance has method trim ', typeof ''.trim)


/**
 * 闭包
 */
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

/**
 * 模块
 */
String.method('deentityify', function () {
	// 把字符对应表放入闭包内，而不用每次调用 deentityify 方法时都要执行一遍字符对应表
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	}

	// 返回 deentityify 方法
	return function () {

		// 执行字符替换
		return this.replace(/&([^&;]+);/g, function (a, b) {
			// a 为正则结果；b 为匹配因子
			var r = entity[b];
			return typeof r === 'string' ? r : a;
		});
	};
}());

console.log('deentityify &lt;&quot;&gt; result is:', '&lt;&quot;&gt;'.deentityify())

/**
 * 套用
 */
Function.method('curry', function () {
	var slice = Array.prototype.slice,
			args = slice.apply(arguments),
			that = this;

	return function () {
		return that.apply(null, args.concat(slice.apply(arguments)))
	}
})

var addTen = add.curry(10);
console.log('curry addTen plus 5:', addTen(5)); // 15

/**
 * 记忆
 */
var memoizer = function (memo, fundamental) {
	var shell = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fundamental(shell, n);
			memo[n] = result;
		}

		return result;
	};

	return shell;
};

// factorial is shell
var factorial = memoizer([1, 1], function (shell, n) {
	return n * shell(n -1);
});

console.log('memoizer factorial 10 is:', factorial(5)); // 120