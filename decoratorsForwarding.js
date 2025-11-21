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

slow = cachingDecorator(slow);
console.log('data from cache:', slow(1));
console.log('data from cache:', slow(2));
console.log('data from cache:', slow(2));
console.log('data from cache:', slow(2));
console.log('data from cache:', slow(1));
