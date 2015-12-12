var Planet = function (pX, pY, r) {
    this.pos = {x: pX, y:pY};
    this.R = r;
    this.table = [];
    for (i=0; i<TABLE_SIZE; i++) {
      this.table[i] = Math.sin(i*0.02)*PLANET_SIN_A + Math.random()*PLANET_RAND_A;
    }
}


Planet.prototype.getSurface = function (i) {

    i = i / (Math.PI*2) * TABLE_SIZE * PLANET_NOISE_F;
    i = i%(TABLE_SIZE-1);
    i0 = Math.floor(i);
    i1 = i0+1;
    t = (i-i0) / (i1-i0);

    return Util.blend (this.table[i0], this.table[i1], t) + this.R; // * (1+Math.sin(frameCount*0.1+i*0.1));
}


Planet.prototype.draw = function (detail) {

    c.beginPath();
    stroke(255,0,0);

    offset = detail/2;
    for (i=0; i<detail; i++) { 
    
      c.save();
      c.translate (0,0);

      r0 = this.getSurface (i / detail * Math.PI*2);

      x0 = r0*Math.sin(i/detail*Math.PI*2);
      y0 = r0*Math.cos(i/detail*Math.PI*2);
    
      r0 = this.getSurface((i+1) / detail * Math.PI*2);

      
      x1 = r0*Math.sin((i+1)/detail*Math.PI*2);
      y1 = r0*Math.cos((i+1)/detail*Math.PI*2);
      
      //c.rotate (Math.PI*2*i / detail);
      c.moveTo(x0,y0);    
      c.lineTo(x1,y1);
      c.restore();
    }
    c.stroke();
}