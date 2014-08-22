// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var mars_rover = {
  moveRover: function() {
    var plateau_limits       = $("#plateau_limits").val();
    var starting_coordinates = $("#starting_coordinates").val();
    var movement_sequence    = $("#movement_sequence").val();
    mars_rover.executeMoves(plateau_limits, starting_coordinates, movement_sequence);
  },
  executeMoves: function(plateau_limits, starting_coordinates, movement_sequence) {
    var current_move = "start";
    var cardinal_points = ['N', 'E', 'S', 'W'];
    var max_x = parseInt(plateau_limits.split(" ")[0]);
    var max_y = parseInt(plateau_limits.split(" ")[1]);
    var x = parseInt(starting_coordinates.split(" ")[0]);
    var y = parseInt(starting_coordinates.split(" ")[1]);
    var starting_direction = starting_coordinates.split(" ")[2];
    var current_compass_id = cardinal_points.indexOf(starting_direction);
    var current_direction = cardinal_points[current_compass_id%4];
    
    mars_rover.printCoordinates(x, y, current_direction, current_move, true, false);

    $.each(movement_sequence.split(""), function(){
      if(current_compass_id < 0) current_compass_id += 4;
      current_direction = cardinal_points[current_compass_id%4];
      current_move = this;
      move_result = mars_rover.doMove(current_move, current_direction, x, y, max_x, max_y, current_compass_id);
      current_compass_id = move_result.current_compass_id;
      current_direction = move_result.current_direction;
      x = move_result.x;
      y = move_result.y;
      mars_rover.printCoordinates(x, y, current_direction, current_move, false, false);
    })
    
    mars_rover.printCoordinates(x, y, current_direction, current_move, false, true);
    final_coordinates = {"x": x, "y": y, "d": current_direction};
    return final_coordinates;
  },
  printCoordinates: function(x, y, current_direction, current_move, is_start, is_end) {
    if(is_start) {
      $("#rover_moves").html("<br>============================<br/>")
      $("#rover_moves").html($("#rover_moves").html()+"Starting new rover! Coordinates: " + x + " " + y + " " + current_direction +"<br/>")
    } else if(is_end) {
      $("#rover_moves").html($("#rover_moves").html()+"Final rover coordinates!<br/>");
      $("#rover_moves").html($("#rover_moves").html()+"----------------------------<br/>");
      $("#rover_moves").html($("#rover_moves").html()+"Coordinates: " + x + " " + y + " " + current_direction + "<br/>");
      $("#rover_moves").html($("#rover_moves").html()+"============================<br/>");
    } else {
      $("#rover_moves").html($("#rover_moves").html()+"This Move: " + current_move + " - Coordinates: " + x + " " + y + " " + current_direction + "<br/>");
    }
  },
  doMove: function(current_move, current_direction, x, y, max_x, max_y, current_compass_id) {
    if(current_move == "M") {
      switch(current_direction) {
        case "N":
          if(y < max_y) y++;
          break;
        case "S":
          if(y > 0) y--;
          break;
        case "W":
          if(x > 0) x--;
          break;
        case "E":
          if(x < max_x) x++;
          break;
      }
    } 
    else if(current_move == "L") current_compass_id--;
    else if(current_move == "R") current_compass_id++;
  
    return {"current_move": current_move, 
            "current_direction": current_direction, 
            "x": x, 
            "y": y, 
            "current_compass_id": current_compass_id}
  }
}




