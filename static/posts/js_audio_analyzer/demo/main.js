$(function() {
  var animationId;
  var $svg = $('.m-svg01');
  var $line = $svg.find('.m-svg01__line');
  var $playBtn = $('.m-player01.js-player .m-player01__playBtn');
  var $volume = $('.m-player01.js-volume');

  var audioController = new AudioController();
  audioController.volume(0.25);
  $('.m-player01.js-volume').find('.m-bar01__current').css('width', '25%');

  $playBtn.on('click', function() {
    var audio = audioController.audio();
    var $playIcon = $playBtn.find('.fa');

    if (audio.status === 'play') {
      audioController.pause();
      $playIcon.addClass('fa-play');
      $playIcon.removeClass('fa-pause');
    }
    if (audio.status === 'pause') {
      audioController.play(audio.currentTime);
      $playIcon.addClass('fa-pause');
      $playIcon.removeClass('fa-play');
    }

    return false;
  });

  var render = function() {
    var spectrums = audioController.getSpectrums();
    var waveWidth = 640 / spectrums.length;

    var pointStr = '0,0 ';
    for(var i=0, len=spectrums.length; i<len; i++){
      pointStr += i*waveWidth + ',' + spectrums[i] + ' ';
    }
    pointStr += '640,0';
    $line.attr('points', pointStr);

    var audio = audioController.audio();
    if (audio) {
      var currentTime = audio.currentTime;
      var totalTime = audio.totalTime;
      var currentP = currentTime / totalTime * 100;

      $('.m-player01.js-player .m-bar01__current').css('width', currentP + '%');
    }

    animationId = requestAnimationFrame(render);
  };

  // ファイル選択処理
  (function() {
    var fileReader = new FileReader();
    var $modUpload = $('.m-file-upload01');
    var $main = $modUpload.find('.m-file-upload01__main');
    var $btn = $modUpload.find('.m-file-upload01__btn');
    var $fileName = $modUpload.find('.m-file-upload01__file-name');
    var $input = $modUpload.find('.m-file-upload01__input');


    fileReader.addEventListener('load', function(e) {
      audioController.load(fileReader.result, function() {
        audioController.play();

        animationId = requestAnimationFrame(render);
      });
    });

    $main.add('.m-overlay01').on('click', function() {
      $input.trigger('click');

      return false;
    });

    $input.on('change', function(e) {
      var files = e.target.files;
      if (files.length > 0) {
        $('.m-overlay01').addClass('is-hidden');
        var fileName = files[0].name;
        $fileName.text(fileName);

        fileReader.readAsArrayBuffer(e.target.files[0]);
      }
    });
  })();

  /* m-bar01
   * data属性にonClickが指定されていると、クリック時に指定された関数を実行
   * ex:
   * $('#btn .m-bar01').data('onClick', function(percent) {
   *  // 処理
   * });
  ----------------------------------------------------------*/
  (function() {
    var $components = $('.m-bar01');

    $components.each(function() {
      var $component = $(this);
      var $current = $component.find('.m-bar01__current');

      $component.on('click', function(e) {
        var componentW = $component.outerWidth();
        var clickL = e.offsetX;
        var percent = clickL / componentW;
        $current.css('width', percent * 100 + '%');

        var callback = $component.data('onClick');
        if (callback) {
          callback(percent);
        }
      });
    });
  })();

  /* m-bar01のコールバック指定
  ----------------------------------------------------------*/
  (function() {
    $('.m-player01.js-player .m-bar01').data('onClick', function(percent) {
      var targetTime = audioController.audio().totalTime * percent;
      audioController.seek(targetTime);
    });

    $('.m-player01.js-volume .m-bar01').data('onClick', function(percent) {
      audioController.volume(percent);
    });
  })();

});
