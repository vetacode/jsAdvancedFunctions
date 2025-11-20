'use strict';

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

  return function (a) {
    return (count += a);
  };
}

let counter = makeCounter();

console.log(counter(0)); // 0
console.log(counter(2)); // 2
console.log(counter(3)); // 5

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

//NO CLOSURE
function noClosure() {
  let data = { name: 'Andi' };
  console.log('inner log:', data);
  return data;
}

console.log(noClosure());
console.log(noClosure());
console.log(noClosure());
// let no = noClosure();

// console.log(no()); //no is not a function
// console.log(no);
// console.log(no);

//WITH CLOSURE
function withClosure() {
  let data = { name: 'Andi' };
  console.log('inner log:', data);
  return function fn() {
    console.log(data);
    return data;
  };
}

console.log(withClosure());
let wit = withClosure();
console.log(wit());
console.log(wit());

wit = null; //GC working to erase withClosure() function
// console.log(wit()); //wit is not a function

/**TASK 1
 * Does a function pickup latest changes?
importance: 5
The function sayHi uses an external variable name. When the function runs, which value is it going to use?

let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // what will it show: "John" or "Pete"?
Such situations are common both in browser and server-side development. A function may be scheduled to execute later than it is created, for instance after a user action or a network request.

So, the question is: does it pick up the latest changes?
 */
let name = 'John';

function sayHi() {
  console.log('Hi, ' + name);
}
sayHi(); //Hi, John
name = 'Pete';
sayHi(); //Hi, Pete

/**TASK 2
 * Which variables are available?
importance: 5
The function makeWorker below makes another function and returns it. That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the invocation place, or both?

function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// create a function
let work = makeWorker();

// call it
work(); // what will it show?
Which value it will show? “Pete” or “John”?
 */

function makeWorker() {
  let nama = 'Pete';

  return function () {
    console.log(nama); //Pete
  };
}

let nama = 'John'; // variable nama ini baru akan diambil apabila di dalam function makeWorker() tidak ada variable nama

// create a function
let work = makeWorker();

// call it
work(); // what will it show?

/**TASK 3
 * Are counters independent?
importance: 5
Here we make two counters: counter and counter2 using the same makeCounter function.

Are they independent? YES
What is the second counter going to show? 0,1 or 2,3 or something else? 0, 1

function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

alert( counter2() ); // ?
alert( counter2() ); // ?
 */

function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

console.log(counter1()); // 0
console.log(counter1()); // 1

console.log(counter2()); // ?
console.log(counter2()); // ?

/**TASK 4
 * Counter object
importance: 5
Here a counter object is made with the help of the constructor function.

Will it work? What will it show?

function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
 */

function Counter() {
  let count = 0;

  this.up = function () {
    return ++count;
  };
  this.down = function () {
    return --count;
  };
}

let counter3 = new Counter();

console.log(counter3.up()); // 1
console.log(counter3.up()); // 2
console.log(counter3.down()); // 1

/**TASK 5
 * Function in if
importance: 5
Look at the code. What will be the result of the call at the last line?

let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

sayHi();
 */

let phrase = 'Hello';
if (true) {
  let user = 'John';

  function sayHi() {
    //error sayHi() value is not used
    console.log(`${phrase}, ${user}`);
  }
}
sayHi(); //this call is cannot reach inside if{} codeblock, coz thats not a function

/**TASK 6
 * Sum with closures
importance: 4
Write function sum that works like this: sum(a)(b) = a+b.

Yes, exactly this way, using double parentheses (not a mistype).

For instance:

sum(1)(2) = 3
sum(5)(-1) = 4
 */

function sum(a) {
  return function (b) {
    return a + b;
  };
}

console.log(sum(1)(2)); // 3
console.log(sum(5)(-1)); // 4

/**TASK 7
 * Is variable visible?
importance: 4
What will be the result of this code?

let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
P.S. There’s a pitfall in this task. The solution is not obvious.
 */

let x = 1;

function func() {
  console.log(x); // cannot access x before initialization

  //THE DEAD ZONES: temporary unusability of a variable (from start of code block { until let)
  let x = 2;
}
// func();

/**TASK 8
 * Filter through function
importance: 5
We have a built-in method arr.filter(f) for arrays. It filters all elements through the function f. If it returns true, then that element is returned in the resulting array.

Make a set of “ready to use” filters:

inBetween(a, b) – between a and b or equal to them (inclusively).
inArray([...]) – in the given array.
The usage must be like this:

arr.filter(inBetween(3,6)) – selects only values between 3 and 6.
arr.filter(inArray([1,2,3])) – selects only elements matching with one of the members of [1,2,3].
For instance:

/.. your code for inBetween and inArray /
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
Open a sandbox with tests.
 */

function inBetween(a, b) {
  return function (x) {
    return x >= a && x <= b;
  };
}

function inArray(arr) {
  return function (x) {
    return arr.includes(x);
  };
}

let arr2 = [1, 2, 3, 4, 5, 6, 7];

console.log(arr2.filter(inBetween(3, 6))); // 3,4,5,6
console.log(arr2.filter(inArray([1, 2, 10]))); // 1,2
