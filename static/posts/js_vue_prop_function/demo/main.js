Vue.component('route-component', {
  data: function() {
    return {};
  },
  template: '#tpl-route',
  props: {
    remove: {
      type: Function,
      default: null,
    },
    route: {
      type: Object,
      default: {
        start: '',
        end: '',
        cost: '',
      },
    },
  },
  watch: {
  },
  methods: {
    onClose: function() {
      if (this.remove !== null) this.remove(this.route);
    },
  },
});


var vm = new Vue({
  el: '#app',
  data: {
    routes: [],
  },
  methods: {
    addRoute: function() {
      var route = {
        start: '',
        end: '',
        cost: '',
      };
      this.routes.push(route);
    },
    removeRoute: function(route) {
      this.routes = this.routes.filter(function(e) {
        return e !== route;
      });
    },
    submit: function() {
      window.alert(JSON.stringify(this.routes));
    },
  },
  created: function() {
    this.addRoute();
  },
});
