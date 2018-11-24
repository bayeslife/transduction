#  Transduction

## Backgound
[This article](https://medium.com/javascript-scene/transducers-efficient-data-processing-pipelines-in-javascript-7985330fe73d) introduced me to transducers.

I subsequently looked at a couple videos including [this one](https://www.youtube.com/watch?v=4KqUvG8HPYo).

The concept of a transducer is appealing for a number of problems I have worked on recently.
In particular the ability take a stream of measurements and perform some arbitrary conditional logic which transforms values, filters and maps to events.

I was interested to see how difficult such logic would be with tranducers.

I picked up [this code](https://gist.github.com/NWCalvank/ec77b0c124f1048304cd8a08716a402f) as a starting point.

# Task1.js

The first task was to implement a filter for a specific value determined as part of transducer defintion.

This involves getting familiar with functions of 2 arguments split into a function of 1 argument returning a function of another argument.
```
const isGreaterThan = x => y =>  y > x ? y : 0;
   
assert.equal(0,isGreaterThan(6)(0))
```
This could be included into the mapping step as
```
const xform = compose(
  mapping(isGreaterThan(6)),
```

# Task2.js

The second task was to implement a filter which could find changing values.

I created an isChanging predicate taking the old and new values.
```
const isChanging = (x,y) => y !== x
```

Then I created a sibling of filter called deltaFiltering which returned the previous filtered value and passed into the isChanging predicate.


