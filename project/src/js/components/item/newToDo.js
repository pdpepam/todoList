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

        clear: function () {
            this.destroy();
        },

        checkedModel: function () {
            this.set({"checked": true});
        },

        unchecedModel: function () {
            this.set({"checked": true});
        },

        toogleCheckeModel: function () {
            var checkedState = this.get("checked");
            this.set({"checked": !checkedState});
            return !checkedState;
        },

        updateTitle: function (value) {
            this.set({"taskTitle": value});
        }

    });

    var TodoItemCollection = Backbone.Collection.extend({
        model: TodoItemModel,

        done: function () {
            return this.filter(function (item) {
                return item;
            })
        },

        checkedAllModels: function () {
            this.each(function (model) {
                model.checkedModel();
            })
        },

        uncheckedAllModels: function () {
            this.each(function (model) {
                model.unchecedModel();
            })
        }
    });

    var todoItemCollection = new TodoItemCollection;

    var TodoItem = Backbone.View.extend({

        model: TodoItemModel,

        className: "todo-component_item",

        template: _.template(ComponentItemTemplate),

        holders: {
            "todoComponentInput": ".todo-component_item_label_task",

            "editInput": ".todo-component_item_input_edit",
            "saveInput": ".todo-component_item_input_save"
        },

        events: {
            "click .todo-component_item_label_checkbox": "toggleChecked",
            "click .todo-component_item_label_task_title": "edit",
            "blur .todo-component_item_label_task_title": "save"
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.setChecked);
            this.render();
        },

        render: function () {
            var view = this.template(this.model.toJSON());
            this.$el.html(view);
            return this.$el;
        },

        toggleChecked: function () {
            if (this.model.toogleCheckeModel()) {
                this.setChecked()
            } else {
                this.unChecked()
            }

        },

        setChecked: function () {
            $(this.$el).find(".todo-component_item_label_checkbox").prop({"checked": true})
        },

        unChecked: function () {
            $(this.$el).find(".todo-component_item_label_checkbox").prop({"checked": false})
        },

        /*manipulation*/
        edit: function () {
            $(this.$el).find('.todo-component_item_label_task_title').removeClass("todo-component_item_label_task_title__unchecked");
        },

        save: function () {
            var value = $(this.$el).find('.todo-component_item_label_task_title').val();
            this.model.updateTitle(value);
            $(this.$el).find('.todo-component_item_label_task_title').addClass("todo-component_item_label_task_title__unchecked");
        },

        remove: function () {
            $(this.$el).remove();
        }

    });

    var TodoComponent = Backbone.View.extend({

        className:"todo-component_wrapper",

        holders: {
            "addingTaskInput": ".todo-component_adding-task_input",
            "itemWrapper": ".todo-component_item-wrapper"
        },

        events: {
            "keypress .todo-component_adding-task_input": "createOneItem",
            "click .todo-component_remove-button": "removeSelectedItems",
            "click .todo-component_checking-tasks_label": "selectAllItems"
        },

        template: _.template(ComponentTemplate),

        collection: todoItemCollection,

        initialize: function () {
            this.listenTo(this.collection, 'all', this.renderCollectionLength);
            this.listenTo(this.collection, 'all', this.renderAdditional);
            this.listenTo(this.collection, 'add', this.addOneItem);
            this.render();
            this.renderAdditional();
        },

        render: function () {
            $(this.$el).html(this.template());

        },

        renderAdditional: function () {
            if (this.collection.length) {
                $(this.$el).find('.todo-component_checking-tasks-wrapper').show();
            }
            else {
                $(this.$el).find('.todo-component_checking-tasks-wrapper').hide();
            }
        },

        renderCollectionLength: function () {
            $(this.el).find('.counter').html(this.collection.length);
        },

        createOneItem: function (e) {
            if (e.keyCode == 13) {
                var value = e.currentTarget.value;
                this.collection.push({taskTitle: value});
                this.cleanInput();
            }
        },

        addOneItem: function (model) {
            var component = new TodoItem({model: model}).render();
            $(".todo-component_item-wrapper").append(component);
        },

        cleanInput: function () {
            $(this.$el).find('.todo-component_adding-task_input').val(' ');
        },

        removeSelectedItems: function () {
            _.each(this.collection.done(), function (item) {
                var modelToJson = item.toJSON();
                if (modelToJson.checked) {
                    item.clear();
                }
            })
        },

        selectAllItems: function () {
            this.collection.checkedAllModels();
        }

    });


    return TodoComponent;
});