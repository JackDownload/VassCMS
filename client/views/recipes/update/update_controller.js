this.RecipesUpdateController = RouteController.extend({
	template: "RecipesUpdate",
	

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
			Meteor.subscribe("recipe", this.params.recipeId)
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
			recipe: Recipes.findOne({_id:this.params.recipeId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});