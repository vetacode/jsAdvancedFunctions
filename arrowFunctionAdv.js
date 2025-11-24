//Normal/regular functions have “this”
let group = {
  title: 'Our Group',
  students: ['John', 'Pete', 'Alice'],

  showList() {
    this.students.forEach(
      function (student) {
        console.log(this.title + ': ' + student);
      } //normal function have this, so the title returned undefined
    );
  },
};

group.showList();

//Arrow functions have NO “this”
let group2 = {
  title: 'Our Group',
  students: ['John', 'Pete', 'Alice'],

  showList() {
    this.students.forEach(
      (student) => {
        console.log(this.title + ': ' + student);
      } //arrow function have no this inside showList(), it will use this from the outer lex env
    );
  },
};

group2.showList();

//Arrow functions can’t run with NEW (for constructor)
//Arrow functions doesn't create BINDing, coz doesn't have this.
//Arrow functions also have NO ARGUMENTS variable. => ini berguna untuk decorator, ketika ingin forward call menggunakan current this & arguments

//Example using regular function: has its own arguments, so this couldnt borrow arguments from lex env => undefined
function defer(f, ms) {
  return function () {
    setTimeout(function () {
      f.apply(this, arguments);
    }, ms);
  };
}

function sayHi(who) {
  console.log('Hello, ' + who); //Hello, undefined
}

let sayHiDefferred = defer(sayHi, 2000);
sayHiDefferred('Angel');

//USING ARROW FUNCTION, it works borrowing arguments from lex env above
function defer2(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi2(who1, who2) {
  console.log('Hello, ' + who1 + ' ' + who2); //Hello Angel Elgo
}

let sayHiDefferred2 = defer2(sayHi2, 2000);
sayHiDefferred2('Angel', 'Elgo');

//Using spread ...args => more modern syntax coz it returns real array
function delay(f, ms) {
  return function (...args) {
    setTimeout(() => f.call(this, ...args), ms);
  };
}

function sayHello(name1, name2) {
  console.log('Hai, ' + name1 + ', ' + name2);
}

let sayHelloDeffered = delay(sayHello, 1000);
sayHelloDeffered('Tuti', 'Dudi');

//THATS WHY arrow functions are excellent for decorators: they naturally forward this and arguments.
