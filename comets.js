var Comet = function (pX, pY, vX, vY,m) {
  this.pos = {x:pX, y:pY};
  this.vel = {x:vX, y:vY};
  this.m = m;
}

Comet.prototype.update = function (planet) {

  force = {x: (this.pos.x - planet.pos.x), y: (this.pos.y - planet.pos.y)};
  dist = Util.len(force);
  force.x = -force.x / (Math.pow(dist,2)) * this.m;
  force.y = -force.y / (Math.pow(dist,2)) * this.m;

  this.vel.x += force.x;
  this.vel.y += force.y;
  
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
}

Comet.prototype.draw = function() {
  c.fillRect(this.pos.x, this.pos.y, 50, 50);
}