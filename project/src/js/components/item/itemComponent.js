define(['text!components/item/itemComponent.tpl.html',
    'text!components/item/itemElement.tpl.html',
    "libsVendor"], function (ComponentTemplate,
                             ComponentItemTemplate,
                             libsVendor) {

    var _ = libsVendor.lodash,
        Backbone = libsVendor.backbone,
        $ = libsVendor.$,
        Component,
        ComponentItem;


    var collection = new Backbone.Collection;

    var MyModel = Backbone.Model.extend({
        defaults: {
            selected: false,
            taskTitle: "task is undefined",
        }

    });

    /**
     * ComponentItem
     * */
    ComponentItem = Backbone.View.extend({

        className: "todo-component_item",

        events: {
            "click .todo-component_item_label": "selected"
        },

        initialize: function () {
            this.render();
        },


        render: function () {
            this.listenTo(this.model, "destroy", this.remove);
            var template = _.template(ComponentItemTemplate);
            var view = template(this.model.toJSON());
            this.$el.html(view);
            return this.$el;
        },

        destroy: function () {
            this.model.destroy;
        },

        remove: function () {
            this.$el.innerHTML = " ";
        },

        selected: function () {
            var selected = this.model.get("selected");
            this.model.set({selected: !selected})
            $(this.$el).toggleClass('checked');
        }
    });

    /**
     * Component
     * */
    Component = Backbone.View.extend({

        itemWrapper: ".todo-component_item-wrapper",

        collection: collection,

        events: {
            "keypress .todo-component_adding-task_input": "addItem"
        },

        initialize: function () {
            this.listenTo(this.collection, 'all', this.addItem);
            this.render();

        },

        render: function () {
            this.template = _.template(ComponentTemplate);
            this.view = this.template();
            this.$el.html(this.view);

        },

        renderItem: function (holder) {


        },


        addItem: function (e) {
            var self = this;
            if (e.keyCode == 13 && e.currentTarget.value != '') {
                var value = e.currentTarget.value
                model = new MyModel();


                if (value.length > 1) {
                    model.set({"taskTitle": value});
                }

                var componentItem = new ComponentItem({model: model});

                this.collection.push(model);

                $(".todo-component_item-wrapper").append(componentItem.render());
                e.currentTarget.value = "";
            }
        }


    });

    return Component;

});