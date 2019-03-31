$(function() {

  (function() {
    var $components = $('.js-animation');

    // 各コンポーネントの処理
    $components.each(function() {
      /* 変数
      ----------------------------------------------------------*/
      var $component = $(this);
      var margin = $component.data('animation-margin') || 0;
      var $targets = $component.find('.js-animation_target');

      /* 関数
      ----------------------------------------------------------*/
      var update = function() {
        var componentT = $component.offset().top;
        var scrollB = $(window).scrollTop() + $(window).height();

        if (scrollB > componentT + margin) {
          $component.trigger('launchanimation');
          $component.off('launchanimation');
        }
      };

      /* イベント
      ----------------------------------------------------------*/
      $(window).on('scroll resize', function() {
        update();
      });

      /* 初期処理
      ----------------------------------------------------------*/
      setTimeout(update, 0);

      // 各ターゲットの処理
      $targets.each(function() {
        /* 変数
        ----------------------------------------------------------*/
        var $target = $(this);
        var type = $target.data('animation-type');
        var after = $target.data('animation-after') || null;
        var delay = $target.data('animation-delay') || 0;

        /* 関数
        ----------------------------------------------------------*/
        var animate = function() {
          setTimeout(function() {
            $target.addClass('exec-animation');
          }, delay);
        };

        var init = function() {
          $target.addClass('animation-' + type);

          if (after !== null) {
            if (Array.isArray(after) === false) {
              after = [after];
            }

            var promiseList = [];
            after.forEach(function(e, i, a) {
              var p = new Promise(function(resolve, reject) {
                var $afterTarget = $targets.filter('[data-animation-id=' + e + ']');
                $afterTarget.on('transitionend animationend', function() {
                  resolve();
                });
              });
              promiseList.push(p);
            });

            // afterに設定されたアニメーションが全てresolveされ次第アニメーション起動
            Promise.all(promiseList)
              .then(animate);
          } else {
            /*
            afterが設定されていないものは、componentのlaunchanimationイベントと
            同時にアニメーションを起動する
            */
            $component.on('launchanimation', function() {
              animate();
            });
          }
        };

        /* 初期処理
        ----------------------------------------------------------*/
        init();

      });
    });
  })();
});
