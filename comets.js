var Comet = function (pX, pY, vX, vY, m, alive) {
  this.pos = {x:pX, y:pY};
  this.vel = {x:vX, y:vY};
  this.alive = true;
  this.alive = alive;
  this.m = m;
}

Comet.prototype.update = function (planets) {

  for (i=0; i<N_PLANETS; i++) {
    force = Util.calcAttraction (this.pos, planets[i].pos, this.m);

    this.vel.x += force.x;
    this.vel.y += force.y;
  }  

  sunForce = Util.calcAttraction(this.pos, center, 5000);

  this.vel.x += sunForce.x;
  this.vel.y += sunForce.y;
  
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
}

Comet.prototype.draw = function() {
  if (!this.alive)return;
  //c.strokeRect(this.pos.x, this.pos.y, this.m, this.m);
  c.beginPath();
  c.arc (this.pos.x, this.pos.y-5, this.m, 0, 2*Math.PI);
  c.stroke();
}

Comet.prototype.kill = function() {
  this.alive = false;
}