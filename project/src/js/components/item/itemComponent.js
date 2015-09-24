define(['text!components/item/itemComponent.tpl.html',
        'text!components/item/itemElement.tpl.html',
		"libsVendor"],function(Template,
                               ItemElement,
			                   libsVendor){
	
	var _ = libsVendor.lodash,
	    Backbone = libsVendor.backbone,
	    Item,
        Element,
        model =  Backbone.Model.extend({
            "id"   : "id",
            "name" : "name"
        });

    /**
     * item*/
    Element = Backbone.View.extend({
        template: _.template(ItemElement),

        model: new Backbone.Model.extend({}),

        events:{
            'click':"remove"
        },

        el:'div',

        initialize: function () {
            this.render();
        },

        render: function () {
            this.view = this.template;
            return this.$el.html(this.view);
        },

        remove: function(e){
            console.log('start');
            this.model.destroy();
            e.currentTarget.innerHTML = "";
        }
    });

    /**
     * component*/
    Item = Backbone.View.extend({
        $itemsHolder: ".todo-component_checking-tasks_label",


        events: {
            'click': "dom",
            'click .todo-component_item': "removeTask",
            "keyup .todo-component_adding-task_input ": "addTask"
        },

        template: _.template(Template),

        initialize: function () {
            this.collection = new Backbone.Collection;
            this.listenTo(this.collection, 'add', this.renderCollection);
            this.render();
        },

        render: function () {
            var self = this;
            this.view = this.template;
            this.$el.html(this.view);
        },

        renderItem: function () {
            var self = this;
            this.view = this.template;
            this.$el.html(this.view);
        },

        addTask: function (e) {
            if (event.keyCode == 13) {
                var mod = new model({"some": "id"});

                if (e.currentTarget.value != '') {
                    this.collection.push({model: mod});
                    e.currentTarget.value = ''
                }
            }
        },

        renderCollection: function () {
            var self  = this;
            var $wrapper =  $('.todo-component_item-wrapper');
            $wrapper.empty();
            this.collection.each(function (model) {
                var itemView;
                var el = document.createElement('div');
                console.log(model)
                itemView = new Element({el:el,model:model});
                $wrapper.append(itemView.render());
            });
            console.log(this.collection.length)
        }
    });

    return Item;
});