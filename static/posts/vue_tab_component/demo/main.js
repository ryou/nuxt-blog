Vue.component('tab-component', {
  data: function() {
    return {
      currentActive: 0,
    };
  },
  template: '#tpl-tab',
  props: {
    tabs: {
      type: Array,
      default: [],
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    clickTab: function(index) {
      this.currentActive = index;
    },
  },
  mounted: function() {
    this.currentActive = this.active;
  },
});

new Vue({
  data: {
    tabs: [
      'tab01',
      'tab02',
    ],
  },
  el: '#app',
});
