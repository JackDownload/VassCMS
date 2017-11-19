Template.Settings.onCreated(function() {
	
});

Template.Settings.onDestroyed(function() {
	
});

Template.Settings.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Settings.events({
	
});

Template.Settings.helpers({
	
});
