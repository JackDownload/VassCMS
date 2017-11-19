this.Recipes = new Mongo.Collection("recipes");

this.Recipes.userCanInsert = function(userId, doc) {
	return true;
};

this.Recipes.userCanUpdate = function(userId, doc) {
	return true;
};

this.Recipes.userCanRemove = function(userId, doc) {
	return true;
};
