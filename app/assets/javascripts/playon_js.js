
function search() {
    $(".search_results").css("display", "block").empty();
    $(".playlist_results").css("display", "none");

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
    console.log("=> "+songs);
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
      h1.setAttribute('class',"draggable search_song");

      h1.setAttribute('id',"txt_output_"+i);
      div.appendChild(a);
      a.appendChild(h1);
      $(h1).attr("data-video-id", song_id[i]);
      $(h1).text(song_title[i]);
      console.log(song_title[i]);
      i += 1
    });

    foo();

    $(".search_song").click(function(event) {
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


function set_quality(qualy){
  // small, medium, large, hd720, hd1080, highres, default
  myytplayer.setPlaybackQuality(qualy);
}



function timeDuration(){
  var y = myytplayer.getVolume();
  var x = myytplayer.getPlaybackQuality();
  console.log("Quality => "+x);
  console.log("Volume => "+y);

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



function set_volume(volume){
  myytplayer.setVolume(volume);
}

function get_volume(){
  var x = myytplayer.getVolume();
}



function play1(id) {
  console.log(id);

    var src = "http://www.youtube.com/v/" + id + "?enablejsapi=1&playerapiid=ytplayer&version=3;rel=0;showinfo=0;controls=0;autoplay=1";
    var  tt = document.getElementById("myytplayer")
    if(tt){ 
    tt.data = src;
    }
    var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };
    swfobject.embedSWF(src, "ytapiplayer", "700", "300", "8", null, null, params, atts);    
    //clearInterval(progressUpdater);
    playerStateChange(1);

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
  foo();

   

  $("#query").keyup(function(event){
    if(event.keyCode == 13){
      $("#search").click();
    }
  });


  $(".full_hd").click(function(){
    set_quality("highres");
  });

  $(".hd").click(function(){
    set_quality("hd720");
  });

  $(".sd").click(function(){
    set_quality("medium");
  });

  $(".cancel-edit").click(function(){
    $(".edit_playlist").css("display", "none");
  });


  $(".edit_playlists").click(function(event){
    $(".edit_playlist").css("display", "block");
    var test = $(this).parent().attr("id"); 
    $(".button_to").attr("action", "/playlists/"+test);
    var name = ""
    $(".input-rename").keyup(function(){
        name = $(".input-rename").val();
        $(".rename-playlist").attr("href", "/playlists/"+test+"/edit?name="+name);
    });

  });


    var myWidth;
    var myHeight;

      if( typeof( window.innerWidth ) == 'number' ) { 

    
      myWidth = window.innerWidth;
      myHeight = window.innerHeight; 

      } else if( document.documentElement && 

      ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 

     

      myWidth = document.documentElement.clientWidth; 
      myHeight = document.documentElement.clientHeight; 

      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 

 

      myWidth = document.body.clientWidth; 
      myHeight = document.body.clientHeight; 

      }

      $(window).resize(function() {
        var myWidth;
    var myHeight;

      if( typeof( window.innerWidth ) == 'number' ) { 

    
      myWidth = window.innerWidth;
      myHeight = window.innerHeight; 

      } else if( document.documentElement && 

      ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 

     

      myWidth = document.documentElement.clientWidth; 
      myHeight = document.documentElement.clientHeight; 

      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 

 

      myWidth = document.body.clientWidth; 
      myHeight = document.body.clientHeight; 

      }
        $(".myytplayer1").css("height", myHeight);
      });


  $(".icon-resize-full").click(function(event){
      $("#video-wrapper").addClass("video-wrapper1").attr("id", "nil");
      $("#myytplayer").addClass("myytplayer1").css("height", myHeight);
      $("#quality").css("display", "none");
    
  });



   $(".icon-resize-small").click(function(event){
      $(".video-wrapper1").removeClass().attr("id","video-wrapper");
      $(".myytplayer1").removeClass().removeAttr("height");
      $("#myytplayer").css("height", "300px");
  });


  $(".video_menu").click(function(event){
    $(".menu-pop").css("display", "block");
    var test = $(this).parent().attr("id");
    var test2 = $(this).parent().attr("data-video-title");
    console.log(test);
    $(".button_to").attr("action", "/links/"+test);
    $(".share-btn").attr("id", test2);
  })


    $(".volume_bar").slider({
      min: 0,
      max: 100,
      value: 100,
      slide: function( event, ui ) {
        console.log( ui.value );
        set_volume(ui.value);
      }
    });


  $(".share-btn").click(function(event){
      fb_share_video( $(this).attr("id") );
  })

   $(".plares").click(function(event){
       x = $(event.target).data("video-id");
       console.log(x);
       play1(x); 

   });

   $(".play_title").click(function(event){
      var id = $(this).attr("id");
      play1(id);
      console.log("=>>"+id);
      playerStateChange(1);
   });

   $(".droppable").click(function(event){
      var id = $(this).attr("id");
      $(".play_list").css("display", "none");
      $("#play_list_"+id).css("display", "block");
   });

   $(".playlist").click(function(){
      $(".search_results").css("display", "none");
      $(".playlist_results").css("display", "block");
   });

   $(".playlist-title").click(function(event){
      $(".search_results").css("display", "none");
      $(".playlist_results").css("display", "block");
      play1( $(this).attr("id") );
      console.log( "=> "+ $(this) +" <=" );
   });


   $("#now_playing").click(function(){
      $(".search_results").css("display", "block");
      $(".playlist_results").css("display", "none");
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

  $(".cancel-pop").click(function(){
    $(".menu-pop").css("display", "none");
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
          console.log("========> "+ data);
          console.log("========> "+ $(this));
          console.log("========> "+xhr);
          var playlist_id = $(data).filter(".playlist_container").data("ident");
          //el = $(".test");
          el = $(".playlist_container[data-ident="+playlist_id+"]");
          console.log(el);
          el.replaceWith(data);          
          el.hide();
          el.fadeIn('slow'); 

        })
        
        .bind('ajax:failure', function(xhr, status, error) { alert("failure!");})
        .bind('ajax:complete', function() {
         console.log("complete"); 
         $(".playlist_results").load("/play_on .playlist_results",function(){
          reload1();
         });
          reload1();
       });
    });
  }); 



  function reload1(){
    $(".playlist-title").click(function(event){
      var id = $(this).attr("id");
      play1(id);
   });

    $(".play_title").click(function(event){
      var id = $(this).attr("id");
      play1(id);
   });



  $(".video_menu").click(function(event){
    $(".menu-pop").css("display", "block");
    var test = $(this).parent().attr("id");
    var test2 = $(this).parent().attr("data-video-title");
    console.log(test);
    $(".button_to").attr("action", "/links/"+test);
    $(".share-btn").attr("id", test2);
  })


  $(".share-btn").click(function(event){
      fb_share_video( $(this).attr("id") );
  })


  }

  function reload(){

    var obj = $(".playlist_container > ul > li");
      var n = obj.length  ; 
      //obj.slice(-n).addClass("non_vis").hide();



    $(".playlist").click(function(event){
      x = $(this).parent().data("playlist-id");
      $(this).parent().find("li").slice(-n).addClass(x).slideToggle();

  });

       $(".plares").click(function(event){
       x = $(event.target).data("video-id");
       console.log(x);
       play1(x); 

   });


 $("#query").keyup(function(event){
    if(event.keyCode == 13){
      $("#search").click();
    }
  });

   $(".play_title").click(function(event){
      var id = $(this).attr("id");
      play1(id);
   });

   $(".droppable").click(function(event){
      var id = $(this).attr("id");
      $(".play_list").css("display", "none");
      $("#play_list_"+id).css("display", "block");
   });

   $(".playlist").click(function(){
      $(".search_results").css("display", "none");
      $(".playlist_results").css("display", "block");
   });

   $(".playlist-title").click(function(event){
      $(".search_results").css("display", "none");
      $(".playlist_results").css("display", "block");
      play1( $(this).attr("id") );
   });


   $("#now_playing").click(function(){
      $(".search_results").css("display", "block");
      $(".playlist_results").css("display", "none");
   });

   $(".create-playlist").click(function(){
      $(".playlist_form").css("display", "block");
   });
  }


  $(function(){
      var new_playlist_form = $("#new_playlist");
      console.log(new_playlist_form);
      new_playlist_form
        .bind('ajax:loading', function() { 
         console.log("loading");
        })
       
        .bind('ajax:success', function(event, data, status, xhr) {
       
          //el = $(".test");
          el = $(".playlist_index");
          console.log(el);
          el.replaceWith(data);          
          el.hide();  

        })
        
        .bind('ajax:failure', function(xhr, status, error) { alert("failure!");})
        .bind('ajax:complete', function() { 
            console.log("complete");
             var obj = $(".playlist_container > ul > li");
            var n = obj.length  ; 
            obj.slice(-n).addClass("non_vis").hide();
            $(".playlist_form").css("display", "none");
            $("#playlist_name").val('');
            reload();
            foo();
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