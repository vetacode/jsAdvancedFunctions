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

//SPREAD SYNTAX
//It converts array into a list of arguments

//EXAMPLE
console.log(Math.max(3, 5, 1, 7)); //7
//to do the arguments passing we cannot do:
let num = 3;
5;
1;
7;
console.log(Math.max(num)); //3
//OR
let numArr = [3, 5, 1, 7];
console.log(Math.max(numArr)); //NaN

//USE SPREAD to do the arguments passing
let arr = [3, 5, 1, 7];
console.log(Math.max(...arr)); //7

//Can combined with normal values
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
console.log(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25

//Can MERGED ARRAYS with normal values
let merged = [0, ...arr1, 2, ...arr2];
console.log(merged); //combination of number and array merged

//Can Convert Iterables too
//Convert String into arr of characters
let str = 'Master';
console.log([str]);
console.log([...str]);
