

window.fbAsyncInit = function() {
console.log("fb init");
  FB.init({
    appId      : '457219220998113', 
    channelUrl : 'http://eichnau.com', 
    status     : true, 
    cookie     : true, 
    xfbml      : true  
  });
  console.log("fb init after");
};


(function(d, debug){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "http://connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
   ref.parentNode.insertBefore(js, ref);
 }(document, /*debug*/ false));

function facebook_send_message(to) {
  FB.ui({
      app_id:'457219220998113',
      method: 'send',
      name: "Message",
      link: 'http://eichnau.com',
      to:to,
      description:'to cevin eichnau '

  });
}

function fb_share(name) {
  x = window.location.pathname;

  FB.ui({
      app_id:'457219220998113',
      method: 'feed',
      name: name + " by Cevin Eichnau",
      link: "http://eichnau.com" + x, 
      description: name + " by Cevin Eichnau",
      redirect_uri: 'http://eichnau.com',
      caption: 'Software Developer',
      description: 'for web-applications'

  });
}

     