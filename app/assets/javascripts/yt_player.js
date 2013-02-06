
function search() {
    text = document.getElementById("txt_input").value
    console.log(text);
    get_video_id(text);
}

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
    text = document.getElementById("txt_output").innerText = song1_complete + "\n" + "\n" + song2_complete + "\n" + "\n" + song3_complete  ;

}






 // var url = "http://gdata.youtube.com/feeds/api/videos?v=2&q=[" + title + "]&max-results=3&fields=entry(title,id)&prettyprint=true";
 //   var title;
 //   $.getJSON(url,{
 //   format: "json"
 // },
 //       function(response){
 //           title = response.data.items[0].title;
 //   });