var Comet = function (pX, pY, vX, vY, m) {
  this.pos = {x:pX, y:pY};
  this.vel = {x:vX, y:vY};
  this.alive = true;
  this.m = m;
}

Comet.prototype.update = function (planets) {

  for (i=0; i<N_PLANETS; i++) {
    force = Util.calcAttraction (this.pos, planets[i].pos, this.m);

    this.vel.x += force.x;
    this.vel.y += force.y;
  }  
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
}

Comet.prototype.draw = function() {
  if (!this.alive)return;
  c.strokeRect(this.pos.x, this.pos.y, this.m, this.m);
}

Comet.prototype.kill = function() {
  this.alive = false;
}