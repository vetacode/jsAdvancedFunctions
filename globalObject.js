'use strict';

console.log('Hello');
// is the same as
global.console.log('Hello');

var gVar = 5;

console.log(global.gVar); // 5 (became a property of the global object)

//Cannot using let
let gLet = 5;
alert(window.gLet); // undefined (doesn't become a property of the global object)

//Using for polyfills
if (!window.Promise) {
  alert('Your browser is really old!');
}

if (!window.Promise) {
  // window.Promise = ... // custom implementation of the modern language feature
}
