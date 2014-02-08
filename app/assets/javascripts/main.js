$(document).ready(function() {

    $('.imprint').click(function(event) {
        event.preventDefault();
        $('.impressum').slideToggle('slow');

        if($(".impressum").is(":visible")) {
            $("html, body").animate({scrollTop: $(".impressum").offset().top - 250 },700);
        }
    });

    function getDocHeight() {
        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    }

    function checkPosition(){
      var $move = $(".move-down");

      if($(window).scrollTop() + $(window).height() >= getDocHeight() - 100) {
        $(".move-down").removeClass().addClass("move-up");
        $move = $(".move-up")
      } else {
        $(".move-up").removeClass().addClass("move-down");
        $move = $(".move-down");
      }

      $move.unbind("click");
      $move.click(function(event){
      
        if($move.attr("class") == "move-down"){
          $("html, body").animate({scrollTop: 9000 },700);
        } else {
          $("html, body").animate({scrollTop: 0 },700);
        }

        return false;

      });
    }
    
    $(window).scroll(function() {
      checkPosition();
    });

    checkPosition();

    function parallax(){
        var scrolled1 = $(window).scrollTop() + 300 + "px" ;
        
        $('.bg-1').css('top', -(parseInt(scrolled1) * 0.3) + 'px');
        $(".comment-1").css('top', -(parseInt(scrolled1) * 0.2) + 'px');
    }

    $(window).scroll(function(e){
        parallax();
    });
});