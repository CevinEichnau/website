 function params(obj) {
    var str = "";
    for (var key in obj) {
      if (str != "") {
        
      }
      str += (key + "=" + obj[key]);
    }
    return str ;
  }

window.fbAsyncInit = function() {
console.log("fb init");
  FB.init({
    appId      : '134229033413576', //134229033413576 
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
      app_id:'134229033413576',
      method: 'send',
      name: "Message",
      link: 'http://eichnau.com',
      to:to,
      description:'PlayOn the free music app'

  });
}

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
  console.log('Received data:' + data);
  
  data = {
    "name": data.name,
    "email": data.email,
  }
  
  return data;
}

function getLoginStatus(){

  console.log("getLoginStatus");
  FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log("user logged in");
    $(".fb-login-button").css("display","none");
    $(".facebook_connect").css("display","block").text(params(getUserData(response)));

    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
  } else if (response.status === 'not_authorized') {
    console.log("user is logged in but not in your app");
  } else {
    console.log("user doesnt logged in");
  }
 });

}

function fb_share(name) {
  x = window.location.pathname;

  FB.ui({
      app_id:'134229033413576',
      method: 'feed',
      name: name + " by Cevin Eichnau",
      link: "http://eichnau.com" + x, 
      description: name + " by Cevin Eichnau",
      redirect_uri: 'http://eichnau.com',
      caption: 'Software Developer',
      description: 'for web-applications'

  });
}

function login(foo) {
  FB.login(function(response) {

  }, {scope: 'email,friends_online_presence, read_mailbox'});

  console.log('User logging in');
};


function friends(){
  FB.api('/me/friends', {fields: 'name,id,location,birthday'}, function(response) {
    console.log(response/* .data[0].name */);
  });
}


function send_message(){
  console.log("send message");
  FB.ui({
    app_id:'134229033413576',
    method: 'send',
    name: 'Message',
    link: 'http://eichnau.com',
    to: '100002744106448',
    message: 'A request especially for one person.',
    data: 'tracking information for the user',
    description:'to cevin eichnau '
  });
}


function get_message_box(i){
  $(".message-box-"+i).css("display","block");
}


function online_friends(user){
  //fql?q=
  url = "SELECT name FROM user WHERE   online_presence IN ('active', 'idle')   AND uid IN (     SELECT uid2 FROM friend WHERE uid1 = "+user+" )";
  FB.api('/fql', { q:{"query1":url} }, function(response) {
      $(".fb_ul").empty();
      var i = 0
    var x = response.data[0].fql_result_set.forEach(function(l){
      li = document.createElement("li");
      a = document.createElement("a");
      div = document.createElement("div");
      a2 = document.createElement("a");
      $(li).attr("class","fb_friend_items");
      $(".fb_ul").append(li);
      $(li).append(a);
      $(li).append(div);
      $(a).attr("id", "fb_friend_items")
      i += 1
      $(div).attr("class","message-box-"+i).css("display","none");
      $(a2).text("test123455");
      $(div).append(a2);
      $(a).attr("onclick", "get_message_box("+i+")")
      $(a).text(l["name"]);
      console.log("name => "+l["name"]);
      
    });   
  });
}

function get_unread_count(){
  url = "SELECT name, unread_count, total_count FROM mailbox_folder WHERE folder_id = 0 and viewer_id = me()";

  FB.api('/fql', { q:{"query1":url} }, function(response) {
      $(".fb_ms").empty();
      console.log(response);
    var x = response.data[0].fql_result_set[0]["unread_count"]
      li = document.createElement("li");
      $(li).attr("class","fb_friend_items");
      $(".fb_ms").append(li);
      $(li).text(x);
      console.log("unread => "+x);
  
   
  });
}

function get_message1(){
  url = "SELECT thread_id,updated_time,snippet,snippet_author,unread FROM thread WHERE folder_id=0 AND unread!=0";

  FB.api('/fql', { q:{"query1":url} }, function(response) {
      $(".fb_ms").empty();
      console.log(response);
    var x = response.data[0].fql_result_set[0]["snippet"]
    var y = response.data[0].fql_result_set[1]["snippet"]
      li = document.createElement("li");
      la = document.createElement("li");
      $(li).attr("class","fb_friend_items");
      $(la).attr("class","fb_friend_items");
      $(".fb_ms").append(li);
      $(".fb_ms").append(la);
      $(li).text(x);
      $(la).text(y);
      console.log("message => "+x);
  
   
  });
}


function get_autor(id, callback){
  var result;
  FB.api("/"+id+"?format=json", function(response) { }, callback);
}

function get_message(){
  url = "SELECT thread_id,updated_time,snippet,snippet_author,unread FROM thread WHERE folder_id=0 AND unread!=0";

  FB.api('/fql', { q:{"query1":url} }, function(response) {
      $(".fb_ms").empty();
      console.log(response);
    var x = response.data[0].fql_result_set[0]["snippet"]
    var x_a = response.data[0].fql_result_set[0]["snippet_author"]
    var y = response.data[0].fql_result_set[1]["snippet"]
    var y_a = response.data[0].fql_result_set[1]["snippet_author"]
      li = document.createElement("li");
      la = document.createElement("li");
      $(li).attr("class","fb_friend_items");
      $(la).attr("class","fb_friend_items");
      $(".fb_ms").append(li);
      $(".fb_ms").append(la);
      var a = "";
       get_autor(x_a, function(result){
        a = result["name"];
        $(li).text("Autor: "+a+" Message: "+x);
      });
      
      var b = "";
      get_autor(y_a, function(result){
        b = result["name"];
        $(la).text("Autor: "+b+" Message: "+y);
      });
      

      
      
      console.log("message => "+x);
  
   
  });
}


function fb_share_video(name) {
  x = window.location.pathname;

  FB.ui({
      app_id:'134229033413576',
      method: 'feed',
      name: "Hört sich gerade auf PlayOn  "+ name +" an",
      link: "http://eichnau.com" + x, 
      description: " by Cevin Eichnau",
      redirect_uri: 'http://eichnau.com',
      caption: 'PlayOn by Cevin Eichnau',
      description: 'Software Developer for web-applications'

  });
}