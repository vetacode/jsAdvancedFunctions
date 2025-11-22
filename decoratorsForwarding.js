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
console.log(typeof f1000);
let f1500 = delay(f, 1500);

f1000('test'); // shows "test" after 1000ms
f1500('test'); // shows "test" after 1500ms

/**TASK 3
 * Debounce decorator
importance: 5
The result of debounce(f, ms) decorator is a wrapper that suspends calls to f until there’s ms milliseconds of inactivity (no calls, “cooldown period”), then invokes f once with the latest arguments.

In other words, debounce is like a secretary that accepts “phone calls”, and waits until there’s ms milliseconds of being quiet. And only then it transfers the latest call information to “the boss” (calls the actual f).

For instance, we had a function f and replaced it with f = debounce(f, 1000).

Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual f will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.


…And it will get the arguments of the very last call, other calls are ignored.

Here’s the code for it (uses the debounce decorator from the Lodash library):

let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// debounced function waits 1000ms after the last call and then runs: alert("c")
Now a practical example. Let’s say, the user types something, and we’d like to send a request to the server when the input is finished.

There’s no point in sending the request for every character typed. Instead we’d like to wait, and then process the whole result.

In a web-browser, we can setup an event handler – a function that’s called on every change of an input field. Normally, an event handler is called very often, for every typed key. But if we debounce it by 1000ms, then it will be only called once, after 1000ms after the last input.

In this live example, the handler puts the result into a box below, try it:


See? The second input calls the debounced function, so its content is processed after 1000ms from the last input.

So, debounce is a great way to process a sequence of events: be it a sequence of key presses, mouse movements or something else.

It waits the given time after the last call, and then runs its function, that can process the result.

The task is to implement debounce decorator.

Hint: that’s just a few lines if you think about it :)
 */

let f = _.debounce(console.log(), 1000);

f('a');
setTimeout(() => f('b'), 200);
setTimeout(() => f('c'), 500);
// debounced function waits 1000ms after the last call and then runs: alert("c")

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
