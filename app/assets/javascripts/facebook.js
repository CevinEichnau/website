window.fbAsyncInit = function() {

  FB.init({
    appId      : '457219220998113', 
    channelUrl : '//eichnau.com/contact.html', 
    status     : true, 
    cookie     : true, 
    xfbml      : true  
  });
};


(function(d, debug){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
   ref.parentNode.insertBefore(js, ref);
 }(document, /*debug*/ false));

function facebook_send_message(to) {
  FB.ui({
      app_id:'457219220998113',
      method: 'send',
      name: "Message",
      link: 'http://www.eichnau.com',
      to:to,
      description:'to cevin eichnau '

  });
}
