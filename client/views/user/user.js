Meteor.subscribe("directory");
Directory = new Meteor.Collection('directory');

Template.users.userlist = function(){
	return Meteor.users.find();
}
Template.users.admin = function(){
  return Session.get('admin');
}
