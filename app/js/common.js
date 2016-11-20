(function ($) {$(document).ready(function () {

    //hiddenMenu

  function hiddedMenu() {
      var $trigger = $('.trigger-nav'),
          $closebtn = $('.closebtn'),
          $menu = $('.trigger-victim');
      
      $trigger.click(function() {
        $($menu).fadeIn();
        $('.nav-closebtn').css('display', 'block');

      });

      $closebtn.click(function() {
        $(this).removeAttr('style');
        $($menu).fadeOut();
      });
      
      $(window).resize(function() {
        if ( $(window).width() > 992 ) {
          $menu.removeAttr('style');
        }
      });
    }
    hiddedMenu();

    //comment-modal

  $('.trigger-comment').click(function() {
    $(this).next($('.user-comment__modal'))
    .fadeIn()
    .removeClass('hidden')
    .addClass('visible');
  });

  $('.closebtn').click(function() {
    $('.user-comment__modal')
      .fadeOut()
      .addClass('hidden')
      .removeClass('visible');
  });

    //carousel

  $('.slider__controls-buttons').on('click', function(e) {
    e.preventDefault();

    var
      $this = $(this),
      container = $this.closest('.slider'),
      list = container.find('.slider__list'),
      items = container.find('.slider__item'),
      activeSlide = items.filter('.active'),
      nextSlide = activeSlide.next(),
      prevSlide = activeSlide.prev(),
      firstSlede = items.first(),
      lastSlide = items.last(),
      sliderOffset = container.offset().left,
      reqPos = 0,
      itemPosition = activeSlide.index(),
      trigger = container.find('.triggers__item');

    if ($(this).hasClass('slider__controls-buttons_next')) {
      if (nextSlide.length) {
        findReqPos(nextSlide);
        removeActiveClass(nextSlide);
      } else {
        findReqPos(firstSlede);
        removeActiveClass(firstSlede);
      }
    } else {
      if (prevSlide.length) {
        findReqPos(prevSlide);
        removeActiveClass(prevSlide);
      } else {
        findReqPos(lastSlide);
        removeActiveClass(lastSlide);
      }
    }
    list.css('left', '-=' + reqPos + 'px');

    function removeActiveClass (reqSlide) {
      reqSlide.addClass('active').siblings().removeClass('active');
      trigger.eq(itemPosition)
            .addClass('active')
            .siblings()
            .removeClass('active');
    }

    function findReqPos (slide) {
      reqPos = slide.offset().left - sliderOffset;
    }
  });

  	//slideshow
    
	$('.slideshow__pic').on('click', function(e) {
    e.preventDefault();

    var
      $this = $(this),
      item = $this.closest('.slideshow__item'),
      itemPosition = item.index(),
      container = $this.closest('.slideshow'),
      trigger = container.find('.triggers__item'),
      display = container.find('.slideshow__display'),
      path = item.find('img').attr('src'),
      duration = 300;

    if (!item.hasClass('active')) {
      item.addClass('active').siblings().removeClass('active');

      display.find('img').fadeOut(duration, function() {
        $(this).attr('src', path).fadeIn(duration);
      })

      trigger.eq(itemPosition)
            .addClass('active')
            .siblings()
            .removeClass('active');
    }
  });


  }); //end ready

}(jQuery));