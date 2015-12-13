var Player = function (pX, pY, planet) {
    this.pos = {x:pX, y:pY};
    this.vel = {x:0, y:0};
    this.vel2 = {x:0, y:0}
    this.attraction = {x:0,y:0};
    this.planet = {};
    this.planet = planet;
	this.speed = 0;
	this.angle = 0;
	this.phi = 0;
}

Player.prototype.init = function (planet) {
	r0 = planet.getSurface (this.angle);
    
    this.pos.x = (r0*Math.sin (this.angle) + planet.pos.x)+1500;
    this.pos.y = (r0*Math.cos (this.angle) + planet.pos.y)-100;
}

Player.prototype.move = function (dir) {

	// calc intersection with planet circle + tangential dir


	var arg = (this.pos.x-this.planet.pos.x) / this.planet.R;
	arg = Util.constrain(arg,0,1);
	this.speed += 0.3;
	this.speed = Util.constrain(this.speed,0,6);
	this.phi = Math.acos (arg);
	var att = Util.calcAttraction (this.pos, this.planet.pos, 500);
	this.vel2.x = -Math.sin (this.phi)*dir*this.speed - att.x;
	this.vel2.y =  Math.cos (this.phi)*dir*this.speed - att.y;
}



Player.prototype.update = function (planet) {

	/*
	this.speed = Util.constrain (this.speed, -PLAYER_MAX_SPEED, PLAYER_MAX_SPEED);
	sp = 1.0 - Math.cos(this.speed / PLAYER_MAX_SPEED*Math.PI);
	sp *= PLAYER_MAX_SPEED * Math.sign(this.speed);


	this.angle = (this.angle + 0.001*sp) % (Math.PI*2);	
    r0 = planet.getSurface (this.angle);


	*/

	//this.init(planet);

	att = Util.calcAttraction (this.pos, planet.pos, 1000);
	this.attraction.x += att.x;
	this.attraction.y += att.y;

	distanceToCenter = Util.dist (this.pos, planet.pos);



	//	console.log (distanceToCenter,this.phi,planet.getSurface(this.phi));
	if (distanceToCenter < planet.getSurface(this.phi)) {
		this.attraction.x *= -0.6;
		this.attraction.y *= -0.6;
	}


	sunAttraction = Util.calcAttraction(this.pos, center, 0);
	this.vel.x += planet.acc.x + sunAttraction.x;
	this.vel.y += planet.acc.y + sunAttraction.y;
    
    
    //console.log ("planet p:", planet.pos.x, planet.pos.y);
    //console.log ("player p:", this.pos.x, this.pos.y);
	//console.log ("force:", f.x, f.y);
			


    this.pos.x += this.vel.x + this.vel2.x*25 + this.attraction.x;
	this.pos.y += this.vel.y + this.vel2.y*25 + this.attraction.y;

	this.vel2.x *= 0.9;
	this.vel2.y *= 0.9;

	this.speed *= 0.5;

    //this.pos.x = (r0*Math.sin (this.angle) + planet.pos.x);
    //this.pos.y = (r0*Math.cos (this.angle) + planet.pos.y);

}

Player.prototype.draw = function (planet) {

	stroke(255,255,255); 
	c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc (this.pos.x, this.pos.y-5, 55, 0, 2*Math.PI);
    c.stroke();
    c.fill();
}    