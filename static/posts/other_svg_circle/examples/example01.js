;(function($) {
  $(function() {

    var CircleSVG = (function() {
      var CircleSVG = function($svg) {
        this.$svg = $svg;
        this.radius = 90;
        this.progress = 0;

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var $path = $(path);
        $path.attr({
          stroke: 'url(#MyGradient01)',
          'stroke-width': '20',
          fill: 'none'
        });

        $path.appendTo($svg);
        this.$path = $path;
      };

      var proto = CircleSVG.prototype;

      proto.setProgress = function(progress) {
        this.progress = progress;
      };

      proto.update = function() {
        var start = {
          x: 90,
          y: 0
        };
        var radius = {
          x: this.radius,
          y: this.radius
        };
        var rad = Math.PI * 2 * this.progress;
        var end = {
          x: (radius.x * Math.cos(rad)) - start.x,
          y: (radius.y * Math.sin(rad)) - start.y
        };

        var d = 'M ' + start.x + ',' + start.y + ' ';
        d = d + 'a ' + radius.x + ' ' + radius.y + ' ';
        d = d + '0 ';
        d = d + ((this.progress >= 0.5) ? '1 ' : '0 ');
        d = d + '1 ';
        d = d + end.x + ',' + end.y;

        this.$path.attr('d', d);
        if (progress > 0.75) {
          this.$path.attr('stroke', 'url(#MyGradient02)');
        }
      };

      return CircleSVG;
    })();

    var $svg = $('#svg');
    var circle = new CircleSVG($svg);
    var progress = 0;

    var timer = setInterval(function() {

      if (progress >= 1.0) progress = 1.0;

      circle.setProgress(progress);
      circle.update();

      if (progress >= 1.0) {
        clearInterval(timer);
      }

      progress += 0.0030;
    }, 15);



  });
})(jQuery);
