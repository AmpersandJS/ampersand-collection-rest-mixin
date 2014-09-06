/* jshint unused:false, evil:true */

var AmpersandSync = require('ampersand-sync');

// Total hack job to provide outer scope
// deps of ampersand-sync
var _ = require('underscore');
var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
};

// Then replace the xhr function with a function
// that will only call success()
var SuccessSync = AmpersandSync.toString().replace(/xhr\([\s\S]*\}\);/, '(function (o) { o.success(); return {}; })(ajaxSettings);');

// Redefined SuccessSync with eval and then export it
eval('var SuccessSync = ' + SuccessSync);
module.exports = SuccessSync;
