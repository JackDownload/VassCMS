Meteor.methods({
	"draftsInsert": function(data) {
		if(!Drafts.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Drafts.insert(data);
	},

	"draftsUpdate": function(id, data) {
		var doc = Drafts.findOne({ _id: id });
		if(!Drafts.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Drafts.update({ _id: id }, { $set: data });
	},

	"draftsRemove": function(id) {
		var doc = Drafts.findOne({ _id: id });
		if(!Drafts.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Drafts.remove({ _id: id });
	}
});
