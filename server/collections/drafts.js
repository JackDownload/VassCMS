Drafts.allow({
	insert: function (userId, doc) {
		return Drafts.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Drafts.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Drafts.userCanRemove(userId, doc);
	}
});

Drafts.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Drafts.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Drafts.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Drafts.before.remove(function(userId, doc) {
	
});

Drafts.after.insert(function(userId, doc) {
	
});

Drafts.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Drafts.after.remove(function(userId, doc) {
	
});
