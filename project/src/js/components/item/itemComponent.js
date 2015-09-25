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

    /**
     * ComponentItem
     * */
    ComponentItem = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.template = _.template(ComponentItemTemplate);
            this.view = this.template();
            this.$el.innerHTML = this.view;
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
            var template = _.template(ComponentTemplate);
            var view = template();
            return  $(holder).html(view);

        },

       /* renderCollection: function(){
            console.log("work")
            console.log("addd")
            var self = this;
            if(this.collection.length){
                this.collection.each(function(item){

                    $(".todo-component_item-wrapper").append( new ComponentItem({"el":el}).render())
                })
            }
        },*/

        addItem: function(e){
            var self = this;
            if(e.keyCode == 13 && e.currentTarget.value != ''){
                console.log('work')
                var el =  document.createElement('div');
                var item = self.renderItem(el);
                this.collection.push(item)
                console.log(item)
                e.currentTarget.value = "";
            }
            console.log(this.collection.length)
        }


    });

    return Component;

});