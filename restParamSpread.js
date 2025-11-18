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
