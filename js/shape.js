'use strict';

function Shape(x, y, w, h, angle, label, rotate, image, fill, attr_id) {
  // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  // But we aren't checking anything else! We could put "Lalala" for the value of x 
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  this.fill = fill || '#AAAAAA';
  this.label = label || 'noname';
  this.rotate = rotate || false;
  this.angle = angle || 0;
  this.img = image;
  this.attr_id = attr_id;
}

// Draws this shape to a given context
Shape.prototype.draw = function(ctx) {
  var locx = this.x;
  var locy = this.y;
  var locw = this.w;
  var loch = this.h;
  var angle = this.angle;
  var rotate =this.rotate;
  var imgsrc= this.src;
  var img = this.img; 
  ctx.save(); 
  ctx.translate(locx+locw/2, locy+loch/2);
  ctx.rotate(angle * TO_RADIANS);
  ctx.drawImage(img, -(locw/2), -(loch/2));
  ctx.restore(); 
}

// Determine if a point is inside the shape's bounds
Shape.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
}