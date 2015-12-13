var Comet = function (pX, pY, vX, vY, m, alive) {
  this.pos = {x:pX, y:pY};
  this.vel = {x:vX, y:vY};
  this.points = [];
  this.nPoints = Util.randI(3,COMET_N_POINTS);
  for (var i=0; i<this.nPoints; i++) {
    var phase = i*Math.PI*2/this.nPoints;
    this.points[i] = {x:m*Math.sin(phase)+Math.random()*m, y:m*Math.cos(phase)+Math.random()*m};
  }
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
  c.save();
  c.translate(this.pos.x, this.pos.y);
  c.rotate(this.pos.x*0.001+this.pos.y*0.0007);
  c.beginPath();
  c.moveTo(this.points[0].x, this.points[0].y);
  for (var i=0; i<this.nPoints; i++) {
    c.lineTo(this.points[i].x, this.points[i].y);
  }
  c.closePath();
  //c.arc (this.pos.x, this.pos.y-5, this.m, 0, 2*Math.PI);
  
  Util.lineBloom(255,255,255,160);  
  
  c.restore();
}

Comet.prototype.kill = function() {
  this.alive = false;
}