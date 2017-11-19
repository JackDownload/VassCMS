Template.Log.onCreated(function() {
	
});

Template.Log.onDestroyed(function() {
	
});

Template.Log.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Log.events({
	
});

Template.Log.helpers({
	
});



Template.insert_recept.events({

});

Template.insert_recept.helpers({
	newHelper: function() {
		
	}
});

Template.insertRecipesForm.events({

});

Template.insertRecipesForm.helpers({

});