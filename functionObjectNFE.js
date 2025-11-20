//The “name” property
function sayHi() {
  alert('Hi');
}

alert(sayHi.name); // sayHi

function f(sayHi = function () {}) {
  alert(sayHi.name); // sayHi (works!)
}

f();

let user = {
  sayHi() {
    // ...
  },

  sayBye: function () {
    // ...
  },
};

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
