var sync = require('ampersand-sync');
var extend = require('extend-object');


// Wrap an optional error callback with a fallback error event.
var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
        if (error) error(model, resp, options);
        model.trigger('error', model, resp, options);
    };
};

module.exports = {
    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        options = options ? extend({}, options) : {};
        if (options.parse === void 0) options.parse = true;
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp, options);
            if (success) success(collection, resp, options);
            collection.trigger('sync', collection, resp, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
        options = options ? extend({}, options) : {};
        if (!(model = this._prepareModel(model, options))) return false;
        if (!options.wait) this.add(model, options);
        var collection = this;
        var success = options.success;
        options.success = function(model, resp) {
            if (options.wait) collection.add(model, options);
            if (success) success(model, resp, options);
        };
        model.save(null, options);
        return model;
    },

    sync: function() {
        return sync.apply(this, arguments);
    },

    // Get or fetch a model by Id.
    getOrFetch: function (id, options, cb) {
        if (arguments.length !== 3) {
            cb = options;
            options = {};
        }
        var self = this;
        var model = this.get(id);
        if (model) return cb(null, model);
        function done() {
            var model = self.get(id);
            if (model) {
                if (cb) cb(null, model);
            } else {
                cb(new Error('not found'));
            }
        }
        if (options.all) {
            this.fetch({
                success: done,
                error: done
            });
        } else {
            this.fetchById(id, cb);
        }
    },

    // fetchById: fetches a model and adds it to
    // collection when fetched.
    fetchById: function (id, cb) {
        var self = this;
        var idObj = {};
        idObj[this.model.prototype.idAttribute] = id;
        var model = new this.model(idObj, {collection: this});
        model.fetch({
            success: function () {
                self.add(model);
                if (cb) cb(null, model);
            },
            error: function () {
                delete model.collection;
                if (cb) cb(Error('not found'));
            }
        });
    }
};
