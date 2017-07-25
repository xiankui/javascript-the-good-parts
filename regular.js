/**
 * parse_url
 */
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = 'http://www.ora.com:80/goodparts?q#fragment';

var result = parse_url.exec(url)


/**
 * 正则表达式选择
 */
var reg_or = /[A-Za-z]+|[0-9]+/;

console.log('hi123'.match(reg_or)); // 'hi'
console.log('123hi'.match(reg_or)); // '123'