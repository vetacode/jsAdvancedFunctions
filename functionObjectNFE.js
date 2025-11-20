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
