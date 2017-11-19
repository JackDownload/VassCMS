Meteor.publish("file_list", function() {
	return Files.find({}, {});
});

Meteor.publish("files_null", function() {
	return Files.find({_id:null}, {});
});

Meteor.publish("file", function(fileId) {
	return Files.find({_id:fileId}, {});
});

