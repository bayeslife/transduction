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

# Task3.js

One of the benefits of transducers is the ability to be agnostic of the reducing function.
Rather than use concat to build up the output I found an example which demonstrates keep the reduction as a single javascript object.  The concat function is replaced with
```
function (result, input) {
    result[input] = true;
    return result;
}
```

# Task4.js

The problem domain I have been thinking about for transducers is to convert a stream of measurements into a stream of event where events are defined by some conditional logic.

A changing function is defined
```
const eventIsChanging = (x,y) => {
  if(y==null){
    return x
  }else {
    return y.value !== x.value
  }
}
```

And a form event function is defined
```
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
```

and we can composed these into the pipeline as
```
const deltaxform = compose(
  indexMapping(eventIsGreaterThan(6)),
  deltaFiltering(eventIsChanging),
  indexMapping(formEvent),
  filtering(notNull)
);
```

Now the output will be a set of changes over time.


# Task 5.js

The next challenge is to process a stream of asynchronous content.

This requires a change to the transduce function as it is necessary to await the next
value from the generator.  Also we cannt use the javascript array.reduce to accumulate. 
Instead we it is necessary to implement the accumulation.

```
async function asyncTransduce(xf, rf, init, xs) {
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
```

# More tasks

- To consider if the data structure is not an array but a tree
- To consider getting an output which is tuple of { value: <val>, index: <index>}
- To consder the input is a function generating an arbitrary number of values.
