'use strict';

//The "new Function" syntax: let func = new Function ([arg1, arg2, ...argN], functionBody);

let sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2)); // 3

let sayHi = new Function('console.log("Hello")');
sayHi(); // Hello (muncul di node.js)

//new Function allows to turn any string into a function. For example, we can receive a new function from a server and then execute it:
// let str = ... receive the code from a server dynamically ...

let str = '"Joel"'; //literal string

let func = new Function(`console.log(${str})`);
func(); //Joel
// console.log(func());

//function created using new Function, its [[Environment]] is set to reference not the current Lexical Environment, but the global one.
//regular function:
function getFunc() {
  let value = 'test';

  let func = function () {
    console.log(value); //test
  };

  return func;
}
getFunc()(); // "test", from the Lexical Environment of getFunc

//using new Function
function getFunc2() {
  let value = 'test';

  let func = new Function('console.log(value)');

  return func;
}
// getFunc2()(); // error: value is not defined

//Contoh actual case: perbankan finance
// data JSON dari server:
/*
{
  "rule": "return user.age >= 18 && user.salary > 3000000;"
}
*/

let ruleFunction = new Function('user', response.rule);

let isValid = ruleFunction({ age: 20, salary: 5000000 });

console.log(isValid);
