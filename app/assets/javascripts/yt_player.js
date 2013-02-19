


function search() {
    text = document.getElementById("query").value
    console.log(text);
    get_video_id(text);

}


function showForm(){
  $(".playlist_form").css("display", "block");
}



$(function() {
    $( ".draggable" ).draggable({
      drag: function(event, ui){
        $( this ).find("h1").addClass("now_drag");
      },
      cursor: "move",
      helper: 'clone',
      revert: "invalid",
      opacity: 0.7,
      "font-size": "1px",
    });
    $( ".droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "a" ).animate({fontSize:'22px'},"fast").animate({fontSize:'15px'},"slow").css({
            "color":"#FF6600",
            "opacity": "0.7"
          });
      },
      over: function(event, ui) {
           $(this).find("a").css({
            "color":"white",
            "opacity": "1.7",
            "font-size":"17px"
          });
        },
        out: function(event, ui) {
           $(this).find("a").css({
            "color":"#FF6600",
            "opacity":"0.7",
            "font-size":"15px"
          });
        }
    });
  });


function get_video_id(title) {
  
    var invocation = new XMLHttpRequest();
    var url = "http://gdata.youtube.com/feeds/api/videos?v=2&q=[" + title + "]&max-results=3&fields=entry(title,id)&prettyprint=true";
    var data;    
    
      if(invocation) {    
        invocation.open('GET', url, false);
        invocation.send(); 
        console.log(invocation);
        var data = invocation;
        send(data);
      }
      else {
       console.log("No Data");
      }

    
}

function send(data) {
    //alert("=> "+ data.responseText +" <=");
    var songs = data.responseText;
    var song = songs.split("<entry>");
    var song1_id = song[1].split(":video:")[1].split("</id>")[0];
    var song2_id = song[2].split(":video:")[1].split("</id>")[0];
    var song3_id = song[3].split(":video:")[1].split("</id>")[0];
    var ids = "1: " + song1_id + "\n 2: " + song2_id + "\n 3: " + song3_id;

    var song1_title = song[1].split("<title>")[1].split("</title>")[0];
    var song2_title = song[2].split("<title>")[1].split("</title>")[0];
    var song3_title = song[3].split("<title>")[1].split("</title>")[0];
    var titles = "1: " + song1_title + "\n 2: " + song2_title + "\n 3: " + song3_title;

    song1_complete = "Tilte: " + song1_title + "  Id: " + song1_id ;
    song2_complete = "Tilte: " + song2_title + "  Id: " + song2_id ;
    song3_complete = "Tilte: " + song3_title + "  Id: " + song3_id ;
    text1 = document.getElementById("txt_output_1").innerText = song1_title + "\n"  ;
    text2 = document.getElementById("txt_output_2").innerText = song2_title + "\n"  ;
    text3 = document.getElementById("txt_output_3").innerText = song3_title + "\n"  ;

    window.id_1 = song1_id;
    window.id_2 = song2_id;
    window.id_3 = song3_id;

    console.log(window.id_1);
     
}

function play_songs(song) {

        if(song == "1") {
            console.log("1");
            play1(window.id_1);
        } else if(song == "2") {
            console.log("2");
            play1(window.id_2);
        } else if(song == "3") {
            console.log("3");
            play1(window.id_3);
        } else { alert("Error"); }
        
    }

 function onYouTubePlayerReady(playerId) {
      ytplayer = document.getElementById("myytplayer");
    }    

function play() {
    console.log(ytplayer);
  if (myytplayer) {
    console.log(ytplayer);
    myytplayer.playVideo();
    playerStateChange(1);
  }
}  




function timeDuration(){
  current = myytplayer.getCurrentTime();
  time = myytplayer.getDuration();
  t = time - current;
  percent = current / (time/100);
  
  timeline = document.getElementById("yttimer");
  timeline.style.width = percent+"%";

}

 function playerStateChange(newState){      
        console.log(newState);
        
        if(newState == 1){
progressUpdater = setInterval(function(){
   current = myytplayer.getCurrentTime();
  time = myytplayer.getDuration();
  t = time - current;
  percent = current / (time/100);
  console.log(newState);
  if(newState == 1){
    ctime = Math.floor(myytplayer.getCurrentTime());
    $("#yttimer").css("width", percent+"%");
    //Here starts the flickering fix
    $("#yttimer").on('slidechange',function(event,ui){
        //Fix Flcikering;
        if(ui.value < ctime){
            $("#yttimer").slider("value", percent+"%");
        }
    });
    //And here it ends.
    }
    },1000);
  }
}




function pause() {
    console.log(myytplayer);
  if (myytplayer) {
    console.log(myytplayer);
    myytplayer.pauseVideo();
    playerStateChange(2);
    clearInterval(progressUpdater);
  }
}

function stop() {
    console.log(myytplayer);
  if (myytplayer) {
    console.log(myytplayer);
    myytplayer.stopVideo();
    clearInterval(progressUpdater);
  }
}  

function play1(id) {
    var src = "http://www.youtube.com/v/" + id + "?enablejsapi=1&playerapiid=ytplayer&version=3;rel=0;showinfo=0;controls=0";
    var  tt = document.getElementById("myytplayer")
    if(tt){ 
    tt.data = src;
    }
    var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };
    swfobject.embedSWF(src, "ytapiplayer", "500", "300", "8", null, null, params, atts);    
    clearInterval(progressUpdater);
}

function play21(id) {
    console.log(id);
    var src = "http://www.youtube.com/v/" + id + "?enablejsapi=1&playerapiid=ytplayer&version=3";
    var iframe = document.getElementById("ytplayer").src = src ;
}

function getScreen( url, size )
{
  if(url === null){ return ""; }

  size = (size === null) ? "big" : size;
  var vid;
  var results;

  results = url.match("[\\?&]v=([^&#]*)");

  vid = ( results === null ) ? url : results[1];

  if(size == "small"){
    return "http://img.youtube.com/vi/"+vid+"/2.jpg";
  }else {
    return "http://img.youtube.com/vi/"+vid+"/0.jpg";
  }
}

//imgUrl_big   = getScreen("uVLQhRiEXZs"); 
//imgUrl_small = getScreen("uVLQhRiEXZs", 'small');

