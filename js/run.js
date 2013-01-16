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
    if (direct<100){
        direct =100;
    }
    if (direct>400){
        direct =400;
    }
    return direct;
}

var objs = new Array();

function play(){
    var line_img = new Image(); 
    line_img.src = document.getElementById('line-image').src; 
    
    var tree_img = new Image(); 
    tree_img.src = document.getElementById('tree-image').src; 
    
    var other_car_img = new Image(); 
    other_car_img.src = document.getElementById('car-image').src; 
    
    var sch_screen = null;
    line_img.onload = function(){
        tree_img.onload = function(){
            sch_screen = createScreen(line_img, tree_img);
        }
    }
    
    var createCar = null;
    other_car_img.onload = function(){
        createCar = createNewCar(other_car_img);
    }
    
    Canvas.valid = true;
    var run = setInterval(function(){
        for(var i=0; i<objs.length; i++){
            var obj = objs[i];
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
                    if(window.navigator.vibrate(0)){
                      window.navigator.vibrate([500,100,500]);
                      window.navigator.vibrate(0);
                      document.getElementById("carpos").innerHTML = 'game over!!!';
                    }
                }
            }
            else {
                obj.y++;
            }
        }
        
        for(var i=0; i<objs.length; i++){
            var obj = objs[i];
            if(obj.y>=800){
                console.info("kill 600 "+i);
                Canvas.kill_obstacles(obj.attr_id);
                objs.splice(i, 1);
                i--;
            }
        }
        
    }, 1);
}

function createScreen(line_img, tree_img){
    
    
    var createScreen = setInterval(function(){
        var x = 285;
        
        var line_seq = 0;
        line_seq++;
        var id = "line"+line_seq;
        var line = new obstacle(x,-200,100,72,0,"line",0,line_img,'#AAAAAA',id);            
        objs.push(line);
        Canvas.add_obstacles(line);
        console.info("other car end");
            
        var tree_seq = 0;
        tree_seq++;
        id = "tree"+tree_seq;
        var tree = new obstacle(0,-200,100,72,0,"tree",0,tree_img,'#AAAAAA',id);
        objs.push(tree);
        Canvas.add_obstacles(tree);
        tree = new obstacle(500,-200,100,72,0,"tree",0,tree_img,'#AAAAAA',id);
        objs.push(tree);
        Canvas.add_obstacles(tree);
       
        Canvas.valid = true;
        Canvas.draw();
    }, 1200);
    
    return createScreen;
}

function createNewCar(other_car_img){
    
    var seq = 0;
    var createCar = setInterval(function(){
        var x = random(100, 400);
        if(x>185&&x<215){
            if(x>300){
                x+=65;
            }
            else {
                x-=65;
            }
        }
        
        console.info("other car start");
        seq++;
        var carid = "car"+seq;
        var car = new obstacle(x,-100,100,72,0,"car",0,other_car_img,'#AAAAAA',carid);            
        objs.push(car);
        Canvas.add_obstacles(car);
        Canvas.valid = true;
        Canvas.draw();
        console.info("other car end");
            
    }, 2000);
    
    return createCar;
}

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min); 
}