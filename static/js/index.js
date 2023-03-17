(function ($) {
    'use strict';
  
    // data background
    $('[data-background]').each(function () {
      $(this).css({
        'background-image': 'url(' + $(this).data('background') + ')'
      });
    });
  
  })(jQuery);