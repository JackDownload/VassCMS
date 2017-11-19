var pageSession = new ReactiveDict();

Template.MediaDetails.onCreated(function() {
	
});

Template.MediaDetails.onDestroyed(function() {
	
});

Template.MediaDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MediaDetails.events({
	
});

Template.MediaDetails.helpers({
	
});

Template.MediaDetailsForm.onCreated(function() {
	
});

Template.MediaDetailsForm.onDestroyed(function() {
	
});

Template.MediaDetailsForm.onRendered(function() {
	

	pageSession.set("mediaDetailsFormInfoMessage", "");
	pageSession.set("mediaDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.MediaDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("mediaDetailsFormInfoMessage", "");
		pageSession.set("mediaDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var mediaDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(mediaDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("mediaDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("mediaDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("media", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("media", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.MediaDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("mediaDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("mediaDetailsFormErrorMessage");
	}
	
});
