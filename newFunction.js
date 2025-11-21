'use strict';

//The "new Function" syntax: let func = new Function ([arg1, arg2, ...argN], functionBody);

let sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2)); // 3

let sayHi = new Function('return ("Hello")'); //cannot use console.log() here

console.log(sayHi()); // Hello
