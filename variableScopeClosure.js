//CODE BLOCKS
{
  let say = 'Hello';
  console.log(say);
}

{
  let say = 'Goodby';
  console.log(say);
}

if (true) {
  let i = 5;
  console.log(i); //5
}
// console.log(i); //error, out of schope

for (let i = 0; i < 5; i++) {
  console.log(i);
}
// console.log(i); //error, even visually i is outside the scope {}, but its considered as part of {} scope

//NESTED FUNCTIONS
function sayHiBye(firstName, lastName) {
  // helper nested function to use below
  function getFullName() {
    return firstName + ' ' + lastName;
  }

  console.log('Hello, ' + getFullName());
  console.log('Bye, ' + getFullName());
}
sayHiBye('Steve', 'Jonan');

//function returning function
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

/**LEXICAL ENVIRONMENT
 * is the internal (hidden) accociated Object, a specification object (theoritically)
 * steps:
 * 1. varibale is a value, which are the properties of internal special object. start with uninitialized
 * 2. function declaration is also a value, which instantly fully initialized
 * 3. Innner and outer lexical environment
 * 4. returning a function
 * function has a hidden prop named [[Environment]] that keeps the reference to the lexical env where the function was created
 */

//CLOSURE
//is a function that remembers its outer variables and can access them.
//All functions in JS is a closure: they remember where they were created (using [[Environment]] prop), and can access outer variables

//GARBAGE COLLECTION
function f() {
  let value = 0;

  return function () {
    return (value += 1);
    // return ++value //same as this
  };
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
let h = f();
console.log(g()); // 1
console.log(g()); // 2
console.log(h()); // 1 ==> its different lexical environment, starting from scratch
console.log(g()); // 3
console.log(h()); // 2 ==> continue

function f2() {
  let value = Math.random();

  return function () {
    console.log(value);
  };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f2(), f2(), f2()];

//Showing Current Value is used
function makeAdder(x) {
  return function (y) {
    return x + y; // x comes from the lexical environment where this function was created
  };
}

let add5 = makeAdder(5);
console.log(add5(3)); // 8  (x = 5 stored in the environment)
console.log(makeAdder(5)(3)); // 8

for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2
  }, 10);
}

for (var i = 0; i < 3; i++) {
  //var will only use the last variable created
  setTimeout(function () {
    console.log(i); // 3, 3, 3
  }, 10);
}

function sum(a, b) {
  return a + b;
}

function decorator(fn) {
  return function (a, b) {
    return 'hasilnya adalah: ' + fn(a, b);
  };
}

console.log(decorator(sum)(1, 3));
