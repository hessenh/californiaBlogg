Router.map(function() {
	this.route('login',
		{path:'/'});
	this.route('map');
	this.route('login');
	this.route('request');
	this.route('requests');
	this.route('logout');
	this.route('users');
});

Router.configure({
	layoutTemplate: 'layout'
});

