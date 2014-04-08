# ampersand-collection-underscore-mixin

A mixin for extending ampersand-collection with underscore methods.

## install

```
npm install ampersand-collection-underscore-mixin
```

## example

```javascript
var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');


module.exports = Collection.extend(underscoreMixin, {
    sampleMethod: function () {
        // now we've got underscore methods 
        // we can call that are applied to models
        // in the collection.
        this.filter( ... );
        this.some( ... );
        this.each( ... )
    }
});
```

## credits

All credit for underscore and this approach in backbone goes to Jeremy Ashkenas and the rest of the Backbone and Underscore authors.

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT

