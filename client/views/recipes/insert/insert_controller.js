this.RecipesInsertController = RouteController.extend({
	template: "RecipesInsert",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("file_list"),
			Meteor.subscribe("recipes_null")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			file_list: Files.find({}, {}),
			recipes_null: Recipes.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});