var pageSession = new ReactiveDict();

Template.Recipes.onCreated(function() {
	
});

Template.Recipes.onDestroyed(function() {
	
});

Template.Recipes.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Recipes.events({
	
});

Template.Recipes.helpers({
	
});

var RecipesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("RecipesViewSearchString");
	var sortBy = pageSession.get("RecipesViewSortBy");
	var sortAscending = pageSession.get("RecipesViewSortAscending");
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

var RecipesViewExport = function(cursor, fileType) {
	var data = RecipesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.RecipesView.onCreated(function() {
	
});

Template.RecipesView.onDestroyed(function() {
	
});

Template.RecipesView.onRendered(function() {
	pageSession.set("RecipesViewStyle", "table");
	
});

Template.RecipesView.events({
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
				pageSession.set("RecipesViewSearchString", searchString);
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
					pageSession.set("RecipesViewSearchString", searchString);
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
					pageSession.set("RecipesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("recipes.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		RecipesViewExport(this.recipe_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		RecipesViewExport(this.recipe_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		RecipesViewExport(this.recipe_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		RecipesViewExport(this.recipe_list, "json");
	}

	
});

Template.RecipesView.helpers({

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
		return this.recipe_list && pageSession.get("RecipesViewSearchString") && RecipesViewItems(this.recipe_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("RecipesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("RecipesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("RecipesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("RecipesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("RecipesViewStyle") == "gallery";
	}

	
});


Template.RecipesViewTable.onCreated(function() {
	
});

Template.RecipesViewTable.onDestroyed(function() {
	
});

Template.RecipesViewTable.onRendered(function() {
	
});

Template.RecipesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("RecipesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("RecipesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("RecipesViewSortAscending") || false;
			pageSession.set("RecipesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("RecipesViewSortAscending", true);
		}
	}
});

Template.RecipesViewTable.helpers({
	"tableItems": function() {
		return RecipesViewItems(this.recipe_list);
	}
});


Template.RecipesViewTableItems.onCreated(function() {
	
});

Template.RecipesViewTableItems.onDestroyed(function() {
	
});

Template.RecipesViewTableItems.onRendered(function() {
	
});

Template.RecipesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("recipes.details", mergeObjects(Router.currentRouteParams(), {recipeId: this._id}));
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
		Router.go("recipes.update", mergeObjects(Router.currentRouteParams(), {recipeId: this._id}));
		return false;
	}
});

Template.RecipesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Recipes.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Recipes.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
