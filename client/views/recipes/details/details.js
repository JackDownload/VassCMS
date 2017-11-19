var pageSession = new ReactiveDict();

Template.RecipesDetails.onCreated(function() {
	
});

Template.RecipesDetails.onDestroyed(function() {
	
});

Template.RecipesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.RecipesDetails.events({
	
});

Template.RecipesDetails.helpers({
	
});

Template.RecipesDetailsForm.onCreated(function() {
	
});

Template.RecipesDetailsForm.onDestroyed(function() {
	
});

Template.RecipesDetailsForm.onRendered(function() {
	

	pageSession.set("recipesDetailsFormInfoMessage", "");
	pageSession.set("recipesDetailsFormErrorMessage", "");

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

Template.RecipesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("recipesDetailsFormInfoMessage", "");
		pageSession.set("recipesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var recipesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(recipesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("recipesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("recipesDetailsFormErrorMessage", message);
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

		Router.go("recipes", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("recipes", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.RecipesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("recipesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("recipesDetailsFormErrorMessage");
	}
	
});
