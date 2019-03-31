/*
 * AudioController
 *
----------------------------------------------------------*/
var AudioController = (function() {

  /***********************************************************************
  コンストラクタ
  **********************************************************************/
  var AudioController = function() {
    this._context = new AudioContext();
    this._analyzer = this._context.createAnalyser();
    this._gainNode = this._context.createGain();
    this._musicBuffer = null;
    this._source = null;

    /* ステータス
     * blank: 音声読み込み前
     * pause: 停止中
     * play : 再生中
    ----------------------------------------------------------*/
    this._status = 'blank';

    /* _statusが'play'の時のみ使用
     * 音声の開始UnixTimeを秒で保存
     * ex: 音声がx秒目から開始された場合、「音声開始UnixTime - x」が保存される。
    ----------------------------------------------------------*/
    this._startTime = null;

    /* _statusが'pause'の時のみ使用
     * 音声の現在再生時間を保存
     * ex: 音声のx秒目で停止したなら、xが保存される。
    ----------------------------------------------------------*/
    this._currentTime = null;

    this._gainNode.connect(this._context.destination);
    this._gainNode.connect(this._analyzer);
  };


  /***********************************************************************
  メソッド
  **********************************************************************/
  var proto = AudioController.prototype;

  /* 音声データの再生準備
   * buffer: デコード済音声データ
  ----------------------------------------------------------*/
  proto._setup = function(buffer) {
    this.stop();
　
    this._source = this._context.createBufferSource();

    this._source.buffer = buffer;
    this._source.connect(this._gainNode);
    this._status = 'pause';
    this._currentTime = 0;
  };

  /* デコード前音声データの読み込み
   * buffer: デコード前音声データ
   * callback: 読み込み完了時に実行されるコールバック
  ----------------------------------------------------------*/
  proto.load = function(buffer, callback) {
    var self = this;

    self.stop();

    self._context.decodeAudioData(buffer, function(decodedBuffer) {
      self._musicBuffer = decodedBuffer;
      self._setup(decodedBuffer);

      callback();
    });
  };

  /* 音声を再生する
   * time: 音声の再生開始位置（秒）
  ----------------------------------------------------------*/
  proto.play = function(time) {
    if (this._source) {
      if (typeof time === 'undefined') {
        time = 0;
      }

      this._startTime = Date.now()/1000 - time;
      this._source.start(0, time);

      this._status = 'play';
    }
  };

  /* 音声を一時停止する
  ----------------------------------------------------------*/
  proto.pause = function() {
    this.stop();
    this._setup(this._musicBuffer);
    this._currentTime = Date.now()/1000 - this._startTime;
  };

  /* 音声を停止する
   * NOTE: 作成中。この関数の必要性はある？
  ----------------------------------------------------------*/
  proto.stop = function() {
    if (this._source && this._status === 'play') {
      this._source.stop();
      this._source = null;
      this._status = 'blank';
      this._currentTime = 0;
    }
  };

  /* 音声の再生位置の変更
   * time: この秒数に再生位置を変更
  ----------------------------------------------------------*/
  proto.seek = function(time) {
    this._currentTime = time;

    if (this._status === 'play') {
      this._setup(this._musicBuffer);
      this.play(time);
    }
  };

  /* 音声のボリュームの取得/変更
   * volumeが指定されていない場合、音声のボリュームを返却
   * volume: 0~1.0でボリュームを指定
  ----------------------------------------------------------*/
  proto.volume = function(volume) {
    if (typeof volume === 'undefined') {
      return this._gainNode.gain.value;
    }

    this._gainNode.gain.value = volume;
  };

  /* 音声の情報を返却
   * 情報取得に失敗した際はnullを返却
   * 以下返却情報
   * currentTime: 音声の現在再生位置（秒）
   * totalTime: 音声の総秒数
   * status: 現在ステータス
  ----------------------------------------------------------*/
  proto.audio = function() {
    var self = this;

    if (self._source === null) {
      return null;
    }

    var audio = {
      currentTime: (function() {
        if (self._status === 'play') {
          if (self._startTime === null) {
            return null;
          }

          return Date.now()/1000 - self._startTime;
        } else if (self._status === 'pause') {
          return self._currentTime;
        }
      })(),
      totalTime: self._source.buffer.duration,
      status: self._status
    };

    return audio;
  };

  /* 音声の周波数情報を配列で返却
  ----------------------------------------------------------*/
  proto.getSpectrums = function() {
    var spectrums = new Uint8Array(this._analyzer.frequencyBinCount);
    this._analyzer.getByteFrequencyData(spectrums);

    return spectrums;
  };

  return AudioController;
})();
