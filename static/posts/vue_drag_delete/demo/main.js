Vue.component('task-component', {
  template: '#tpl-task',
  data() {
    return {
      point: {
        old: {
          x: 0,
          y: 0,
        },
        current: {
          x: 0,
          y: 0,
        },
      },
      deleteBtnStatus: 'stop',
      deleteBtnWidth: 0,
      deleteBtnMaxWidth: 100,
      moveCounter: 0,
    };
  },
  computed: {
    deleteBtnStyleObj() {
      const styleObj = {};

      styleObj.width = `${this.deleteBtnWidth}px`;
      styleObj['max-width'] = `${this.deleteBtnMaxWidth}px`;
      if (this.deleteBtnStatus !== 'move') {
        styleObj.transition = 'width .2s';
      }

      return styleObj;
    },
    moveDifference() {
      return {
        x: this.point.current.x - this.point.old.x,
        y: this.point.current.y - this.point.old.y,
      };
    },
    isMoveVertical() {
      let rad = Math.atan2(this.moveDifference.y, this.moveDifference.x);
      rad = Math.abs(rad);

      if (rad > Math.PI * 0.25 && rad < Math.PI * 0.75) {
        return true;
      }

      return false;
    },
  },
  methods: {
    touchStart(e) {
      const touch = e.touches[0];
      this.point.old.x = this.point.current.x = touch.screenX;
      this.point.old.y = this.point.current.y = touch.screenY;

      this.deleteBtnStatus = 'move';

      this.moveCounter = 0;
    },
    touchMove(e) {
      if (this.deleteBtnStatus !== 'move') return;
      const touch = e.touches[0];

      this.point.old.x = this.point.current.x;
      this.point.old.y = this.point.current.y;

      this.point.current.x = touch.screenX;
      this.point.current.y = touch.screenY;

      if (this.moveCounter === 0 && this.isMoveVertical) {
        this.deleteBtnStatus = 'stop';
        return;
      }

      this.moveCounter++;

      this.deleteBtnWidth -= this.moveDifference.x;

      e.preventDefault();
    },
    touchEnd() {
      this.deleteBtnStatus = 'stop';
      if (this.deleteBtnWidth > this.deleteBtnMaxWidth / 2) {
        this.deleteBtnWidth = this.deleteBtnMaxWidth;
      } else {
        this.deleteBtnWidth = 0;
      }
    },
  },
});


new Vue({
  el: '#app',
  data: {
    todos: [
      '予定1',
      '予定2',
      '予定3',
      '予定4',
      '予定5',
      '予定6',
      '予定7',
      '予定8',
      '予定9',
      '予定10',
      '予定11',
    ],
  },
});
