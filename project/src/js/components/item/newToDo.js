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


    var TodoItemModel = Backbone.Model.extend({
        defaults: function () {
            return {
                "taskTitle": "unnamed task",
                "checked": false
            };
        },

        initialize: function () {
            if (!this.get("taskTitle") && this.get("taskTitle").length) {
                 this.set({"taskTitle": this.defaults.taskTitle});
            }
        },

        clear: function(){
            this.destroy();
        }
    });

    var TodoItemCollection = Backbone.Collection.extend({
        model:TodoItemModel,

        done: function(){
            return this.filter(function(item){})
        }
    });

    var todoItemCollection = new TodoItemCollection;

    var TodoItem = Backbone.View.extend({

        model:TodoItemModel,

        className: "todo-component_item",

        template: _.template(ComponentItemTemplate),

        holders:{
            "editInput": ".todo-component_item_input_edit",
            "saveInput": ".todo-component_item_input_save"
        },

        events:{
            "click .todo-component_item_label"      : "selected",
            "click .todo-component_item_label_edit" : "edit",
            "click .todo-component_item_input_save" : "save",
            "todo-component_remove-button"          : "removeSelectedItems"
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {
            var view = this.template(this.model.toJSON());
            this.$el.html(view);
            return this.$el;
        },

        /*manipulation*/
        edit: function(){},
        close: function(){},
        update: function(){}

    });

    var TodoComponent = Backbone.View.extend({

        holders:{
            "addingTaskInput" : ".todo-component_adding-task_input",
            "itemWrapper"     : ".todo-component_item-wrapper"
        },

        events:{
            "keypress .todo-component_adding-task_input" :"createOneItem"
        },

        template: _.template(ComponentTemplate),

        collection:todoItemCollection,

        initialize: function(){
            this.listenTo(this.collection, 'all', this.renderCollectionLength);
            this.listenTo(this.collection, 'add', this.addOneItem);
            this.render();
        },

        render: function(){
            $(this.$el).html(this.template());
        },

        renderCollectionLength: function(){
            $(this.el).find('.counter').html(this.collection.length);
        },

        createOneItem: function(e){
            if(e.keyCode == 13){
                var value = e.currentTarget.value;
                this.collection.push({taskTitle:value});
                this.cleanInput();
            }
        },

        addOneItem: function(model){
            var component = new TodoItem({model:model}).render();
            $(".todo-component_item-wrapper").append(component);
        },

        cleanInput: function(){
            $(this.$el).find('.todo-component_adding-task_input').val(' ');
        },

        removeSelctedItems: function(){
            this.collection.each(function(){

            })
        }


    });


    return TodoComponent;
});