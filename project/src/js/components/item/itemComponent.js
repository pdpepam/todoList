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


    var collection = new Backbone.Collection();

     /**
     * ComponentItem Model
     * */
    var Model = Backbone.Model.extend({
        self:this,

        defaults:{
           /* taskDate:function(){
                    var fullDate = new Date(),
                        date = {
                            year  : (function(){return fullDate.getFullYear()})(),
                            month : function(){return fullDate.getMonth()}(),
                            date  : function(){return fullDate.getDate()}(),
                            hour  : function(){return fullDate.getHours()}(),
                            minute: function(){return fullDate.getMinutes()}(),
                        }

                        return date;
                    }(),*/
            changeable: false,
            selected:false,
            taskTitle: "unknow task"
        },

        validate: function(attrs, options) {
           if(attrs.taskTitle.length<2){
              return "don't valid data";
            }    
        }

    });

    /**
     * ComponentItem
     * */
    ComponentItem = Backbone.View.extend({

        className: "todo-component_item",    

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

        initialize: function () {
            this.listenTo(this.model, "destroy", this.destroy);
            this.listenTo(this.model, "set", this.render);
            return this.render();
        },

        render: function () {
            var template = _.template(ComponentItemTemplate),
                view = template(this.model.toJSON());
            return this.$el.html(view);
        },

        edit: function(){
            var self = this,
                modelJson = this.model.toJSON();

            $(this.el).find(self.holders.editInput).val(modelJson.taskTitle);
        },

        save: function(){
            var self = this;
                value = $(this.el).find(self.holders.editInput).val();
            this.model.set({"taskTitle":value});
        },

        selected: function(){
            var selected = this.model.get("selected");
            this.model.set({"selected":true});
        },

        destroy: function(){
            this.model.destroy();
            this.remove();
        },

        remove:function(){
           this.$el.innerHTML = " ";     
        }

    });

    /**
     * Component
     * */
    Component = Backbone.View.extend({

        holders:{
            "addingTaskInput" : ".todo-component_adding-task_input",
            "itemWrapper"     : ".todo-component_item-wrapper"
        },

        itemWrapper: ".todo-component_item-wrapper",

        collection: collection,

        model: Model,

        events:{
            "keypress .todo-component_adding-task_input" :"pressInput",
            "click .todo-component_remove-button"      :"removeSelectedItems"
        },

        initialize: function () {
            var self = this;

            this.listenTo(this.collection, 'all', this.addItem);
            this.listenTo(this.collection, 'all', this.renderCollectionLength);
           /* this.listenTo(this.collection, "remove", this.removeItem);
*/
            this.render();
        },

        /*render*/
        render: function () {
            this.template = _.template(ComponentTemplate);
            this.view = this.template();
            this.$el.html(this.view);
        },

        renderCollectionLength: function(){
            var self = this;
            $(this.el).find('.counter').html(self.collection.length);
        },

        renderItem: function(model){
            return new ComponentItem({model:model});
        },

        /*adding items*/

        pressInput: function(e){
            var self = this;

            if(e.keyCode == 13 && e.currentTarget.value.length){
                var value = e.currentTarget.value,
                    componentItem;
                
                self.addModel(value);
                self.cleanInput();
               
            }
        },

        addModel: function(value){
            var self = this;
            var checked ;
            
            model = new self.model({"taskTitle":value},{validate : true});
            componentItem = self.renderItem(model);
            self.collection.push(model);
            return  $(self. holders.itemWrapper).append(componentItem.render());
        },

        cleanInput: function(){
           $(this.holders.addingTaskInput).val("");
        },

        removeSelectedItems: function(){
            var self = this;

                this.collection.each(function(model){
                    /*model.destroy();*/
                    console.log(model);
                    self.collection.remove(model)
                    console.log(model)
                }) ;   
            
        },

        removeItem: function(model){
            console.log(model)
           $(model.el).remove()

        }

    });

    return Component;

});