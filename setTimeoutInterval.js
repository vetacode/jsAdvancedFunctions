//SET TIMEOUT
//Syntax: let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

function hello() {
  // console.log('Hai');
  return 'Hai!!';
}
let setHello = setTimeout(hello, 2000);

//Using parameters
function sayHi(name, sureName, kabar) {
  return `${hello()} ${name} ${sureName}, ${kabar}`; //kalo mau memasukkan function harus lgsg dijalankan () dlu
}

let sapa = setTimeout(sayHi, 2000, 'Justin', 'Bibir', 'Apo Kabare?');
setTimeout(() => {
  // console.log(sayHi('Justin', 'Bibir', 'Apo Kabare?'));
}, 2000);

// console.log(sayHi('Justin', 'Bibir', 'Apo Kabare?'));

setTimeout(() => {
  // console.log(hello());
}, 1000);

//CLEAR TIMEOUT
//cancelling setTimeout
let cobaClear = setTimeout(() => {
  console.log('Halooo');
}, 1000);
// console.log(cobaClear);
clearTimeout(cobaClear); //timer stop, log ga keluar
// console.log(cobaClear);

//SET INTERVAL
//Syntax: let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
// repeat with the interval of 2 seconds
let timerId = setInterval(() => {
  // console.log('tick');
}, 1000);

// after 5 seconds stop
setTimeout(() => {
  // clearInterval(timerId);
  // console.log('stop');
}, 5000);

//NESTED TIMEOUT
// let nested = setTimeout(function click() {
//   console.log('click');
//   nested = setTimeout(click, 1000);
// }, 5000);

// setTimeout(() => {
//   console.log('STOP');
//   clearTimeout(nested);
// }, 10000);

//Comparing setInterval vs nested setTimeout
// setInterval(function () {
//   for (let i = 0; i <= 5; i++) {
//     console.log(i);
//   }
// }, 1000);

// let nestedInterval = setTimeout(function interval() {
//   for (let i = 0; i <= 5; i++) {
//     console.log(i);
//   }
//   nestedInterval = setTimeout(interval, 3000);
// }, 1000);

/**TASK 1
 * Output every second
importance: 5
Write a function printNumbers(from, to) that outputs a number every second, starting from from and ending with to.

Make two variants of the solution.

Using setInterval.
Using nested setTimeout.

 */

function printNumbers(from, to) {
  let current = from;
  let timerId = setInterval(() => {
    console.log(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}
// printNumbers(0, 5);

function printNumbersTimeout(from, to) {
  let current = from;

  let nestedTimeout = setTimeout(function add() {
    console.log(current);
    nestedTimeout = setTimeout(add, 1000);

    if (current == to) {
      clearTimeout(nestedTimeout);
    }
    current++;
  }, 1000);
}

// printNumbersTimeout(6, 11);

/**TASK 2
 *What will setTimeout show?
importance: 5
In the code below there’s a setTimeout call scheduled, then a heavy calculation is run, that takes more than 100ms to finish.

When will the scheduled function run?

After the loop.
Before the loop.
In the beginning of the loop.
What is alert going to show?

let i = 0;

setTimeout(() => alert(i), 100); // ?

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}
 */

let i = 0;

setTimeout(() => console.log(i), 100); // 100000000 after loop finished

// assume that the time to execute this function is >100ms
for (let j = 0; j < 100000000; j++) {
  i++;
}
//Any setTimeout will run only after the current code has finished.

// let i = 0;
// for (i = 0; i < 5; i++) {
//   //menggunakan outer i
// }
// console.log(i); // sehingga outer i berubah, i akhir adalah 5

// let i = 0;
// for (let i = 0; i < 5; i++) {
//   //menggunakan inner i
// }
// console.log(i); // sehingga outer i tidak berubah, masih tetap 0
