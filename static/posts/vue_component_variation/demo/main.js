var BtnComponent = {
  template: '#tpl-btn',
  props: {
    color: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rootClass: function() {
      var classObj = {
        '-disabled': this.disabled,
      };

      if (this.color) classObj[`-${this.color}`] = true;

      return classObj;
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'btn-component': BtnComponent,
  },
});
