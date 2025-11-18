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
console.log(sumAll(1, 2, 3)); // 6
