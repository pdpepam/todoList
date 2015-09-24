define('main', ["libsVendor",
	            "boardComponent"], function(libsVendor,
	            							boardComponent) {

   var $ = libsVendor.$;            	


   var  holders = {
   		"todoHolder": ".todoHolder"
   };


   /*
    *init
    */
   var item = new boardComponent({'el': holders.todoHolder});

});