/*define vendor for appp*/
var libsPath      = "../../bower_components/",
    componentsPath = "components/";



require.config({
    
    baseUrl: 'js',

    paths: {

        /**
         * libs*/
        'text'          : libsPath  + 'requirejs-plugins/lib/text',
        'jQuery'        : libsPath  + 'jquery/dist/jquery',
        'lodash'        : libsPath  + 'lodash/lodash',
        'backbone'      : libsPath  + 'backbone/backbone',
      
        /**
         *apps components */
        'boardComponent'   : componentsPath + 'item/itemComponent',
        
        /**
         * components wendor*/
        'componentsVendor': 'components/componentsVendor/main',

        //libsVendor
        "libsVendor" : "libsVendor"

    },

    shim: {

        'jQuery': {
            exports: '$'
        },

        'lodash': {

            exports: '_'
        },

        'backbone': {
            deps: ['lodash', 'jQuery']
        },

        
    },

    map: {
        /**
         * alias*/
        '*': {
            'underscore': 'lodash'
        }
    }


});