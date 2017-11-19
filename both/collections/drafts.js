this.Drafts = new Mongo.Collection("drafts");

this.Drafts.userCanInsert = function(userId, doc) {
	return true;
};

this.Drafts.userCanUpdate = function(userId, doc) {
	return true;
};

this.Drafts.userCanRemove = function(userId, doc) {
	return true;
};
