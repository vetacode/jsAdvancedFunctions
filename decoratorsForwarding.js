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

    let result = func(x);
    // console.log(result);
    cache.set(x, result);
    // console.log(x);
    // console.log(result);
    return result;
  };
}

slow = decoratorCache(slow);
// console.log(slow('BOOK'));
// console.log(slow('BOOK'));
// console.log(slow('BOOK'));
// console.log(slow(2));
// console.log(slow(2));
// console.log(slow(3));
// console.log(slow(3));

//Using “FUNC.CALL” for the context
//This expects a list of arguments
//This is i.e. for working with Object Methods
//Syntax: func.call(context, arg1, arg2, …args)

function sapa(kata) {
  console.log(this.nama + ': ' + kata);
  return this.nama + ': ' + kata;
}

let cust = { nama: 'Budi' };
// console.log(sapa.call(cust, 'Bilang Halo'));

//heavy work on Object methods, use this:
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    console.log('Called with ' + x);
    return x * this.someMethod(); // (*)
  },
};

function cacheObjMethod(func) {
  let cache = new Map();

  return function (x) {
    // console.log(this === worker);
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); //the object call is using 'this' instead of hardcoding the obj name (worker), its due to flexibility of reusable function decorator
    cache.set(x, result);
    return result;
  };
}

worker.slow = cacheObjMethod(worker.slow);
// console.log(worker.slow(1));
// console.log(worker.slow(1));
// console.log(worker.slow(1));

//Going MULTI-ARGUMENTS
//Using hash function
let worker2 = {
  slow(min, max) {
    console.log(`Called with ${min},${max}`);
    return min + max;
  },
};

function cacheMultiArgs(func, hash) {
  let cache = new Map();

  return function () {
    let key = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments);
    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ', ' + args[1];
}

worker2.slow = cacheMultiArgs(worker2.slow, hash);
// console.log(worker2.slow(2, 3));
// console.log(worker2.slow(2, 3));
// console.log(worker2.slow(2, 3));

//FUNC.APPLY ==> more faster performance than func.call coz JS optimization
//It takes an array-like object as parameter.
//Syntax: func.apply(context, args)
let wrapper = function () {
  return func.apply(this, arguments);
};

let worker3 = {
  slow(min, max) {
    console.log(`Called with ${min},${max}`);
    return min + max;
  },
};

function cacheMultiArgs(func, hash) {
  let cache = new Map();

  return function () {
    let key = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.apply(this, arguments);
    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ', ' + args[1];
}

worker3.slow = cacheMultiArgs(worker3.slow, hash);
console.log(worker3.slow(4, 6));
console.log(worker3.slow(4, 6));
console.log(worker3.slow(4, 6));
console.log(worker3.slow(4, 6));
console.log(worker3.slow(2, 3));
console.log(worker3.slow(2, 3));
