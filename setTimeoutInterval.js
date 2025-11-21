//SET TIMEOUT
//Syntax: let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

function hello() {
  console.log('Hai');
  return 'Hai!!';
}
let setHello = setTimeout(hello, 2000);

//Using parameters
function sayHi(name, sureName, kabar) {
  return `${hello()} ${name} ${sureName}, ${kabar}`; //kalo mau memasukkan function harus lgsg dijalankan () dlu
}

let sapa = setTimeout(sayHi, 2000, 'Justin', 'Bibir', 'Apo Kabare?');
setTimeout(() => {
  console.log(sayHi('Justin', 'Bibir', 'Apo Kabare?'));
}, 2000);

console.log(sayHi('Justin', 'Bibir', 'Apo Kabare?'));
console.log(sapa);
