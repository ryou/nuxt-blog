
Vue.component('btn-component', {
  data: function() {
    return {};
  },
  template: '#tpl-btn',
});

Vue.component('check-component', {
  data: function() {
    return {};
  },
  props: ['value'],
  methods: {
    updateValue: function(value) {
      this.$emit('input', value);
    },
  },
  template: '#tpl-check',
});

new Vue({
  el: '#app',
  data: {
    isAgree: false
  },
});
