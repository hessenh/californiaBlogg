Template.requests.requestList = function(){
	return RequestList.find({});
}

Template.requests.admin = function(){
  return Session.get('admin');
}
Template.requests.events({
	'click .request-yes':function(e,tmpl){
		  e.preventDefault();
      	var email = RequestList.findOne(Session.get("selected")).email
        	, password = "123";

        var profile = {
          email:email,
          role: "User"
        };

        // Trim and validate the input
      if(Meteor.users.findOne({ emails: { $elemMatch: { address: email } } })){
        alert("User excists!");
      }
      else{

        Accounts.createUser({
          email: email, 
          password : "123",
          profile: profile});
          console.log("User created");
        var content = "You have now access to my site!" +
                      "Your username will be your email-adress, and your password will be 123";
        Meteor.call('sendMail',email,content);
        Meteor.call('removeRequest',Session.get('selected'));
      }
  },
  'click .request-no':function(e,tmpl){
    var message = "Sorry. You will not have access to my site."
    Meteor.call('sendMail',message);
    Meteor.call('removeRequest',Session.get('selected'));
  }
});
Template.request_item.events({
	'click .requestSelected':function(evt,tmpl){
		Session.set('selected',this._id);
		console.log(RequestList.findOne(Session.get("selected")).email);
	}
});





Template.request_item.selected = function(){
	if(Session.get('selected')==this._id){
		return "selected";
	}
	else{
		return "";
	}
}