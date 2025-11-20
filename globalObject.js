'use strict';

console.log('Hello');
// is the same as
global.console.log('Hello');

var gVar = 5;

console.log(global.gVar); // 5 (became a property of the global object)
