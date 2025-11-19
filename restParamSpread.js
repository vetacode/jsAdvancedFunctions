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

//Can Convert ITERABLES too
//Convert String into arr of characters
let str = 'Master';
console.log([...str]); //[ 'M', 'a', 's', 't', 'e', 'r' ]
console.log(...str); //M a s t e r
console.log([str]); //[ 'Master' ]
console.log(str.length);
console.log([...str].length);
console.log(typeof [...str]);
// console.log(typeof (...str)); //invalid syntax

//Alternatives convert iterable strings into Array using ARRAY.FROM
//the results is same as [...str]
let hello = 'Hai';
console.log(Array.from(hello));

/**
 * But for Object: There is difference between Array.from(obj) and [...obj]:
Array.from operates on both array-likes and iterables.
The spread syntax works only with iterables.
 */

//SPREAD can COPY an ARRAY
//methods
let fruits = ['banana', 'mango', 'orange'];
let promo = ['melon'];
let free = ['salak'];

console.log(fruits.slice()); //cloning
console.log([...fruits] == fruits);

let concat = fruits.concat(promo, free);
console.log(concat);
let copyMerged = [...fruits, ...promo, ...free];
console.log(copyMerged);
//ARRAY Always be compared by reference, thus it will always false
console.log(concat == copyMerged); //false
//COMPARE ARRAY BY VALUE
console.log(JSON.stringify(concat) == JSON.stringify(copyMerged)); //true

let arrNum = [1, 2, 3];

let arrCopy = [...arrNum]; // spread the array into a list of parameters
// then put the result into a new array

// do the arrays have the same contents?
console.log(JSON.stringify(arrNum) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
console.log(arrNum === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arrNum.push(4);
console.log(arrNum); // 1, 2, 3, 4
console.log(arrCopy); // 1, 2, 3
arrCopy.push(4);
console.log(arrCopy); // 1, 2, 3, 4

//COPY an OBJECT
let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // spread the object into a list of parameters
// then return the result in a new object
console.log(objCopy);

// do the objects have the same contents?
console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
console.log(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
