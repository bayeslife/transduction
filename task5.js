const { compose, concat } = require('./fp.js');
const { nums, mapping, filtering, add1, isEven, transduce } = require('./base.js')
var assert = require('assert')
const { isGreaterThan } = require('./task1.js')
const { isChanging, deltaFiltering } = require('./task2.js')
const { notNull,eventIsGreaterThan,eventIsChanging, formEvent,indexMapping} = require('./task4.js')

var assert = require('assert')

const identity = x => x;

function* makeSyncRangeIterator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
      iterationCount++;
      yield i;
  }
  return iterationCount;
}

async function* makeAsyncRangeIterator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
      iterationCount++;
      yield new Promise((resolve,reject)=>{
          setTimeout(()=>{
              resolve(i)
          },10)
      })
  }
  return iterationCount;
}

const deltaxform = compose(
  mapping(identity)
);

async function transduceGenerator(xf, rf, init, xs) {
  // call reduce on the data structure internally (abstract it away)
  // pass the rf to the composed transformation
  // pass in the initial value
  var reducer = xf(rf)
  var n = null
  do {
    n = await xs.next()
    if(!n.done){
      var v = n.value
      init = reducer(init,v)
    }
  }while(!n.done)
  return init
}

function concatLog(xs, val) {
  //console.log(xs)
  return xs.concat(val);
}

(async function(){
  const numsIt = makeAsyncRangeIterator(1,10)
  var result = await transduceGenerator(deltaxform, concatLog, [], numsIt);
  //console.log(result);
  assert.equal(result.toString(),[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].toString())  
})()

module.exports = {

};