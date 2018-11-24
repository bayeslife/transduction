

// local imports
const { compose, concat } = require('./fp');

var assert = require('assert')

// input data
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// transformations
const add1 = x => x + 1;
const doubleIt = x => x * 2;
const add = (x, y) => x + y;

// predicates
const isEven = x => x % 2 === 0;
const isOdd = x => !isEven(x);
const isGreaterThan = x => y => 
  y > x ? y : 0;

const isChanging = (x,y) => {
  //  console.log(x)
  return y !== x
} 
   
// generalize the 'mapping' concept, without the concat...
function mapping(f) {
  return function(rf) {
    // this takes 2 things and makes them 1
    return (acc, val) => {
      return rf(acc, f(val)); // <-- rf replaces 'concat'
    };
  };
}

// generalize the 'filtering' concept, without the concat...
function filtering(p) {
  return function(rf) {
    // this takes 2 things and makes them 1
    return (acc, val) => {
      return p(val) ? rf(acc, val) : acc; // <-- rf replaces 'concat'
    };
  };
}



// transduce helper you'll see in a library...
function transduce(xf, rf, init, xs) {
  // call reduce on the data structure internally (abstract it away)
  // pass the rf to the composed transformation
  // pass in the initial value
  return xs.reduce(xf(rf), init);
}

//const transduceResult1 = transduce(transformFilterReduce2, add, 0, nums);
// console.log(transduceResult1);

// another example -- return an array
  // reminder: these are transducers
  // composition of transducers returns a new transducer
const xform = compose(
  mapping(add1),
  filtering(isEven),
  mapping(doubleIt)
);
const result = transduce(xform, concat, [], nums);

assert.equal(result.toString(),[ 4, 8, 12, 16, 20 ].toString() )

module.exports = {
  nums,
  add1,
  doubleIt,
  add,
  isEven,
  mapping,
  filtering,
  transduce
};
