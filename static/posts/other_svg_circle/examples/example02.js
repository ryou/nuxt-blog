;(function($) {
  $(function() {
    $('#svg .circle-path').animate({
      'stroke-dashoffset': 0
    }, {
      easing: 'linear',
      duration: 3000,
      progress: function(animation, progress, remain) {
        if (progress >= 0.75) {
          $('#svg .circle-path').css({
            stroke: 'url(#MyGradient02)'
          });
        }
      }
    });
  });
})(jQuery);
