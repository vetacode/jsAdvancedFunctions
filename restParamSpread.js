//Basics additon function
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2, 3, 4, 5)); //only first 2 arguments will passed to function parameters, the rest will be ignored

//Solution: REST PARAMETERS '...'

function sumAll(...params) {
  let sum = 0;
  for (let arg of params) {
    sum += arg;
  }
  return sum;
}

console.log(sumAll(1)); // 1
console.log(sumAll(1, 2)); // 3
console.log(sumAll(1, 2, 3, 4, 5)); // 15

function totalSum(...all) {
  let sum = 0;
  for (let num of all) {
    sum += num;
  }
  return sum;
}
console.log(totalSum(1, 2, 3, 4, 5)); //15

//THE REST ARRAY
function showName(firstName, lastName, ...titles) {
  console.log(firstName);
  console.log(lastName);
  console.log(firstName + ' ' + lastName); // Julius Caesar

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  console.log(titles);
  console.log(titles[0]); // Consul
  console.log(titles[1]); // Imperator
  console.log(titles.length); // 2
}

showName('Julius', 'Caesar', 'Consul', 'Imperator');

//ARGUMENTS variable
//it is an array-like variable, it's iterable. But cannot use array method i.e. arguments.map(...)
function showName2() {
  console.log(arguments);
  console.log(arguments.length);
  console.log(arguments[0]);
  console.log(arguments[1]);

  // it's iterable
  for (let arg of arguments) console.log(arg);
}

// shows: 2, Julius, Caesar
showName2('Julius', 'Caesar');

// shows: 1, Ilya, undefined (no second argument)
showName2('Ilya');

//ARROW FUNCTION Dont have 'arguments' object, neither 'this'.
function f() {
  let showArg = () => arguments[0];
  return showArg();
}
console.log(f(1)); // 1
