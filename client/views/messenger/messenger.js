Template.Messenger.onCreated(function() {
	
});

Template.Messenger.onDestroyed(function() {
	
});

Template.Messenger.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Messenger.events({
	
});

Template.Messenger.helpers({
	
});
