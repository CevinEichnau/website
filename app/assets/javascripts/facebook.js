      function params(obj) {
        var str = "";
        for (var key in obj) {
          if (str != "") {
            str += "&";
          }
          str += (key + "=" + encodeURIComponent(obj[key]));
        }
        return str ;
      }

      function load() {
        window.location.reload();
      };


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

     window.onload = function () {
      console.log("getStatusOnload");
        FB.getLoginStatus(function(response) {
          console.log("getStatusAfter");
          if (response.status === 'connected') {
            console.log('User is already connected to Facebook');
            getUserData(response); 
          }
          else {
            console.log('User doesnt logged in');
          };
        });      
      };

      function getStatus(){
        console.log("getStatus");
         FB.getLoginStatus(function(response) {
          console.log("getStatus2");
          if (response.status === 'connected') {
            console.log('Connecting via getStatus');
            getUserData(response);
          }
          else {
            console.log("login gs");
            login();
          };
        }); 
         console.log("getStatus after?");
      };

      function login(foo) {
        FB.login(function(response) {
          console.log("login ?");
        }, {scope: 'email'});

        console.log('User logging in');
      };

      function getUserData(response) {
        var ui = response.authResponse.userID;
        var at = response.authResponse.accessToken;
        var xmlHttp = null;
        var url = "https://graph.facebook.com/" + ui + "?fields=first_name,last_name,middle_name,name,email&scope=user_mobile_phone&access_token=" + at;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        var data = xmlHttp.responseText;
        data = JSON.parse(data);
        console.log('Received data:' + data.email);
        redirect();
        
        data = {
          "email": data.email,
        }
        
        return data;
      } 

      function postToFeed(data) {   
        var obj = {
          method: 'feed',
          link: "http://eichnau.com",
          name: 'PlayOn by Cevin Eichnau',
          caption: 'the free musik app',
          description: 'Developer: Cevin Eichnau'
        };

        function callback(response) {
          FB.getLoginStatus(function(response) {

          });
        };

        FB.ui(obj, callback);
      };

   

      function redirect(){
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            console.log(params(getUserData(response))); 
            
          }
          else { 
            login();
          }
        });
      }
