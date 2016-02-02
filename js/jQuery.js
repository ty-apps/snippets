(function($) {
  'use strict';

  // equalHeights
  // -----------------
  // This function will compare two or more elements and animate them all to the
  // same (min-)height.
  $.fn.equalHeight = function() {
    var heights = [];
    var height;
    $(this).each(function() {
      // Cache the current height.
      height = $(this).css('min-height');
      // Reset min-height (in case it was already set).
      $(this).css({'min-height': ''});
      // Get the element's real height.
      heights.push($(this).outerHeight());
      // Give it back what it had.
      $(this).css({'min-height': height});
    });
    $(this).animate({'min-height': Math.max.apply(Math, heights)}, 200).addClass('equal-height');
  };

  $(window).load(function() {
    // I prefer window.load because images are alrady loaded and measures are
    // more reliable.
    $('.selectors').equalHeight();
  });

})(jQuery);
