$(document).ready(function () {

  $(window).resize(function() {
    if ( $(window).width() < 992 ) {
      $('.animate-jq').removeClass('animated');
      $('.nav').removeClass('nav-waypoint');
      $('.nav').removeClass('nav_pos_fixed');
    }
    else {
      $('.animate-jq').addClass('animated');
      $('.nav').addClass('nav-waypoint');
    }
  });

  $(window).width(function() {
    if ( $(window).width() < 992 ) {
      $('.animate-jq').removeClass('animated');
      $('.nav').removeClass('nav-waypoint');
    }
  });

  // HEADER

  $('.logo').addClass('fadeInRight');
  $('.header__heading').addClass('fadeInDown');
  $('.navbar__item').addClass('fadeInDown');
  $('.nav').addClass('fadeInUp');
  $('.header').waypoint( function(dir) {
    if(dir === "down") {
      $('.nav-waypoint').addClass('fadeInDown nav_pos_fixed');
      $('.nav-waypoint').removeClass('fadeInUp');
    } 
    else {
      $('.nav-waypoint').addClass('fadeInUp');
      $('.nav-waypoint').removeClass('fadeInDown nav_pos_fixed');
    }
      
  }, {
    offset: '-15%'
  });

  // FEATUREs
  $('.features').waypoint( function(dir) {
      var animationName = 'animated tada';
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      if(dir === "down") {
        $('.features__icon').addClass(animationName).one(animationEnd, function() {
        $('.features__icon').removeClass(animationName);
        });
      } 
      else {
        $('.features__icon').addClass(animationName).one(animationEnd, function() {
        $('.features__icon').removeClass(animationName);
        });
      }
        
    }, {
      offset: '50%'
  });

  // FITNESS FIRST

  $( ".link" ).hover(function() {
    var animationName = 'animated swing';
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    $('.link').addClass(animationName).one(animationEnd, function() {
    $('.link').removeClass(animationName);
    });
  });
});//end ready
