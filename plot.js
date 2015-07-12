function Plot() {
  this.data = [];
  this.data_length = 0;
  this.plot;
}

Plot.prototype = {
  setup: function(placeholder) {
    this.ctx = $(placeholder).get(0).getContext("2d");
    var options = { animation: false, showTooltips: true };
    this.plot = new Chart(this.ctx).Line({
      labels: [],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: []
          },
      ]
    }, options);
  },
  update: function() {
    for(var i = this.data_length; i<this.data.length; i++) {
      this.plot.addData([ this.data[i] ], i);
    }
    this.data_length = this.data.length;
  },
  start_auto: function() {
    var that = this;
    this.interval = setInterval(this.update.bind(that), 100);
  },
  stop_auto: function() {
    clearInterval(this.interval);
  },
  add_data: function(y) {
    // this.data = this.data.slice(1);
    this.data.push(y);
    // if (this.data_length > 130) {
    //   this.plot.removeData();
    // }
  },
};
