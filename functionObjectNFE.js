//The “name” property
function sayHi() {
  console.log('Hi');
}
console.log(sayHi.name); // sayHi

function f(sayHi = function () {}) {
  console.log(sayHi.name); // sayHi (works!)
}

f();

let user = {
  sayHi() {
    // ...
  },

  sayBye: function () {
    // ...
  },
};
console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye

//The “length” property
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2

//CUSTOM PROPERTIES
function sayHi() {
  console.log('Hi');

  // let's count how many times we run
  sayHi.counter++;
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

console.log(`Called ${sayHi.counter} times`); // Called 2 times

//Function properties can replace closures sometimes
function makeCounter() {
  // instead of:
  // let count = 0

  function counter() {
    return counter.count++;
  }

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1

//The main difference is that if the value of count lives in an outer variable, then external code is unable to access it
function makeCounter() {
  function counter() {
    return counter.count++;
  }

  counter.count = 0;

  return counter;
}

let counter2 = makeCounter();

counter2.count = 10;
console.log(counter2()); // 10

//Named Function Expression (NFE)

let sayHi2 = function (who) {
  console.log(`Hello, ${who}`);
};

//add name:
let sayHi3 = function func(who) {
  console.log(`Hello, ${who}`); //Hello, Doni
};
sayHi3('Doni');

/**Special thing about the name func
 * 1. It allows the function to reference itself internally.
 * 2. It is not visible outside of the function.
 */

let sayHi4 = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func('Guest'); // use func to re-call itself
  }
};

sayHi4(); // Hello, Guest

// But this won't work:
// func(); // Error, func is not defined (not visible outside of the function)

let sayHi5 = function (who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    sayHi5('Guest'); // Error: sayHi is not a function
  }
};

let welcome = sayHi5;
sayHi5 = null;

// welcome(); // Error, the nested sayHi call doesn't work any more!

//Solution: use internal function name: func
let sayHi6 = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func('Guest'); // Now all fine
  }
};

let welcome2 = sayHi6;
sayHi6 = null;

welcome2(); // Hello, Guest (nested call works)

/**TASK 1
 * Set and decrease for counter
importance: 5
Modify the code of makeCounter() so that the counter can also decrease and set the number:

counter() should return the next number (as before).
counter.set(value) should set the counter to value.
counter.decrease() should decrease the counter by 1.
See the sandbox code for the complete usage example.

P.S. You can use either a closure or the function property to keep the current count. Or write both variants.
 */

function makeCounter2() {
  let count = 0;

  function counter() {
    return ++count;
  }

  counter.set = (value) => (count = value);

  counter.decrease = () => --count;

  return counter;
}

let counter3 = makeCounter2();

console.log(counter3());
console.log(counter3());
console.log(counter3());
console.log(counter3());
console.log(counter3.decrease());
console.log(counter3.decrease());
console.log(counter3.decrease());
console.log(counter3.decrease());
console.log(counter3.decrease());
console.log(counter3.decrease());
console.log(counter3.set(10));

/**TASK 2
 * Sum with an arbitrary amount of brackets
importance: 2
Write function sum that would work like this:

sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
P.S. Hint: you may need to setup custom object to primitive conversion for your function.
 */

function sum(a) {
  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function () {
    return currentSum;
  };
  return f;
}
let y = +sum(1)(2);
let x = sum(1)(2)(3);
console.log(y); // 3; // 1 + 2
console.log(Number(x)); // 6; // 1 + 2 + 3
console.log(+sum(5)(-1)(2)); // 6
console.log(+sum(6)(-1)(-2)(-3)); // 0
console.log(+sum(0)(1)(2)(3)(4)(5)); // 15
