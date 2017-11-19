Meteor.publish("recipe_list", function() {
	return Recipes.publishJoinedCursors(Recipes.find({}, {}));
});

Meteor.publish("recipes_null", function() {
	return Recipes.publishJoinedCursors(Recipes.find({_id:null}, {}));
});

Meteor.publish("recipe", function(recipeId) {
	return Recipes.publishJoinedCursors(Recipes.find({_id:recipeId}, {}));
});

