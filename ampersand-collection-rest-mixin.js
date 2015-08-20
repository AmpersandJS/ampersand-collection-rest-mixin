/*$AMPERSAND_VERSION*/
var sync = require('ampersand-sync');
var assign = require('lodash.assign');

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
        options = options ? assign({}, options) : {};
        if (options.parse === void 0) options.parse = true;
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            if (options.set !== false) collection[method](resp, options);
            if (success) success(collection, resp, options);
            if (options.set !== false) collection.trigger('sync', collection, resp, options);
        };
        wrapError(this, options);
        var request = this.sync('read', this, options);
        // Make the request available on the options object so it can be accessed
        // further down the line by `parse`, sync listeners, etc
        // https://github.com/AmpersandJS/ampersand-collection-rest-mixin/commit/d32d788aaff912387eb1106f2d7ad183ec39e11a#diff-84c84703169bf5017b1bc323653acaa3R32
        options.xhr = request;
        return request;
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
        options = options ? assign({}, options) : {};
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
        if (model) {
            return window.setTimeout(function() {
                return cb(null, model);
            }, 0);
        }
        function done() {
            var model = self.get(id);
            if (model) {
                if (cb) cb(null, model);
            } else {
                cb(new Error('not found'));
            }
        }
        if (options.all) {
            options.success = done;
            options.error = done;
            return this.fetch(options);
        } else {
            return this.fetchById(id, cb);
        }
    },

    // fetchById: fetches a model and adds it to
    // collection when fetched.
    fetchById: function (id, cb) {
        var self = this;
        var idObj = {};
        idObj[this.model.prototype.idAttribute] = id;
        var model = new this.model(idObj, {collection: this});
        return model.fetch({
            success: function () {
                self.add(model);
                if (cb) cb(null, model);
            },
            error: function (collection, resp) {
                delete model.collection;
                if (cb) {
                    var error = new Error(resp.statusText);
                    error.status = resp.status;
                    cb(error);
                }
            }
        });
    }
};
