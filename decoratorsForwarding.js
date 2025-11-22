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
//TO FORWARD A CALL
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
    // console.log(arguments);
    // console.log(arguments == Array);
    // console.log(typeof arguments);
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
// console.log(worker3.slow(4, 6));
// console.log(worker3.slow(4, 6));
// console.log(worker3.slow(4, 6));
// console.log(worker3.slow(4, 6));
// console.log(worker3.slow(2, 3));
// console.log(worker3.slow(2, 3));

//BORROWING METHOD
function hash2() {
  console.log([].join.call(arguments)); // 1, 2
}
// hash2(1, 2);

/**TASK 1
 * Spy decorator
importance: 5
Create a decorator spy(func) that should return a wrapper that saves all calls to function in its calls property.

Every call is saved as an array of arguments.

For instance:

function work(a, b) {
  alert( a + b ); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
P.S. That decorator is sometimes useful for unit-testing. Its advanced form is sinon.spy in Sinon.JS library.
 */

function work(a, b) {
  console.log(a + b); // work is an arbitrary function or method
  return a + b;
}

function spy(func) {
  wrapper.calls = [];
  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  return wrapper;
}

work = spy(work);

// console.log(work(1, 2)); // 3
// console.log(work(4, 5)); // 9

/**TASK 2
 * Delaying decorator
importance: 5
Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.

For instance:

function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms
In other words, delay(f, ms) returns a “delayed by ms” variant of f.

In the code above, f is a function of a single argument, but your solution should pass all arguments and the context this.
 */

function f(x) {
  console.log(x);
  return x;
}

function delay(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000('test'); // shows "test" after 1000ms
f1500('test'); // shows "test" after 1500ms
