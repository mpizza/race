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
  
    var game_stop = setInterval("Canvas.draw()",1);
  
    $('body').keydown(function(evt){
        switch (evt.keyCode) {
            case 37:
                Canvas.car.x = carmove(Canvas.car.x, (-11));
                Canvas.car.angle = -10;
                Canvas.valid = true;
                break;
            case 39:
                Canvas.car.x = carmove(Canvas.car.x, 11);
                Canvas.car.angle = 10;
                Canvas.valid = true;
                break;
        }// end of switch
    
    });// end of keydown
    
    $('body').keyup(function(){
        Canvas.car.angle = 0;
        Canvas.valid = true;
    });
    
    console.info("play start");
    play();
    console.info("play end");
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

var cars = new Array();

function play(){
    var sch_screen = createScreen();
    var createCar = createNewCar();
    Canvas.valid = true;
    var run = setInterval(function(){
        for(var i=0; i<cars.length; i++){
            var obj = cars[i];
            obj.y++;
            Canvas.valid=true;
            
            if(obj.label=="car"){
                var car = Canvas.car;
                if(car.y-obj.y>0 && car.y-obj.y<70 && Math.abs(car.x-obj.x)<100){
                    $('body').unbind("keydown");
                    $('body').unbind("keyup");
                    clearInterval(run);
                    clearInterval(createCar);
                    clearInterval(sch_screen);
                }
            }
        }
        
        for(var i=0; i<cars.length; i++){
            var obj = cars[i];
            if(obj.y>=800){
                console.info("kill 600 "+i);
                Canvas.kill_obstacles(obj.attr_id);
            }
        }
        
    }, 1);
}

function createScreen(){
    var seq = 0;
    var createScreen = setInterval(function(){
        var x = 285;
        var line_img = new Image(); 
        line_img.src = document.getElementById('line-image').src; 
        line_img.onload = function(){
            seq++;
            var carid = "line"+seq;
            var line = new obstacle(x,-200,100,72,0,carid,0,line_img,'#AAAAAA',carid);            
            cars.push(line);
            Canvas.add_obstacles(line);
            Canvas.valid = true;
            Canvas.draw();
            console.info("other car end");
            
        };  
    }, 1200);
    
    return createScreen;
}

function createNewCar(){
    
    var seq = 0;
    var createCar = setInterval(function(){
        var x = random(0, 500);
        var other_car_img = new Image(); 
        other_car_img.src = document.getElementById('car-image').src; 
        other_car_img.onload = function(){
            console.info("other car start");
            seq++;
            var carid = "car"+seq;
            var car = new obstacle(x,0,100,72,0,"car",0,other_car_img,'#AAAAAA',carid);            
            cars.push(car);
            Canvas.add_obstacles(car);
            Canvas.valid = true;
            Canvas.draw();
            console.info("other car end");
            
        };  
    }, 1500);
    
    return createCar;
}

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min); 
}