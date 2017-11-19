var pageSession = new ReactiveDict();

Template.Media.onCreated(function() {
	
});

Template.Media.onDestroyed(function() {
	
});

Template.Media.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Media.events({
	
});

Template.Media.helpers({
	
});

var MediaViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MediaViewSearchString");
	var sortBy = pageSession.get("MediaViewSortBy");
	var sortAscending = pageSession.get("MediaViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "image"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var MediaViewExport = function(cursor, fileType) {
	var data = MediaViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.MediaView.onCreated(function() {
	
});

Template.MediaView.onDestroyed(function() {
	
});

Template.MediaView.onRendered(function() {
	pageSession.set("MediaViewStyle", "table");
	
});

Template.MediaView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("MediaViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("MediaViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("MediaViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("media.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		MediaViewExport(this.file_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MediaViewExport(this.file_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MediaViewExport(this.file_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MediaViewExport(this.file_list, "json");
	}

	
});

Template.MediaView.helpers({

	"insertButtonClass": function() {
		return Files.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.file_list || this.file_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.file_list && this.file_list.count() > 0;
	},
	"isNotFound": function() {
		return this.file_list && pageSession.get("MediaViewSearchString") && MediaViewItems(this.file_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MediaViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MediaViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("MediaViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("MediaViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MediaViewStyle") == "gallery";
	}

	
});


Template.MediaViewTable.onCreated(function() {
	
});

Template.MediaViewTable.onDestroyed(function() {
	
});

Template.MediaViewTable.onRendered(function() {
	
});

Template.MediaViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("MediaViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MediaViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MediaViewSortAscending") || false;
			pageSession.set("MediaViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MediaViewSortAscending", true);
		}
	}
});

Template.MediaViewTable.helpers({
	"tableItems": function() {
		return MediaViewItems(this.file_list);
	}
});


Template.MediaViewTableItems.onCreated(function() {
	
});

Template.MediaViewTableItems.onDestroyed(function() {
	
});

Template.MediaViewTableItems.onRendered(function() {
	
});

Template.MediaViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("media.details", mergeObjects(Router.currentRouteParams(), {fileId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("filesUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
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
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("media.update", mergeObjects(Router.currentRouteParams(), {fileId: this._id}));
		return false;
	}
});

Template.MediaViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Files.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Files.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
