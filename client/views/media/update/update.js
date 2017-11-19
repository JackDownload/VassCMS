var pageSession = new ReactiveDict();

Template.MediaUpdate.onCreated(function() {
	
});

Template.MediaUpdate.onDestroyed(function() {
	
});

Template.MediaUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MediaUpdate.events({
	
});

Template.MediaUpdate.helpers({
	
});

Template.MediaUpdateForm.onCreated(function() {
	
});

Template.MediaUpdateForm.onDestroyed(function() {
	
});

Template.MediaUpdateForm.onRendered(function() {
	

	pageSession.set("mediaUpdateFormInfoMessage", "");
	pageSession.set("mediaUpdateFormErrorMessage", "");

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

Template.MediaUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("mediaUpdateFormInfoMessage", "");
		pageSession.set("mediaUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var mediaUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(mediaUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("mediaUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("media", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("mediaUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("filesUpdate", t.data.file._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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
	}, 

	"change #field-file": function(e, t) {
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

Template.MediaUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("mediaUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("mediaUpdateFormErrorMessage");
	}
	
});
