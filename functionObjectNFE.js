//The “name” property
function sayHi() {
  alert('Hi');
}
alert(sayHi.name); // sayHi

function f(sayHi = function () {}) {
  alert(sayHi.name); // sayHi (works!)
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
alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye

//The “length” property
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2

//CUSTOM PROPERTIES
function sayHi() {
  alert('Hi');

  // let's count how many times we run
  sayHi.counter++;
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

alert(`Called ${sayHi.counter} times`); // Called 2 times

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
alert(counter()); // 0
alert(counter()); // 1

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
alert(counter2()); // 10
