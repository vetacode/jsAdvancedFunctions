//SET TIMEOUT
//Syntax: let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

function hello() {
  console.log('Hai');
}
let setHello = setTimeout(hello, 3000);
