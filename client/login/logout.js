Template.logout.rendered = function(){
	Meteor.logout();
	Session.set('admin',null);
	Session.set('user',null);
	Session.set('editing_post',null);
    Session.set('editing_name',false);
    Session.set('editing_info',false);
    Session.set('res_change',false);
}