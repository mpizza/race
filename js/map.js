'use strict';

var Canvas = {
  get pad() {
    return document.getElementById('pad');
  },
  
  get bg() {
    return document.getElementById('bg-image');
  },
  
  width : null,
  height : null,
  ctx : null,
  obstacles : [], // set obstacles array
  valid : false, // when set to true, the canvas will redraw everything
  car:null,
  
  init :function init(car){
    this.ctx = this.pad.getContext('2d');
    this.width = this.pad.width;
    this.height = this.pad.width;
    console.log(this.width+":"+this.height);
  },
  
  drawbg : function drawbg(){
    this.ctx.drawImage(this.bg, 0, 0);
  },
  
  drawcar : function drawcar(){
    //console.log(this.car.attr_id);
    this.car.draw(this.ctx);
  },
  
  add_obstacles : function add_obstacles(obstacle) {
    this.obstacles.push(obstacle);
    //this.selection = shape;
    this.valid = false;
  },
  
  kill_obstacles : function kill_obstacles(index){
    var l = this.obstacles.length;
    for (var i = 0; i < l; i++) {
      var obstacle = this.obstacles[i];
      if (obstacle.attr_id ==  index){
        this.obstacles.splice(index, 1);
        this.valid = false;
        this.draw();
        break;
      }
    }
  },
  
  draw_obstacles : function draw_obstacles(){
    var l = this.obstacles.length;
    for (var i = 0; i < l; i++) {
      var obstacle = this.obstacles[i];
      console.log(obstacle.attr_id);
      //obstacle.draw(this.ctx);
    }
  },
  
  clear : function clear(){
    this.ctx.clearRect(0, 0, this.width, this.height);
    console.log('clear');
  },
  
  draw: function draw(){
    if(this.valid){
      console.log('redraw');
      this.clear();
      this.drawbg();
      if(this.car!==null){
        this.drawcar();
      }
      this.draw_obstacles();
      this.valid = false; // reset valid
    }// draw it
  },
  
  deviceMotionHandler: function deviceMotionHandler(eventData) {
    // Grab the acceleration including gravity from the results
    var acceleration = eventData.accelerationIncludingGravity;
  
    // Display the raw acceleration data
    var rawAcceleration = "[" +  Math.round(acceleration.x) + ", " + Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";
  
    // Z is the acceleration in the Z axis, and if the device is facing up or down
    var facingUp = -1;
    if (acceleration.z > 0) {
      facingUp = +1;
    }
    
    // Convert the value from acceleration to degrees acceleration.x|y is the 
    // acceleration according to gravity, we'll assume we're on Earth and divide 
    // by 9.81 (earth gravity) to get a percentage value, and then multiply that 
    // by 90 to convert to degrees.                                
    var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
    var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
  
    // Display the acceleration and calculated values
    document.getElementById("moAccel").innerHTML = rawAcceleration;
    document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
    document.getElementById("moCalcTiltFB").innerHTML = tiltFB;
  
    // Apply the 2D rotation and 3D rotation to the image
    //var rotation = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB) + "deg)";
    //document.getElementById("imgLogo").style.webkitTransform = rotation;        
  }
}// end of CanvasState