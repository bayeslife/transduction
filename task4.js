const { compose, concat } = require('./fp.js');
const { nums, mapping, filtering, add1, isEven, transduce } = require('./base.js')
var assert = require('assert')
const { isGreaterThan } = require('./task1.js')
const { isChanging, deltaFiltering } = require('./task2.js')

var assert = require('assert')

const notNull = x => x!=null;

const eventIsGreaterThan = x => (y,i) => 
  y > x ? {time: i,value: y} : { time: i, value: 0};


const eventIsChanging = (x,y) => {
  if(y==null){
    return x
  }else {
    return y.value !== x.value
  }
}

const formEvent = (x,i,y) => {
  if(y==null)
    return null
  else
    return {
      start: y.time,
      end: x.time,
      value: y.value
    }
}

function indexMapping(f) {
  var index = -1
  var prev = null
  return function(rf) {
    // this takes 2 things and makes them 1
    return (acc, val) => {
      index++
      var r =  rf(acc, f(val,index,prev)); // <-- rf replaces 'concat'
      prev = val
      return r
    };
  };
}

const deltaxform = compose(
  indexMapping(eventIsGreaterThan(6)),
  deltaFiltering(eventIsChanging),
  indexMapping(formEvent),
  filtering(notNull)
);

const result = transduce(deltaxform, concat, [], nums);
//console.log(result);
assert.equal(result.toString(),
  [ { start: 0, end: 6, value: 0 },
    { start: 6, end: 7, value: 7 },
    { start: 7, end: 8, value: 8 },
    { start: 8, end: 9, value: 9 } ]
  .toString())

module.exports = {
  notNull,
  eventIsGreaterThan,
  eventIsChanging,
  formEvent,
  indexMapping
};