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

function defer(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who1, who2) {
  console.log('Hello, ' + who1 + ' ' + who2);
}

let sayHiDefferred = defer(sayHi, 2000);
sayHiDefferred('Angel', 'Elgo');

//Using spread ...args
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
