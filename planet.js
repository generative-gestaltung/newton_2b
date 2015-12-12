var Planet = function (pX, pY, r) {
    this.pos = {x: pX, y:pY};
    this.R = r;
    this.table = [];
    for (i=0; i<TABLE_SIZE; i++) {
      this.table[i] = Math.sin(i*0.02)*PLANET_SIN_A + Math.random()*PLANET_RAND_A;
    }
}

Planet.prototype.getRound = function (i) {
    return {x:Math.sin(i)*this.R, y:Math.cos(i)*this.R};
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
    
    c.lineWidth = 5;
    c.fillStyle = '#333333';
    c.fill();
    c.strokeStyle = '#ffffff';
    c.stroke();
}

var updatePlanets = function() {
    for (var i=0; i<N_PLANETS; i++) {
        for (var j=0; j<N_PLANETS; j++) {

        }
    }
}






