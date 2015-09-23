define(['libsVendor'], function (libsVendor) {

    var $ = libsVendor.$,
    	Backbone = libsVendor.backbone;

    var _ = libsVendor.lodash,
    	evenBus = _.extend({}, Backbone.Events);


    return  evenBus;

});