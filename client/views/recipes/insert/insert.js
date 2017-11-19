var pageSession = new ReactiveDict();

Template.RecipesInsert.onCreated(function() {
	
});

Template.RecipesInsert.onDestroyed(function() {
	
});

Template.RecipesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.RecipesInsert.events({
	
});

Template.RecipesInsert.helpers({
	
});

Template.RecipesInsertForm.onCreated(function() {
	
});

Template.RecipesInsertForm.onDestroyed(function() {
	
});

Template.RecipesInsertForm.onRendered(function() {
	

	pageSession.set("recipesInsertFormInfoMessage", "");
	pageSession.set("recipesInsertFormErrorMessage", "");

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

Template.RecipesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("recipesInsertFormInfoMessage", "");
		pageSession.set("recipesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var recipesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(recipesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("recipesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("recipes", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("recipesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("recipesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.RecipesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("recipesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("recipesInsertFormErrorMessage");
	}
	
});
