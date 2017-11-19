var pageSession = new ReactiveDict();

Template.MediaInsert.onCreated(function() {
	
});

Template.MediaInsert.onDestroyed(function() {
	
});

Template.MediaInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MediaInsert.events({
	
});

Template.MediaInsert.helpers({
	
});

Template.MediaInsertForm.onCreated(function() {
	
});

Template.MediaInsertForm.onDestroyed(function() {
	
});

Template.MediaInsertForm.onRendered(function() {
	

	pageSession.set("mediaInsertFormInfoMessage", "");
	pageSession.set("mediaInsertFormErrorMessage", "");

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

Template.MediaInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("mediaInsertFormInfoMessage", "");
		pageSession.set("mediaInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var mediaInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(mediaInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("mediaInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("media", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("mediaInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("filesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("media", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.MediaInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("mediaInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("mediaInsertFormErrorMessage");
	}
	
});
