var Player = function (pX, pY) {
    this.pos = {x:pX, y:pY};
	this.speed = 0;
	this.angle = 0;
}

Player.prototype.update = function (planet) {
	this.angle = (this.angle + 0.01) % (Math.PI*2);
	
    r0 = planet.getSurface (this.angle);
    this.pos.x = r0*Math.sin (this.angle);
    this.pos.y = r0*Math.cos (this.angle);
}

Player.prototype.draw = function (planet) {

	fill(0,0,255);
    stroke(0,0,255); 

    c.beginPath();
    c.arc (this.pos.x, this.pos.y-5, 5, 0, 2*Math.PI);
    c.stroke();
}    