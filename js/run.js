'use strict';
$(function(){
  Canvas.init();
  
  var BGimage = new Image();
  BGimage.src = Canvas.bg.src;
  BGimage.onload = function(){
    var car_img = new Image(); 
    car_img.src = document.getElementById('car-image').src; 
    car_img.onload = function(){
      Canvas.car = new obstacle(250,600,100,72,0,'car',0,car_img,'#AAAAAA','car');
      Canvas.valid = true;
    };   
  };
  
  $('#console span').on('mousedown',function(){
    Canvas.car.x = carmove(Canvas.car.x, $(this).attr('data-direct'))
    Canvas.valid = true;
  });
  
  var game_stop = setInterval("Canvas.draw()",20);
  
  $('body').keydown(function(evt){
    switch (evt.keyCode) {
      case 37:
        Canvas.car.x = carmove(Canvas.car.x, (-10));
        Canvas.valid = true;
      break;
      case 39:
        Canvas.car.x = carmove(Canvas.car.x, 10);
        Canvas.valid = true;
      break;
    }// end of switch
    
  });// end of keydown
})

function carmove(posx, val){
  var direct =  parseInt(posx) +parseInt( val );
  if (direct<0){
    direct =0;
  }
  if (direct>500){
    direct =500;
  }
  return direct;
  
}