Template.MediaLibrary.onCreated(function() {
	
});

Template.MediaLibrary.onDestroyed(function() {
	
});

Template.MediaLibrary.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MediaLibrary.events({
	
});

Template.MediaLibrary.helpers({
	
});



Template.galery.events({

});

Template.galery.helpers({

});

Template.imagecard.events({
	"click #delete-button": function(e, t) {
				e.preventDefault();
				var me = this;
				bootbox.dialog({
					message: "Delete? Are you sure?",
					title: "Delete",
					animate: true,
					buttons: {
						success: {
							label: "Yes" ,
							className: "btn-success",
							callback: function() {
								Meteor.call("filesRemove", me._id, function(err, res) {
									if(err) {
										alert(err.message);
									}
								});
							}
						},
						danger: {
							label: "No",
							className: "btn-default"
						}
					}
				});
				return false;
	},

	"click .panel-image.hide-panel-body, click .panel.panel-default": function(e, t) {
		 $(this).closest('.panel-image').toggleClass('hide-panel-body');
	}
});

Template.imagecard.helpers({
	deleteButtonClass: function() {
		Meteor.call( function() {
				return Files.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
			});
	}
});