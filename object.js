
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


var flight = {
  airline: "Oceanic",
  number: 815,
  "not-identifier": "非标识符属性必须加引号",
  departure: {
    city: "Sydney"
  }
};

var fake = Object.beget(flight);


