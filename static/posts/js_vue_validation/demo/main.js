Vue.component('radio-component', {
  template: '#tpl-radio',
  props: {
    value: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'model',
    event: 'update',
  },
});

Vue.component('check-component', {
  template: '#tpl-check',
  props: {
    model: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    update: function(e) {
      this.$emit('update', e.target.checked);
    },
  },
  model: {
    prop: 'model',
    event: 'update',
  },
});


var vm = new Vue({
  el: '#app',
  data: {
    form: {
      name: '',
      sex: '',
      mail: '',
      agree: false,
    },
  },
  computed: {
    validation: function() {
      var form = this.form;

      return {
        name: form.name.length > 0,
        sex: form.sex.length > 0,
        mail: true,
        agree: form.agree,
      };
    },
    isValid: function() {
      var validation = this.validation;

      return Object
        .keys(validation)
        .every(function(key) {
          return validation[key];
        });
    },
  },
  methods: {
    submit: function() {
      window.alert(JSON.stringify(this.form));
    },
  },
});
