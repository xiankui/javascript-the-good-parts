/**
 * 数组
 */
var arr = ['zero', 'one'];

arr[1000] = 'thousand';

arr.length; // 1001

arr[10]; // undefined	


arr.splice(2, 999)


/**
 * 枚举
 */
var i;
for (i=0; i<arr.length; i++) {
	console.log(arr[i])
}