'use strict';

var message = 'Hi';
console.log(message); // Hi

//“var” has no block scope

if (true) {
  var test = true; // use "var" instead of "let"
}
console.log(test); // true, the variable lives after if

if (true) {
  let test = true; // use "let"
}
console.log(test); // ReferenceError: test is not defined

for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}
console.log(i); // 10, "i" is visible after loop, it's a global variable
console.log(one); // 1, "one" is visible after loop, it's a global variable

//If a code block is inside a function, then var becomes a function-level variable:
function sayHi() {
  if (true) {
    var phrase = 'Hello';
  }

  console.log(phrase); // works
}
sayHi();
console.log(phrase); // ReferenceError: phrase is not defined

//“var” tolerates redeclarations
let user;
// let user; // SyntaxError: 'user' has already been declared

var user2 = 'Pete';

var user2 = 'John'; // this "var" does nothing (already declared)
// ...it doesn't trigger an error
console.log(user2); // John

//“var” variables can be declared below their use
//it is called “hoisting” (raising) behavior, because all var are “hoisted” (raised) to the top of the function.
function sayHi() {
  phrase = 'Hello';

  console.log(phrase);

  var phrase;
}
sayHi();

//same as
function sayHi() {
  var phrase;

  phrase = 'Hello';

  console.log(phrase);
}
sayHi();

//even same as:
function sayHi() {
  phrase = 'Hello'; // (*)

  if (false) {
    var phrase;
  }

  console.log(phrase);
}
sayHi();

//Declarations are hoisted, but assignments are not.
function sayHi() {
  console.log(phrase);

  var phrase = 'Hello';
}
sayHi();

function sayHi() {
  var phrase; // declaration works at the start...

  console.log(phrase); // undefined

  phrase = 'Hello'; // ...assignment - when the execution reaches it.
}

sayHi();

//IIFE: “immediately-invoked function expressions”
(function () {
  console.log('Parentheses around the function');
})();

(function () {
  console.log('Parentheses around the whole thing');
})();

!(function () {
  console.log('Bitwise NOT operator starts the expression');
})();

+(function () {
  console.log('Unary plus starts the expression');
})();

/**SUMMARY:
 * var variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
var declarations are processed at function start (script start for globals).
 */
