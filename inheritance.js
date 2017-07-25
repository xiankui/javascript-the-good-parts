/**
 * 伪类
 */
var Mannal = function (name) {
	this.name = name;
}

Mannal.prototype.get_name = function () {
	return this.name;  // 事实上 new 出来的对象可以直接访问它的属性，而不需要通过函数来桥接；
}

Mannal.prototype.says = function () {
	return this.saying || '';
}


var Cat = function (name) {
		this.name = name;
		this.saying = 'meow';
}

// set Cat.prototype chain to Mannal.prototype
Cat.prototype = new Mannal();

Cat.prototype.get_name = function () {
	return this.says() + ' ' + this.name + ' ' + this.says();
}

var myCat = new Cat('Guanfu Mao');
var myCat_another = new Cat('DuDu Mao');


// 原型链相同，指向同一个函数
console.log(myCat.says === myCat_another.says); // true


/**
 * 函数化，用函数化的方式构造对象
 */
var mannal = function (spec) {
	var that = {};

	that.get_name = function () {
		return spec.name;
	}

	that.says = function () {
		return spec.saying || '';
	}

	return that;
}

var cat = function (spec) {
	spec.saying = spec.saying || 'meow';

	var that = mannal(spec);

	// 调用父类的方法
	var super_get_name = that.get_name;

	that.get_name = function () {
		// return that.says() + ' ' + spec.name + ' ' + that.says();
		return super_get_name() + ', get_name proxy by super_get_name'
	}

	return that;
}

var _myCat = cat({name: 'Guanfu Mao'})
var _myCat_another = cat({name: 'DuDu Mao'});

// 每个对象的属性和方法都是私有化的
console.log(_myCat.says === _myCat_another.says); // false