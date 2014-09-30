Meteor.subscribe('requestList');
RequestList = new Meteor.Collection('requestList');



Template.login.events({
    'click .request-submit':function(){
      Router.go('request');
    },
    'click .login-submit' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;
      var data = {email:email,password:password}

      Meteor.loginWithPassword({email:data.email}, data.password, function(err){
        if (err)
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          console.log(err.reason);
        else
          Router.go('map');
          if(Meteor.user().profile.role=="admin")
            Session.set('admin',true);
          else
            Session.set('user',true);

          //Router.go('map');
      });
    }
  });

 Template.request.events({
    'click .back':function(){
      Router.go('map');
    },
    'click .request-submit' : function(e,t){
      Meteor.call('requestAccount',t.find('#account-email').value);
      alert("A request is sent!");
    }
  });