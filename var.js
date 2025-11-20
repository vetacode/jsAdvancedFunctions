'use strict';

var message = 'Hi';
alert(message); // Hi

//“var” has no block scope

if (true) {
  var test = true; // use "var" instead of "let"
}
alert(test); // true, the variable lives after if

if (true) {
  let test = true; // use "let"
}
alert(test); // ReferenceError: test is not defined
