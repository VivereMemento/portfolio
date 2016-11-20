$(document).ready(function() {
 
var navPos, winPos, navHeight;
  
function refreshVar() {
  navPos = $('nav').offset().top;
  navHeight = $('nav').outerHeight(true);
}

refreshVar();
$(window).resize(refreshVar);

  $('<div class="clone-nav"></div>').insertBefore('nav').css('height', navHeight).hide(300);
  
$(window).scroll(function() {
  winPos = $(window).scrollTop();
  
  if (winPos >= navPos) {
    $('nav').addClass('nav_pos_fixed');  
    $('.clone-nav').show(5000);
  }  
  else {
    $('nav').removeClass('nav_pos_fixed');
    $('.clone-nav').hide(300);
  }
});

});