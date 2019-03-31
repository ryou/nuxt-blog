Vue.component('clock-component', {
  data: function() {
    return {
      timer: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  template: '#tpl-clock',
  methods: {
    updateTime: function() {
      const now = new Date();
      this.hours = now.getHours();
      this.minutes = now.getMinutes();
      this.seconds = now.getSeconds();
    },
  },
  mounted: function() {
    const loop = () => {
      this.updateTime();

      this.timer = requestAnimationFrame(loop);
    };
    loop();
  },
  destroyed: function() {
    cancelAnimationFrame(this.timer);
  },
});

Vue.component('btn-component', {
  template: '#tpl-btn',
});

Vue.component('app-component', {
  template: '#tpl-app',
});

new Vue({
  el: '#app',
  data: {
    timer: false,
    lists: [
      'list01',
      'list02',
    ],
  },
  methods: {
  },
});
