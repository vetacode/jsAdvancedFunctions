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

let nestedInterval = setTimeout(function interval() {
  for (let i = 0; i <= 5; i++) {
    console.log(i);
  }
  nestedInterval = setTimeout(interval, 3000);
}, 1000);
