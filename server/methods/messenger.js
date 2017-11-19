Meteor.methods({
	"messengerInsert": function(data) {
		if(!Messenger.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Messenger.insert(data);
	},

	"messengerUpdate": function(id, data) {
		var doc = Messenger.findOne({ _id: id });
		if(!Messenger.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Messenger.update({ _id: id }, { $set: data });
	},

	"messengerRemove": function(id) {
		var doc = Messenger.findOne({ _id: id });
		if(!Messenger.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Messenger.remove({ _id: id });
	}
});
