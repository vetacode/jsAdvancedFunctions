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
