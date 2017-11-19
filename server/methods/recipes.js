Meteor.methods({
	"recipesInsert": function(data) {
		if(!Recipes.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Recipes.insert(data);
	},

	"recipesUpdate": function(id, data) {
		var doc = Recipes.findOne({ _id: id });
		if(!Recipes.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Recipes.update({ _id: id }, { $set: data });
	},

	"recipesRemove": function(id) {
		var doc = Recipes.findOne({ _id: id });
		if(!Recipes.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Recipes.remove({ _id: id });
	}
});
