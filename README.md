# ampersand-collection-rest-mixin

<!-- starthide -->
Part of the [Ampersand.js toolkit](http://ampersandjs.com) for building clientside applications.
<!-- endhide -->

A mixin for extending ampersand-collection with restful methods. To make it behave much like Backbone.

## install

```
npm install ampersand-collection-rest-mixin
```

## api
- create(model, options)
- fetch(options)
    - `reset` [boolean] - executes a `reset` on the collection
    - `noset` [boolean] - does *not update* collection from GET request.  uses the collection strictly as an api client.  the `success` handler is still triggered. useful in rare circumstances
    - `success(collection, resp, options)` [function]
    - `error(model, resp, options)` [function]
- fetchById(id, cb) - fetches a model and adds it to collection when fetched
- getOrFetch(id, options, cb) - get or fetch a model by id
- [sync()](AmpersandJS/ampersand-sync)

## example

```javascript
var Collection = require('ampersand-collection');
var restMixin = require('ampersand-collection-rest-mixin');


module.exports = Collection.extend(restMixin, {
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

## license

MIT

