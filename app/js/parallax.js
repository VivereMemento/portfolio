$(document).ready(function () {
	$(window).scroll(function(){
    var st = $(window).scrollTop();

    $(".parallax-box").css({
      "transform" : "translate(0%, -" + st /30 + "%"
    });

    $(".parallax-img").css({
      "transform" : "translate(0%, " + st /30 + "%"
    });
  });
});//end ready