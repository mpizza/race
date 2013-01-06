'use strict';
$(function(){
  var car = {
    text:'car'
  };
  Canvas.init(car);
  var obstacle = {
    text:'hi1'
  };
  Canvas.add_obstacles(obstacle);
  obstacle = {
    text:'hi2'
  }
  Canvas.add_obstacles(obstacle);
  
  var BGimage = new Image();
  BGimage.src = Canvas.bg.src;
  BGimage.onload = function(){
    Canvas.valid = true;
    Canvas.draw();
    Canvas.kill_obstacles(1);
    Canvas.valid = true;
    Canvas.draw();
  };
  
})