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

##### create(model, options)
Create a new instance of a model in this collection. Add the model to the collection immediately.

###### options

- `wait` - default: `false`. If set to true, we wait for the server to agree before updating the collection.

##### fetch(options)
Fetch the default set of models for this collection, and set them onto this collection.

###### options

- `reset` [boolean] - default: `false`.  Executes the `reset` method on the collection with server response instead of the set method.
- `set` [boolean] - defaut: `true`.  When left true, executes the `reset` method on the collection with server response.  When set to false, the collection will *not be modified* after the HTTP request is complete.  This enables use of of the collection strictly as an API client.  The `success` and `error` handlers are still triggered. Useful in rare circumstances.
- `success(collection, response, options)` [function] - default: `undefined`.  Called after the XHR has completed successfully and the collection is updated.
- `error(model, response, options)` [function] - default: `undefined`.  Called after the XHR has failed.

##### fetchById(id, cb)
fetches a model and adds it to collection when fetched

##### getOrFetch(id, options, cb)
get or fetch a model by id

##### sync()
proxy to [ampersand-sync](AmpersandJS/ampersand-sync)

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

