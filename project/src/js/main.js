define('main', ["libsVendor",
	            "boardComponent"], function(libsVendor,
	            							boardComponent) {

   var $ = libsVendor.$;            	


   var  holders = {
   		"todoHolder": ".todoHolder"
   };


   var item = new boardComponent();
   console.log(item)
   

   /*
   *init	
    */
   $(holders.todoHolder).append("start")

});