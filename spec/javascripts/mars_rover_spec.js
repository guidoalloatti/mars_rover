// include and app/assets/javascripts/application.js
describe('mars_rover', function() {
  it("execute rover moves for test case 1", function() {    
    var plateau_limits = "5 5";
    var starting_coordinates = "1 2 N";
    var movement_sequence = "LMLMLMLMM";
    var rover_result = mars_rover.executeMoves(plateau_limits, starting_coordinates, movement_sequence);
    expect(rover_result.x).toEqual(1);
    expect(rover_result.y).toEqual(3);
    expect(rover_result.d).toEqual("N");
  });
  it("execute rover moves for test case 2", function() {    
    var plateau_limits = "5 5";
    var starting_coordinates = "3 3 E";
    var movement_sequence = "MMRMMRMRRM";
    var rover_result = mars_rover.executeMoves(plateau_limits, starting_coordinates, movement_sequence);
    expect(rover_result.x).toEqual(5);
    expect(rover_result.y).toEqual(1);
    expect(rover_result.d).toEqual("E");
  });
});