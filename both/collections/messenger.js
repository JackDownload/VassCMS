this.Messenger = new Mongo.Collection("messenger");

this.Messenger.userCanInsert = function(userId, doc) {
	return true;
};

this.Messenger.userCanUpdate = function(userId, doc) {
	return true;
};

this.Messenger.userCanRemove = function(userId, doc) {
	return true;
};
