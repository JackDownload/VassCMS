Recipes.allow({
	insert: function (userId, doc) {
		return Recipes.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Recipes.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Recipes.userCanRemove(userId, doc);
	}
});

Recipes.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Recipes.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Recipes.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Recipes.before.remove(function(userId, doc) {
	
});

Recipes.after.insert(function(userId, doc) {
	
});

Recipes.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Recipes.after.remove(function(userId, doc) {
	
});
