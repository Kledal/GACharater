function Board(width, height) {
  this.width = width;
  this.height = height;
  this.board = [];
  this.brain = new Architect.Perceptron( (this.width*this.height), 7, 7);

  this.setup();
}

Board.prototype = {
  setup: function() {
    for(var x = 0; x < this.width; x++) {
      this.board[x] = [];
      for(var y = 0; y < this.height; y++) {
        this.board[x][y] = 0;
      }
    }

    var that = this;
    $(document).on('click', '.field', function() {
      var id = $(this).attr('id');
      var split = id.split('_');
      var c = { x: split[0], y: split[1] };
      that.board[c.x][c.y] = that.board[c.x][c.y] == 0 ? 1 : 0;
      $(this).toggleClass("marked");
      that.update_json();
    });
  },

  response: function() {
    var response = this.brain.activate(_.flatten(this.board));
    var map_to_int = _.map(response, function(num) {
      return num.toFixed(0);
    });
    var converted_string = map_to_int.join('');
    var charCode = parseInt(converted_string, 2);
    return String.fromCharCode(charCode);
  },

  train: function(output) {
    var raw_binary = output.charCodeAt(0).toString(2);
    if (raw_binary.length == 6)
      raw_binary = "0" + raw_binary;

    var b_output = [];
    for(var i = 0;i<raw_binary.length;i++) {
      b_output[i] = parseInt(raw_binary[i]);
    }

    this.brain.activate(_.flatten(this.board));
    this.brain.propagate(0.3, b_output);
  },

  draw: function() {
    this.update_json();
    var str = "";
    for(var y = 0; y < this.height; y++) {
      str += "<tr>";
      for(var x = 0; x < this.width; x++) {
        var marked = this.board[x][y] == 1 ? " marked": "";
        str += "<td class='field" + marked + "' id='" + x + "_" + y + "'>";
        str += "</td>";
      }
      str += "</tr>";
    }
    return str;
  },

  board_from_json: function(json_str) {
    this.board = JSON.parse(json_str);
    $('#board').html();
    $("#board").html(board.draw());
    //A [[0,0,0,1,1,1,1],[0,1,1,1,0,0,0],[1,0,0,1,0,0,0],[0,1,1,1,0,0,0],[0,0,0,1,1,1,1]]
    //B [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,0,1,0,0,1],[1,0,0,1,0,0,1],[0,1,1,0,1,1,0]]
    //C [[0,1,1,1,1,1,0],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[0,0,0,0,0,0,0]]
  },

  update_json: function() {
    $('#board-json').val( JSON.stringify( this.board ) );
  }
};
