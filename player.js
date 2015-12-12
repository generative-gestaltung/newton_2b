var Player = function (pX, pY) {
    this.pos = {x:pX, y:pY};
	this.speed = 0;
	this.angle = 0;
}

Player.prototype.update = function (planet) {

	this.speed = Util.constrain (this.speed, -PLAYER_MAX_SPEED, PLAYER_MAX_SPEED);
	sp = 1.0 - Math.cos(this.speed / PLAYER_MAX_SPEED*Math.PI);
	sp *= PLAYER_MAX_SPEED * Math.sign(this.speed);

	this.angle = (this.angle + 0.001*sp) % (Math.PI*2);
	
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