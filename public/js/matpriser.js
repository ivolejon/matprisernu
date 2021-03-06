var app = new Vue({

  el: '#app',

  data: {
    dataset: {}
  },

  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      var self = this;
      jQuery.getJSON('http://data.matpriser.nu/latest', {}, function(json, textStatus) {
        self.dataset = json;
        css_class = '.store_' + self.dataset.cheapestStore;
        jQuery(css_class).addClass('billigast');
      });

    }
  }
});
Vue.filter('fixed', function(value, x) {
  if (typeof value == "number" && !isNaN(value)) {
    return value.toFixed(x).replace(".", ",");
  } else {
    return '-';
  }

});