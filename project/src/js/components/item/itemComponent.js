define(['text!components/item/itemComponent.tpl.html',
		"libsVendor"],function(Template, 
			                   libsVendor){
	
	var _ = libsVendor._,
	    Backbone = libsVendor.backbone,
	    Item;

 Item = Backbone.View.extend({

        events:{
            
        },
        
        template : " _.template(Template)",

        model : Backbone.Model.extend({}),

        collection: Backbone.Collection.extend({ }),

        initialize: function(){
            this.listenTo(this.collection,'add', this.render);
            this.listenTo(this.collection,'reset', this.render);
            this.render()
        },

        render: function(){
            /*Define holders template*/
            var self = this;
            this.view = this.template;
            this.$el.html(this.view);

            /*Print ellemtn from  city collection*/
          /*  this.collection.each(function (model) {
                var itemView;
                itemView = new ItemView({model: model});
                self.$el.append(itemView.render());
            });*/
        },

    });

    return Item;    
});