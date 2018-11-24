const { compose, concat } = require('./fp.js');
const { nums, mapping, filtering, add1, isEven, transduce } = require('./base.js')

var assert = require('assert')

// predicates
const isGreaterThan = x => y => 
  y > x ? y : 0;
   

assert.equal(0,isGreaterThan(6)(0))
assert.equal(0,isGreaterThan(6)(6))
assert.equal(7,isGreaterThan(6)(7))

const xform = compose(
  mapping(isGreaterThan(6)),
  mapping(add1),
  filtering(isEven),
  //mapping(doubleIt),
  //mapping(add1),
);
const result = transduce(xform, concat, [], nums);
assert.equal(result.toString(),[8,10].toString())


module.exports = {
  isGreaterThan
};