# ampersand-collection-rest-mixin

A mixin for extending ampersand-collection with restful methods. To make it behave much like Backbone.

## install

```
npm install ampersand-collection-rest-mixin
```

## example

```javascript
var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-rest-mixin');


module.exports = Collection.extend(underscoreMixin, {
    sampleMethod: function () {
        // now we've got restful methods in our collection
        this.sync( ... );
        this.fetch( ... );
        this.create( ... )
    }
});
```

## credits

All credit for this approach in backbone goes to Jeremy Ashkenas and the rest of the Backbone and Underscore authors.

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT

