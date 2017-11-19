var pageSession = new ReactiveDict();

Template.RecipesUpdate.onCreated(function() {
	
});

Template.RecipesUpdate.onDestroyed(function() {
	
});

Template.RecipesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.RecipesUpdate.events({
	
});

Template.RecipesUpdate.helpers({
	
});

Template.RecipesUpdateForm.onCreated(function() {
	
});

Template.RecipesUpdateForm.onDestroyed(function() {
	
});

Template.RecipesUpdateForm.onRendered(function() {
	

	pageSession.set("recipesUpdateFormInfoMessage", "");
	pageSession.set("recipesUpdateFormErrorMessage", "");

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

Template.RecipesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("recipesUpdateFormInfoMessage", "");
		pageSession.set("recipesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var recipesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(recipesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("recipesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("recipes", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("recipesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("recipesUpdate", t.data.recipe._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("recipes", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}, 

	"change #field-coverimg": function(e, t) {
	e.preventDefault();
	var fileInput = $(e.currentTarget);
	var dataField = fileInput.attr("data-field");
	var hiddenInput = fileInput.closest("form").find("input[name='" + dataField + "']");

	FS.Utility.eachFile(e, function(file) {
		Files.insert(file, function (err, fileObj) {
			if(err) {
				console.log(err);
			} else {
				hiddenInput.val(fileObj._id);
			}
		});
	});
}

});

Template.RecipesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("recipesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("recipesUpdateFormErrorMessage");
	}
	
});
