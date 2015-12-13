var Planet = function (pX, pY, vX, vY, r, orbit, speed) {
    this.pos = {x: pX, y:pY};
    this.vel = {x:vX, y:vY};
    this.acc = {x:0,y:0};
    this.R = r;
    this.speed = speed;
    this.orbit = orbit;
    this.table = [];

    ind = Util.randI(0,2);
    this.color = {r:COLORS0[ind].r, g:COLORS0[ind].g, b:COLORS0[ind].b};
    this.phase = Math.random()*Math.PI*2;
    for (i=0; i<TABLE_SIZE; i++) {
      this.table[i] = Math.sin(i*0.02)*PLANET_SIN_A + Math.random()*PLANET_RAND_A;
    }
}

Planet.prototype.isInside = function (point) {
    var v0 = {x:0,y:1};
    var v1 = {x:point.x-this.pos.x*0.01, y:point.y-this.pos.y*0.01}
    d = Math.abs(Util.dist(this.pos, v1));
    
    if (d<this.R*2) {
        angle = Util.angleBetween(v0,v1);
        h = this.getSurface(angle);
        ind = Math.round(angle*TABLE_SIZE * PLANET_NOISE_F *10 / Math.PI / 2)
            //0this.table[ind] += 0.61;
            
        if (d<h) {
            return angle;
        }
    }  
    return -1;
}

 
Planet.prototype.getRound = function (i) {
    return {x:this.pos.x, y:this.pos.y};
    //return {x:Math.sin(i)*this.R+this.pos.x, y:Math.cos(i)*this.R+this.pos.y};
}


Planet.prototype.getSurface = function (i) {

    while (i<0) {
        i+=(Math.PI*2);
    }
    i = i / (Math.PI*2) * TABLE_SIZE * PLANET_NOISE_F;
    i = i%(TABLE_SIZE-1);
    i0 = Math.floor(i);
    i1 = i0+1;
    t = (i-i0) / (i1-i0);

    return Util.blend (this.table[i0], this.table[i1], t) + this.R; // * (1+Math.sin(frameCount*0.1+i*0.1));
}

Planet.prototype.update = function (ind) {

/*
    force = {x:0, y:0};
    for (var i=0; i<N_PLANETS; i++) {
        if (i==ind) continue;
        f = Util.calcAttraction(this.pos, planets[i].pos, 1000);
        force.x += f.x;
        force.y += f.y;
    }
    
    this.vel.x += force.x;
    this.vel.y += force.y;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
*/
    
    lastPos = {x:this.pos.x, y:this.pos.y};
    lastVel = {x:this.vel.x, y:this.vel.y};
    this.pos.x = this.orbit * Math.sin(this.phase);
    this.pos.y = this.orbit * Math.cos(this.phase);
    this.phase += this.speed*0.01;
    this.vel = {x:this.pos.x-lastPos.x, y:this.pos.y-lastPos.y};
    this.acc = {x:this.vel.x-lastVel.x, y:this.vel.y-lastVel.y};
}

Planet.prototype.draw = function (detail) {

    c.beginPath();
    stroke(255,255,255);

    offset = detail/2;
    for (i=0; i<detail; i++) { 
    
      c.save();
      c.translate (0,0);

      r0 = this.getSurface (i / detail * Math.PI*2);

      x0 = r0*Math.sin(i/detail*Math.PI*2) + this.pos.x;
      y0 = r0*Math.cos(i/detail*Math.PI*2) + this.pos.y;
    
      r0 = this.getSurface((i+1) / detail * Math.PI*2);

      
      x1 = r0*Math.sin((i+1)/detail*Math.PI*2) + this.pos.x;
      y1 = r0*Math.cos((i+1)/detail*Math.PI*2) + this.pos.y;
      
      //c.rotate (Math.PI*2*i / detail);
         
      c.lineTo(x1,y1);
      c.restore();
    }
    
    Util.lineBloom (this.color.r,this.color.g,this.color.b,160);
    //c.fill();
}






