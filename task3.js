const { compose, concat } = require('./fp.js');
const { nums, mapping, filtering, add1, isEven, transduce } = require('./base.js')
var assert = require('assert')
const { isGreaterThan } = require('./task1.js')
const { isChanging, deltaFiltering, deltaxform } = require('./task2.js')

var assert = require('assert')

function objectconcat(result, input) {
  result[input] = true;
  return result;
}

const result = transduce(deltaxform, objectconcat, {}, nums);
//console.log(result);
assert.equal(result.toString(),{ '0': true, '7': true, '8': true, '9': true, '10': true }.toString())

module.exports = {
  objectconcat
};