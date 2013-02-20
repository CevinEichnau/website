
function search() {
    text = document.getElementById("query").value
    console.log(text);
    get_video_id(text);

}

$(function(){
  var obj = $(".playlist_container > ul > li");
      var n = obj.length  ; 
      obj.slice(-n).addClass("non_vis").hide();

  $(".playlist").click(function(event){
      x = $(this).parent().data("playlist-id");
      $(this).parent().find("li").slice(-n).addClass(x).slideToggle();

  });   

});



function get_video_id(title) {
  
    var invocation = new XMLHttpRequest();
    var url = "http://gdata.youtube.com/feeds/api/videos?v=2&q=[" + title + "]&max-results=50&fields=entry(title,id)&prettyprint=true";
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
    //http://gdata.youtube.com/feeds/api/videos?v=2&q=[%22sido%22]&max-results=50&fields=entry(title,id)&prettyprint=true&alt=json
    var songs = data.responseText;
    var song = songs.split("<entry>");
    var songarray = []

    song.forEach(function(s){
      songarray.push(s) ;
    });
    console.log(songarray);
    songarray.shift();
    var song_id = []
    songarray.forEach(function(d){
     var x = d.split(":video:")[1].split("</id>")[0];
     song_id.push(x); 
    });
    console.log(song_id);

    song_title = []
    songarray.forEach(function(d){
     var x = d.split("<title>")[1].split("</title>")[0];
     song_title.push(x); 
    });
    console.log(song_title);

    i = 0
    songarray.forEach(function(n){
      var div = document.getElementById('search_results');
      var a = document.createElement('a');
      var h1 = document.createElement('h1');
      a.setAttribute('id',"song"+i);
      a.setAttribute('class',"draggable1");
      h1.setAttribute('class',"draggable");

      h1.setAttribute('id',"txt_output_"+i);
      div.appendChild(a);
      a.appendChild(h1);
      $("#txt_output_"+i).attr("data-video-id", song_id[i]);
      document.getElementById("txt_output_"+i).innerText = song_title[i] + "\n"  ;
      i += 1
    });

    foo();

    $(".draggable").click(function(event) {
      console.log($(event.target).data("video-id"));
      play1($(event.target).data("video-id"));
    });
     
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
    swfobject.embedSWF(src, "ytapiplayer", "700", "300", "8", null, null, params, atts);    
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

$(function() {

   $(".plares").click(function(event){
       x = $(event.target).data("video-id");
       console.log(x);
       play1(x); 

   });

   $(".playlist").click(function(){
      $(".search_results").css("display", "none");
      $(".playlist_results").css("display", "block");
   });

   $(".create-playlist").click(function(){
      $(".playlist_form").css("display", "block");
   });

   $(".sign-up").click(function(){
    openPopUp();
  });

  $("#pop_close").click(function(){
    closePopUp();
    closePopUp1();
  });

  $(".sign-in").click(function(){
    openPopUp1();
  });

  $(".sign-in-change").click(function(){
    changePopUp();
  });

  $("#chanel-pop").click(function(){
    closePopUp();
  });

  $("#chanel-pop1").click(function(){
    closePopUp1();
  });    


    
  });



function foo(){
  $( ".draggable" ).draggable({
      drag: function(event, ui){

        $( this ).find("h1").addClass("now_drag");
        $(".ui-draggable-dragging").css("font-size", "0px");
      },
      cursor: "move",
      helper: 'clone',
      revert: "invalid",
      stop:function(evt,ui){
        $(".now_drag").removeClass();
    },
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

          $("#submit_new_link").trigger("click");
      },
      over: function(event, ui) {
           $(this).find("a").css({
            "color":"white",
            "opacity": "1.7",
            "font-size":"17px"
          });
           p_id = $(this).find(".playlist_id").data("playlist-id");
           v_id = $(".ui-draggable-dragging").data("video-id");
           v_title = $(".ui-draggable-dragging").text();

             $("#link_title").val(v_title);
             $("#link_video_id").val(v_id);
            $("#link_playlist_id").val(p_id);

            




        },
        out: function(event, ui) {
         
           $(this).find("a").css({
            "color":"#FF6600",
            "opacity":"0.7",
            "font-size":"15px"
          });
        }
    });

}


 
  $(function(){

    $(function($){
      var new_link_form = $("#new_link");
      console.log(new_link_form);
      new_link_form
        .bind('ajax:loading', function() { 
         console.log("loading");
        })
       
        .bind('ajax:success', function(event, data, status, xhr) {
       
          var playlist_id = $(data).filter(".playlist_container").data("ident");
          //el = $(".test");
          el = $(".playlist_container[data-ident="+playlist_id+"]");
          console.log(el);
          el.replaceWith(data);          
          el.hide();
          el.fadeIn('slow');          
        })
        
        .bind('ajax:failure', function(xhr, status, error) { alert("failure!");})
        .bind('ajax:complete', function() { console.log("complete"); });
    });
  }); 




    function closePopUp() {
      $("#modal").css({
        "display":"none"
      });
    };

    function openPopUp() {
      $("#modal").css({
        "display":"block"
      });
    };

    function changePopUp() {
      $("#modal").css({
        "display":"none"
      });

      $("#modal1").css({
        "display":"block"
      });
    }


    function closePopUp1() {
      $("#modal1").css({
        "display":"none"
      });
    };

    function openPopUp1() {
      $("#modal1").css({
        "display":"block"
      });
    };

    function changePopUp1() {
      $("#modal1").css({
        "display":"none"
      });

      $("#modal").css({
        "display":"block"
      });
    }