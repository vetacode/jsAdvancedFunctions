//CODE BLOCKS
{
  let say = 'Hello';
  console.log(say);
}

{
  let say = 'Goodby';
  console.log(say);
}

if (true) {
  let i = 5;
  console.log(i); //5
}
// console.log(i); //error, out of schope

for (let i = 0; i < 5; i++) {
  console.log(i);
}
// console.log(i); //error, even visually i is outside the scope {}, but its considered as part of {} scope

//NESTED FUNCTIONS
function sayHiBye(firstName, lastName) {
  // helper nested function to use below
  function getFullName() {
    return firstName + ' ' + lastName;
  }

  console.log('Hello, ' + getFullName());
  console.log('Bye, ' + getFullName());
}
sayHiBye('Steve', 'Jonan');

//function returning function
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
