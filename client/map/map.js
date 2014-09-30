Template.map.rendered = function(){
  if(Meteor.userId()==null){
    //Router.go('login');
  };
}

Template.map.events = {
  'dblclick .responsive-scale': function (evt, tmpl) {
      evt.preventDefault();
      evt.stopPropagation();
      if(evt.currentTarget.className === 'responsive-scale' && Session.get('admin')){
        var x = (evt.pageX);
        var y = (evt.pageY);

        var fullsize = 1140;
        var size = $(".responsive-scale").width();
        var factor = size/fullsize;
        var name = "New Table";
        Meteor.call('addPos',name,x*factor,y,function(err,data){
          if(err)
            console.log(err);
          
        Session.set('editing_post',data);
        $("html, body").animate({ scrollTop: 0 }, 600);
        });
      }
  },
  'click #reset':function(){
      Meteor.call('reset');
    },
  'click':function(evt){
    console.log($(".responsive-scale").width());
      if(evt.currentTarget.className === 'responsive-scale' ){
        console.log(evt.pageX + " and " + evt.pageY);
        Session.set('editing_post',null);
        Session.set('editing_name',false);
        Session.set('editing_info',false);
        Session.set('res_change',false);
      }
    }

}

Template.map.positions = function () {
  return Positions.find();
}
Template.map.admin = function(){
  return Session.get('admin');
}
Template.map.user = function(){
  return Session.get('user');
}
