var pageSession = new ReactiveDict();

Template.Blog.onCreated(function() {
	
});

Template.Blog.onDestroyed(function() {
	
});

Template.Blog.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Blog.events({
	
});

Template.Blog.helpers({
	
});

var BlogRecipesBlogItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BlogRecipesBlogSearchString");
	var sortBy = pageSession.get("BlogRecipesBlogSortBy");
	var sortAscending = pageSession.get("BlogRecipesBlogSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "description", "tag", "coverimg", "cover_container", "picker", "publicpost"];
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

var BlogRecipesBlogExport = function(cursor, fileType) {
	var data = BlogRecipesBlogItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.BlogRecipesBlog.onCreated(function() {
	
});

Template.BlogRecipesBlog.onDestroyed(function() {
	
});

Template.BlogRecipesBlog.onRendered(function() {
	pageSession.set("BlogRecipesBlogStyle", "table");
	
});

Template.BlogRecipesBlog.events({
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
				pageSession.set("BlogRecipesBlogSearchString", searchString);
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
					pageSession.set("BlogRecipesBlogSearchString", searchString);
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
					pageSession.set("BlogRecipesBlogSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BlogRecipesBlogExport(this.recipe_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BlogRecipesBlogExport(this.recipe_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BlogRecipesBlogExport(this.recipe_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BlogRecipesBlogExport(this.recipe_list, "json");
	}

	
});

Template.BlogRecipesBlog.helpers({

	"insertButtonClass": function() {
		return Recipes.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.recipe_list || this.recipe_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.recipe_list && this.recipe_list.count() > 0;
	},
	"isNotFound": function() {
		return this.recipe_list && pageSession.get("BlogRecipesBlogSearchString") && BlogRecipesBlogItems(this.recipe_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BlogRecipesBlogSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BlogRecipesBlogStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("BlogRecipesBlogStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("BlogRecipesBlogStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BlogRecipesBlogStyle") == "gallery";
	}

	
});


Template.BlogRecipesBlogTable.onCreated(function() {
	
});

Template.BlogRecipesBlogTable.onDestroyed(function() {
	
});

Template.BlogRecipesBlogTable.onRendered(function() {
	
});

Template.BlogRecipesBlogTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("BlogRecipesBlogSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BlogRecipesBlogSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BlogRecipesBlogSortAscending") || false;
			pageSession.set("BlogRecipesBlogSortAscending", !sortAscending);
		} else {
			pageSession.set("BlogRecipesBlogSortAscending", true);
		}
	}
});

Template.BlogRecipesBlogTable.helpers({
	"tableItems": function() {
		return BlogRecipesBlogItems(this.recipe_list);
	}
});


Template.BlogRecipesBlogTableItems.onCreated(function() {
	
});

Template.BlogRecipesBlogTableItems.onDestroyed(function() {
	
});

Template.BlogRecipesBlogTableItems.onRendered(function() {
	
});

Template.BlogRecipesBlogTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("recipesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("recipesRemove", me._id, function(err, res) {
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
		/**/
		return false;
	}
});

Template.BlogRecipesBlogTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Recipes.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Recipes.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});



Template.BlogRecipesBlogBlog.helpers({
	"blogItems": function() {
		return BlogRecipesBlogItems(this.recipe_list);
	}
});


Template.BlogRecipesBlogBlogItems.onCreated(function() {
	
});

Template.BlogRecipesBlogBlogItems.onDestroyed(function() {
	
});

Template.BlogRecipesBlogBlogItems.onRendered(function() {
	
});

Template.BlogRecipesBlogBlogItems.events({
	"click .blog-details": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .blog-delete": function(e, t) {
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
						Meteor.call("recipesRemove", me._id, function(err, res) {
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
	"click .blog-edit": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});
