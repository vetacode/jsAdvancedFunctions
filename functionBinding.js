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

let fn = pengguna.sayName.bind(pengguna);
// let fn = () => pengguna.sayName();
fn();

//Soal 2.
let counter = {
  value: 0,
  add() {
    this.value++;
    console.log(this.value);
  },
};

// let btn = document.querySelector('#btn');
// btn.addEventListener('click', counter.add.bind(counter));

//Soal 3.

let name = 'Global';

let obj = {
  name: 'Obj',
  arrow: () => console.log(this.name),
  normal() {
    console.log(this.name);
  },
  binded: function () {
    console.log(this.name);
  }.bind({ name: 'Bound' }),
};

obj.arrow();
obj.normal();
obj.binded();

let extracted = obj.normal;
extracted();

/**
 * 1. obj.arrow() → "Global"
Arrow function tidak punya this, jadi mengambil dari lingkup luar (global).

2. obj.normal() → "Obj"
Method call → this = obj.

3. obj.binded() → "Bound"
Fungsi di-bind dengan { name: "Bound" }, sehingga this terkunci.

4. extracted() → "Global" atau error (karena this jadi default binding)
Function dipanggil tanpa objek → call-site tidak punya pemanggil.
 */

/**TASK 2
 * function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
 */

function f() {
  console.log(this.name);
}

f = f.bind({ name: 'John' }).bind({ name: 'Pete' });
f(); // John
//The exotic bound function object returned by f.bind(...) remembers the context (and arguments if provided) only at creation time.
// A function cannot be re-bound.

/**TASK 3
 * function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // what will be the output? why?
 */

function sayHi() {
  console.log(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: 'John',
});

console.log(bound.test); // undefined
//The result of bind is another object. It does not have the test property.

/**TASK 4
 * Fix a function that loses "this"
importance: 5
The call to askPassword() in the code below should check the password and then call user.loginOk/loginFail depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right (other lines are not to be changed).

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

askPassword(user.loginOk, user.loginFail);//failed to log in (user name is undefined)
 */

function askPassword(ok, fail) {
  let password = 1234;
  if (password == 'rockstar') ok();
  else fail();
}

let user4 = {
  name: 'John',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },
};

askPassword(user4.loginOk.bind(user), user4.loginFail.bind(user)); //Joni failed to log in
