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

    var EventBus = _.extend({}, Backbone.Events);  

    var collection = new Backbone.Collection;

     /**
     * ComponentItem Model
     * */
    var Model = Backbone.Model.extend({
        self:this,

        defaults:{
            taskDate:function(){
                    var fullDate = new Date(),
                        date = {
                            year  : function(){return fullDate.getFullYear()}(),
                            month : function(){return fullDate.getMonth()}(),
                            date  : function(){return fullDate.getDate()}(),
                            hour  : function(){return fullDate.getHours()}(),
                            minute: function(){return fullDate.getMinutes()}(),
                        }

                        return date;
                    }(),
            changeable: false,
            selected:false,
            taskTitle: "unknow task"
        },

        setDate: function(){

        },

        validate: function(attrs, options) {
           if(attrs.taskTitle.length<2){
              return "don't valid data";
            }    
        },


        changedLogic: function(){
            console.log("changedLogic")
        }

    });

    /**
     * ComponentItem
     * */
    ComponentItem = Backbone.View.extend({

        className: "todo-component_item",    

        events:{
            "click .todo-component_item_label" : "selected",
            "click .todo-component_item_label_edit" : "edit"
        },

        initialize: function () {
            this.listenTo(this.model, "destroy", this.remove);
            return this.render();
        },

        render: function () {
            var template = _.template(ComponentItemTemplate);
            var view = template(this.model.toJSON());
            return this.$el.html(view);;
        },

        destroy: function(){
            this.model.destroy();
            return true;
        },

        remove:function(){
           return this.$el.innerHTML = " ";     
        },

        selected: function(){
            var selected = this.model.get("selected");
                this.model.set({"selected":!selected})
                console.log(this.model.toJSON())
        },

        edit: function(){
           /* this.model.set({changeable: true})*/
            EventBus.trigger("editModel", this.model);
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
            "keypress .todo-component_adding-task_input" :"pressInput"
        },

        initialize: function () {
            var self = this;

            this.listenTo(this.collection, 'all', this.addItem);
            EventBus.on("editModel", function(data){self.addDataToInput(data)});

            this.render();
        },

        render: function () {
            this.template = _.template(ComponentTemplate);
            this.view = this.template();
            this.$el.html(this.view);
        },

        renderItem: function(model){
            console.log(model)
            return new ComponentItem({model:model});
        },


        cleanInput: function(){
            var el = $(this.holders.addingTaskInput);
            el.val("");
        },

        addEditModel: function(value){
            var self = this;
            var checked ;

          
            var actions = {
                 addItem : function(){
                    console.log("addItem")
                    model = new self.model({"taskTitle":value},{validate : true});
                    componentItem = self.renderItem(model);
                    self.collection.push(model);
                    return  $('.todo-component_item-wrapper').append(componentItem.render());
                 },
              
                 editItem: function(){
                    console.log("editItem")
                    return "hren"
                 }
            };

              function colHasChengableModel(){
                var result = false ;

                self.collection.each(function(model){

                    if(model.changeable){
                        console.log(model.toJSON())
                        result = true;
                    }

                })
                    
                return result;
            } ; 

            var result = new colHasChengableModel();
        
            return (result)?actions["addItem"]():actions["editItem"]();
        },

        pressInput: function(e){
            var self = this;

            if(e.keyCode == 13 && e.currentTarget.value.length){
                var value = e.currentTarget.value,
                    componentItem;
                
                self.addEditModel(value);
                self.cleanInput();
               
            };
        },

        addDataToInput: function(data){
            var modelToJson = data.toJSON(),
                obj = {
                    "idModel":"idModel",
                    "text":modelToJson.taskTitle
                };

                
            $(this.holders.addingTaskInput).val(obj.text);
        }

    });

    return Component;

});