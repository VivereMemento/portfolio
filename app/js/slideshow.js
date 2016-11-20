$(document).ready(function() {

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

}); // - > ready_end;