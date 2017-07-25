/**
 * JavaScript 对象和 JSON 字符串
 */
var arr = [
	{
		id: 0,
		name: 'alibaba'
	}, 
	{
		id: 1,
		name: 'tecent'
	}
];

var arr_str = '[{"id":0,"name":"alibaba"},{"id":1,"name":"tecent"}]';

console.log(JSON.stringify(arr) === arr_str); // true