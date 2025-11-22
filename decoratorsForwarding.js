'use strict';

function slow(x) {
  //CPU intensive job
  console.log(`called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x);
    cache.set(x, result);
    return result;
  };
}

// slow = cachingDecorator(slow);
// console.log('data from cache:', slow(1));
// console.log('data from cache:', slow(2));
// console.log('data from cache:', slow(2));
// console.log('data from cache:', slow(2));
// console.log('data from cache:', slow(1));

function slow(x) {
  //heavy CPU works function
  console.log(
    `this ${x} has been proceed from scratch, just 1 ${x} printed result below, afterwards the ${x} returned from cache`
  );
  return x;
}

function decoratorCache(func) {
  let cache = new Map();
  // console.log(cache);
  return function (x) {
    // console.log(x);
    if (cache.has(x)) {
      return cache.get(x); //Jika fungsi if ini true, maka akan lgsg return (dan exit) argumen x yg udah disimpan di cache sebelumnya, sehingga fungsi else (fungsi setelah ini) tidak akan dijalankan
    }

    // let result = func(x);
    // console.log(result);
    cache.set(x, func(x));
    // console.log(x);
    // console.log(result);
    return func(x);
  };
}

slow = decoratorCache(slow);
console.log(slow('BOOK'));
console.log(slow('BOOK'));
console.log(slow('BOOK'));
console.log(slow(2));
console.log(slow(2));
// console.log(slow(3));
