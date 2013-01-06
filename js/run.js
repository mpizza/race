'use strict';
$(function(){
  var car = {
    attr_id:'car'
  };
  Canvas.init(car);
  var obstacle = {
    attr_id:'hi3'
  };
  Canvas.add_obstacles(obstacle);
  obstacle = {
    attr_id:'hi2'
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