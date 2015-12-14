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
	
	//closest planet
	this.activePlanet = 0;

	//second closest
	this.runnerUpPlanet = 0;
	
	// distance to active planet center
	this.distanceToCenter = 0;

	// distance to runner up planet
	this.distanceToRunnerUp = 0;
}

Player.prototype.init = function (planet) {
	r0 = planet.getSurface (this.angle);
    
    this.pos.x = (r0*Math.sin (this.angle) + planet.pos.x)+0;
    this.pos.y = (r0*Math.cos (this.angle) + planet.pos.y)-2*planet.R-1000;
}

Player.prototype.calcAngle = function () {
	ex = {x:0, y:1};
	d = {x: this.pos.x - this.planet.pos.x, y: this.pos.y-this.planet.pos.y};
	this.phi = Util.angleBetween(d,ex);
}
Player.prototype.move = function (dir) {

	// calc intersection with planet circle + tangential dir

	//this.calcAngle();

	this.speed += 0.25;
	this.speed = Util.constrain(this.speed,0,PLAYER_MAX_SPEED);
	
/*
	var arg = (this.pos.x-this.planet.pos.x) / this.planet.R;
	arg = Util.constrain(arg,0,1);
	this.phi = Math.acos (arg);
	this.phi = angle;
*/
	var att = Util.calcAttraction (this.pos, this.planet.pos, 500);
	this.vel2.x = -Math.cos (this.phi)*dir*this.speed - att.x;
	this.vel2.y =  Math.sin (this.phi)*dir*this.speed - att.y;
}



Player.prototype.update = function (planets) {

	/*
	this.speed = Util.constrain (this.speed, -PLAYER_MAX_SPEED, PLAYER_MAX_SPEED);
	sp = 1.0 - Math.cos(this.speed / PLAYER_MAX_SPEED*Math.PI);
	sp *= PLAYER_MAX_SPEED * Math.sign(this.speed);


	this.angle = (this.angle + 0.001*sp) % (Math.PI*2);	
    r0 = planet.getSurface (this.angle);


	*/

	//this.init(planet);

	this.calcAngle();

	var dMin = 999999;
	var dMin2 = 999999;
	
	/*
	for (i=0; i<N_PLANETS; i++) {
		var d = Util.dist(this.pos, planets[i].pos);
		if (d<dMin) {
			dMin = d;
			this.activePlanet = i;
		}
		if (d<dMin2 && d>dMin) {
			dMin2 = d;
			this.runnerUpPlanet = i;
		}
	}
	*/
	for (i=0; i<N_PLANETS; i++) {
		if (Util.dist(planets[i].pos, this.pos) < PLANET_HOME_DISTANCE+planets[i].R) {
			this.activePlanet = i;
			break;
		}
	}

	this.planet = planets[this.activePlanet];

	att = Util.calcAttraction (this.pos, this.planet.pos, 5000);
	this.attraction.x += att.x;
	this.attraction.y += att.y;

	this.distanceToCenter = Util.dist (this.pos, this.planet.pos);



	//	console.log (distanceToCenter,this.phi,planet.getSurface(this.phi));
	if (this.distanceToCenter < this.planet.getSurface(this.phi)) {
		this.attraction.x *= 0;
		this.attraction.y *= 0;
	}

	planetAttraction = {x:0,y:0};
	for (i=0; i<N_PLANETS; i++) {
		if (i==this.activePlanet) continue;
		att = Util.calcAttraction(this.pos, planets[i].pos,3000);
		planetAttraction.x += att.x;
		planetAttraction.y += att.y;
	}
	dampSun = 1.0;
	dampOthers = 1.0;
	dampHome = 0.1;

	nextPos = {x:this.pos + this.vel.x, y:this.pos.y+this.vel.y};
	if (Util.dist(nextPos, this.planet.pos)<this.planet.R+500) {
    	dampSun = 0;
    	dampOthers = 0;
    	dampHome = 0;
    }

	sunAttraction = Util.calcAttraction(this.pos, center, 0);
	this.vel.x += this.planet.acc.x 
	            + sunAttraction.x*SUN_INFLUENCE*dampSun 
	            + planetAttraction.x*OTHER_PLANETS_INFLUENCE*dampOthers;

	this.vel.y += this.planet.acc.y 
	           + sunAttraction.y*SUN_INFLUENCE*dampSun 
	           + planetAttraction.y*OTHER_PLANETS_INFLUENCE*dampOthers;
    
    
    
    //console.log ("planet p:", planet.pos.x, planet.pos.y);
    //console.log ("player p:", this.pos.x, this.pos.y);
	//console.log ("force:", f.x, f.y);
			


    this.pos.x += this.vel.x + this.vel2.x*25 + this.attraction.x * HOME_PLANET_INFLUENCE * dampHome;
	this.pos.y += this.vel.y + this.vel2.y*25 + this.attraction.y * HOME_PLANET_INFLUENCE * dampHome;

	this.vel2.x *= 0.9;
	this.vel2.y *= 0.9;

	this.speed *= 0.9;


	if (Util.dist(this.pos, center) < SUN_R || this.distanceToCenter>100000 && started) {
		gameOver = true;
		document.getElementById("info").innerHTML = "game over";
		if (started)
			document.getElementById("info").innerHTML+="\nscore "+score;
	}

	document.getElementById("speed").innerHTML = Math.round(this.speed*10) / 10.0;
	document.getElementById("R").innerHTML = Math.round(this.distanceToCenter*10) / 10.0;

    //this.pos.x = (r0*Math.sin (this.angle) + planet.pos.x);
    //this.pos.y = (r0*Math.cos (this.angle) + planet.pos.y);
}

Player.prototype.draw = function (planets) {

	stroke(255,255,255); 
	c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc (this.pos.x, this.pos.y-5, PLAYER_SIZE, 0, 2*Math.PI);
    c.stroke();
    c.fill();

    c.lineWidth = 50;
    c.beginPath();
    c.moveTo(this.pos.x, this.pos.y);
    c.lineTo(this.planet.pos.x, this.planet.pos.y);
    c.stroke();

    //c.beginPath();
    //c.moveTo(this.pos.x, this.pos.y);
    //c.lineTo(planets[this.runnerUpPlanet].pos.x, planets[this.runnerUpPlanet].pos.y);
    //c.stroke();

}    