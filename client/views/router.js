Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"recipes",
	"recipes.details",
	"recipes.insert",
	"recipes.update",
	"blog",
	"media",
	"media.details",
	"media.insert",
	"media.update",
	"settings",
	"messenger",
	"media_library",
	"log"
];

Router.freeRoutes = [
	"home_public"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", controller: "HomePublicController"});
	this.route("/login", {name: "login", controller: "LoginController"});
	this.route("/register", {name: "register", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", controller: "LogoutController"});
	this.route("/recipes", {name: "recipes", controller: "RecipesController"});
	this.route("/recipes/details/:recipeId", {name: "recipes.details", controller: "RecipesDetailsController"});
	this.route("/recipes/insert", {name: "recipes.insert", controller: "RecipesInsertController"});
	this.route("/recipes/update/:recipeId", {name: "recipes.update", controller: "RecipesUpdateController"});
	this.route("/blog", {name: "blog", controller: "BlogController"});
	this.route("/media", {name: "media", controller: "MediaController"});
	this.route("/media/details/:fileId", {name: "media.details", controller: "MediaDetailsController"});
	this.route("/media/insert", {name: "media.insert", controller: "MediaInsertController"});
	this.route("/media/update/:fileId", {name: "media.update", controller: "MediaUpdateController"});
	this.route("/settings", {name: "settings", controller: "SettingsController"});
	this.route("/messenger", {name: "messenger", controller: "MessengerController"});
	this.route("/media_library", {name: "media_library", controller: "MediaLibraryController"});
	this.route("/log", {name: "log", controller: "LogController"});
});
