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
  
    kill_obstacles : function kill_obstacles(attr_id){
        var l = this.obstacles.length;
        for (var i = 0; i < l; i++) {
            var obstacle = this.obstacles[i];
            if(attr_id==obstacle.attr_id){
                console.info(i);
                this.obstacles.splice(i, 1);
                Canvas.valid=true;
                break;
            }
        }
    },
  
    draw_obstacles : function draw_obstacles(){
        var l = this.obstacles.length;
        for (var i = 0; i < l; i++) {
            var obstacle = this.obstacles[i];
            console.log(obstacle.attr_id);
            obstacle.draw(this.ctx);
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
            this.draw_obstacles();
            if(this.car!==null){
                this.drawcar();
            }
            this.valid = false; // reset valid
        }// draw it
    }
}// end of CanvasState