const { compose, concat } = require('./fp.js');
const { nums, mapping, filtering, add1, isEven, transduce } = require('./base.js')
var assert = require('assert')
const { isGreaterThan } = require('./task1.js')

var assert = require('assert')

const isChanging = (x,y) => y !== x

assert.equal(false,isChanging(1,1))
assert.equal(false,isChanging(0,0))
assert.equal(true,isChanging(1,0))
assert.equal(true,isChanging(0,1))

// capture previous values during filtering for use with next evaluation
function deltaFiltering(p) {
  var prev = null
  var index = -1
  return function(rf) {
    // this takes 2 things and makes them 1
    // keeps previous value
    return (acc, val) => {
      index++
      if(p(val,prev)){
        prev = val
        return rf(acc, val)
      }else {
        return acc
      } 
    }
  };
}

const deltaxform = compose(
  mapping(isGreaterThan(6)),
  deltaFiltering(isChanging),
);
const result = transduce(deltaxform, concat, [], nums);
//console.log(result);
assert.equal(result.toString(),[ 0, 7, 8, 9, 10 ].toString())

module.exports = {
  isChanging,
  deltaFiltering
};