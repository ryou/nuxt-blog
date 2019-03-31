Vue.component('tool-tip-component', {
  data: function() {
    return {
      isActive: false,
      contentPosition: {
        top: 0,
        left: 0,
      },
    };
  },
  template: '#tpl-tool-tip',
  methods: {
    activate: function(event) {
      const target = event.target;
      const rect = target.getBoundingClientRect();
      this.contentPosition.top = rect.top - 10;
      this.contentPosition.left = rect.left + rect.width/2;

      this.isActive = true;
    },
    deactivate: function() {
      this.isActive = false;
    }
  },
  computed: {
    contentStyleObj: function() {
      return {
        top: `${this.contentPosition.top}px`,
        left: `${this.contentPosition.left}px`,
      };
    },
  },
  mounted: function() {
    const app = document.getElementById('app');
    app.appendChild(this.$refs.content);
  },
});

new Vue({
  el: '#app'
});
