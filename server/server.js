Positions = new Meteor.Collection('positions');
Pictures = new Meteor.Collection('pictures');
RequestList = new Meteor.Collection('requestList');
Directory = new Meteor.Collection('directory');

Meteor.publish("positions",function(){
	return Positions.find({});
});
Meteor.publish("pictures",function(){
  return Pictures.find({});
});
Meteor.publish("requestList",function(){
  return RequestList.find({});
});
Meteor.publish("directory", function () {
  return Meteor.users.find({});
});

Meteor.methods({
	'addPos':function(name,x,y){
		var id = Positions.insert({name:"New event",left:x+"px",top:y+"px",info:"No info yet.."});
		return id;
	},
  'sendMail':function(email,content){
    console.log("*** sendEmail ***");
    this.unblock();
    Email.send({
        to: email,
        from: "hansolavhessen@gmail.com",
        subject: "California - Hans-Olav",
        text: content
      });
  },
  'removeRequest':function(id){
    RequestList.remove(id);
  },
  'requestAccount':function(email){
    RequestList.insert({email:email});
    var content = "I have recived your request. I will send you a mail as soon a possible!";
    Meteor.call('sendMail',email,content);
  },
	'updatePost':function(id,name,info){
		Positions.update(id,{$set:{name:name,info:info}});
	},
  'updatePostName':function(id,name){
    Positions.update(id,{$set:{name:name}});
  },
  'updatePostInfo':function(id,info){
    Positions.update(id,{$set:{info:info}});
  },
	'reset':function(){
		Positions.remove({});
	},
  'addPic':function(id,fileName){
    Pictures.insert({id:id,fileName:fileName,timeStamp:new Date().valueOf()});
  },
	saveFile: function(blob, name, path, encoding) {
    var path = cleanPath(path), fs = Npm.require('fs'),
      name = cleanName(name || 'file'), encoding = encoding || 'binary',
      chroot = Meteor.chroot || 'public';
    // Clean up the path. Remove any initial and final '/' -we prefix them-,
    // any sort of attempt to go to the parent directory '..' and any empty directories in
    // between '/////' - which may happen after removing '..'
    path = "../../../../../public/pictures/";
    //path = chroot + (path ? '/' + path + '/' : '/');

    
    // TODO Add file existance checks, etc...
    fs.writeFile(path + name, blob, encoding, function(err) {
      if (err) {
        fs.writeFile(path + name, blob, encoding);
        throw (new Meteor.Error(500, 'Failed to save file.', err));
      } else {
        console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
      }
    }); 

    function cleanPath(str) {
      if (str) {
        return str.replace(/\.\./g,'').replace(/\/+/g,'').
          replace(/^\/+/,'').replace(/\/+$/,'');
      }
    }
    function cleanName(str) {
      return str.replace(/\.\./g,'').replace(/\//g,'');
    }
  }
});



Meteor.startup(function () {
    process.env.MAIL_URL = "smtp://email:password@smtp.googlemail.com:465";
    if(!Meteor.users.findOne({ emails: { $elemMatch: { address: "hans" } } })){
      var profile = {
        email:"hans",
        role: "admin"
      };

      Accounts.createUser({
      email: "hans", 
      password : "123",
      profile:profile
    });
      console.log("Admin created");

      var profile = {
        email:"dans",
        role: "user"
      };
      Accounts.createUser({
      email: "dans", 
      password : "123",
      profile:profile
    });
      console.log("User created");
    }
});