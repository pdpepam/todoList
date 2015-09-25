define(['text!components/item/itemComponent.tpl.html',
        'text!components/item/itemElement.tpl.html',
        "libsVendor"], function (ComponentTemplate,
                                 ComponentItemTemplate,
                                 libsVendor) {

    var _ = libsVendor.lodash,
        Backbone = libsVendor.backbone,
        $= libsVendor.$,
        Component,
        ComponentItem;


    var collection = new Backbone.Collection;

    var MyModel = Backbone.Model.extend({
        constructor: function(some){
            this.cheking = some;
            Backbone.Model.apply(this, arguments);
        }
    });

    /**
     * ComponentItem
     * */
    ComponentItem = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            var template = _.template(ComponentItemTemplate);
            var view = template(this.model.toJSON());
            this.$el.html(view);
            return this.$el;
        }
    });

    /**
     * Component
     * */
    Component = Backbone.View.extend({

        itemWrapper: ".todo-component_item-wrapper",

        collection: collection,

        events:{
            "keypress .todo-component_adding-task_input":"addItem"
        },

        initialize: function () {
            this.listenTo(this.collection, 'all', this.renderCollection);
            this.render();
        },

        render: function () {
            this.template = _.template(ComponentTemplate);
            this.view = this.template();
            this.$el.html(this.view);
        },

        renderItem: function(holder){
            var template = _.template(ComponentItemTemplate),
                view = template();

            return  $(holder).html(view);

        },

        addItem: function(e){
            var self = this;
            if(e.keyCode == 13 && e.currentTarget.value != ''){
                var value  = e.currentTarget.value,
                    model = new MyModel("done");

                console.log(model.toJSON())
                /*model.set({
                    "some":value
                });*/

                this.collection.push(model);
                e.currentTarget.value = "";
            }
        },

        renderCollection: function(){
            $(this.itemWrapper).empty();
            var self = this;
            if(this.collection.length){
                this.collection.each(function(model){
                    var el =  document.createElement('div');
                    var item = self.renderItem(el);
                    $(".todo-component_item-wrapper").append( new ComponentItem({"el":el,model:model}).render())
                })
            }
        }

    });

    return Component;

});