Messenger.allow({
	insert: function (userId, doc) {
		return Messenger.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Messenger.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Messenger.userCanRemove(userId, doc);
	}
});

Messenger.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Messenger.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Messenger.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Messenger.before.remove(function(userId, doc) {
	
});

Messenger.after.insert(function(userId, doc) {
	
});

Messenger.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Messenger.after.remove(function(userId, doc) {
	
});
