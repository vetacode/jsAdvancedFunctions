//When do callback will LOSING “this”
let user = {
  name: 'Joni',
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
};

setTimeout(user.sayHi, 1000); //Hello undefined
user.sayHi();

//SOLUTION => using function wrapper
setTimeout(() => user.sayHi(), 1000);
