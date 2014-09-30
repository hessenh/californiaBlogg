
Template.position.editing_table = function(){
  return Session.equals('editing_table',this._id)
};
Template.position.editing_post = function(){
	return Session.equals('editing_post',this._id);
};
Template.editPostTemplate.editing_name = function(){
	return Session.get('editing_name');
};
Template.editPostTemplate.editing_info = function(){
	return Session.get('editing_info');
};
Template.position.res_change = function(){
	return Session.get('res_change');
};
Template.position.admin = function(){
    return Session.get('admin');
};


Template.position.events ({
    'dblclick':function(evt,tmpl){
    	evt.stopPropagation();
    	evt.preventDefault();
    	Session.set('editing_table',this._id);
    },
    'click .circle-image':function(evt,tmpl){
   		evt.stopPropagation();
    	evt.preventDefault();
    	Session.set('editing_post',this._id);
    	//$("html, body").animate({ scrollTop: 0 }, 600);
    },
    'click .update':function(evt,tmpl){
    	evt.stopPropagation();
    	evt.preventDefault();
    	var name = tmpl.find('.post_name').value;
    	var info = tmpl.find('.post_info').value;
        if(Session.get('editing_name') && !Session.get('editing_info')){
            Meteor.call('updatePostName',this._id,name);
        }
        else if(Session.get('editing_info') && !Session.get('editing_name')){
            Meteor.call('updatePostInfo',this._id,info);
        }
        else if(Session.get('editing_name')&&Session.get('editing_info')){
            Meteor.call('updatePost',this._id,name,info);
        }
        
    	Session.set('editing_name',false);
    	Session.set('editing_info',false);
    	Session.set('res_change',false);
    },
    'click .closeButton':function(){
    	Session.set('editing_post',null);
    	Session.set('editing_name',false);
    	Session.set('editing_info',false);
    	Session.set('res_change',false);
    },
    'click .post_name':function(evt,tmpl){
    	Session.set('editing_name',true);
   		Session.set('res_change',true);
    },
    'click .post_info':function(){
    	Session.set('editing_info',true);
    	Session.set('res_change',true);
    },
});

