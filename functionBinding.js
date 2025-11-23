//When do callback will LOSING “this”
let user = {
  name: 'Joni',
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
};

setTimeout(user.sayHi, 1000); //Hello undefined
user.sayHi();

//SOLUTION
// 1. using function wrapper
setTimeout(() => user.sayHi(), 1000);

//2. BIND
//it results special function-like  "exotic object"
// Syntax: let boundFunc = func.bind(context);

let cust = {
  name: 'Gugi',
};

function sayHey(phrase) {
  console.log(phrase + ', ' + this.name + '!!'); //Gugi
}

let boundFunc = sayHey.bind(cust);
boundFunc('Hallo'); // Argument will go to the original function parameter sayHey()

let user2 = {
  name: 'Alice',
  sayHi() {
    console.log(`Hello, ${this.name}`); //Hello, Alice
  },
};

let sayHello = user2.sayHi.bind(user2);
sayHello();

setTimeout(sayHello, 1000); //Hello, Alice (after 1sec)
user2 = {
  sayHello() {
    console.log('Another user in setTimeout!');
  },
};
user2.sayHello();

//BIND ALL => using for.. in
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}

//PARTIAL FUNCTIONS: functions has some part of parameters fixed
//Binding arguments. SYNTAX: let bound = func.bind(context, [arg1], [arg2], ...);
function kali(a, b) {
  return a * b;
}
let double = kali.bind(null, 2);

console.log(double(3)); //6
console.log(double(2)); //4
console.log(double(1)); //2

//Going partial without context
function partial(func, ...argsBound) {
  return function (...args) {
    // (*)
    return func.call(this, ...argsBound, ...args);
  };
}

// Usage:
let user3 = {
  firstName: 'John',
  say(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}!`);
  },
};

//Partial Method with fixed first argument (time)
user3.sayNow = partial(
  user3.say,
  new Date().getHours() + ': ' + new Date().getMinutes()
);

user3.sayNow('Hello');

//Soal 1. Karena assignment fn tidak mengikat context user sehingga kehilangan this
let pengguna = {
  name: 'Jeju',
  sayName() {
    console.log(this.name);
  },
};

// let fn = pengguna.sayName.bind(pengguna);
let fn = () => {
  pengguna.sayName();
};
fn();

//Soal 2.
let counter = {
  value: 0,
  add() {
    this.value++;
    console.log(this.value);
  },
};

let btn = document.querySelector('#btn');
btn.addEventListener('click', counter.add);
