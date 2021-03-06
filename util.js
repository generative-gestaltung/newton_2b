var Util = {};

Util.len = function (v) {
  return Math.sqrt (v.x*v.x + v.y*v.y);
}

Util.dist = function (v0, v1) {
  d = {x: (v0.x - v1.x), y: (v0.y - v1.y)};
  return Util.len(d);
}

Util.blend = function (x, y, t) {
	return x*(1-t) + y*t;
}

Util.constrain = function (v, min, max) {
  if (v<min) return min;
  if (v>max) return max;
  return v;
}

Util.rand = function (min, max) {
	return Math.random()*(max-min) + min;
}

Util.randI = function (min, max) {
  return Math.round(Math.random()*(max-min) + min);
}

Util.calcAttraction = function (pos0, pos1, m) {
	var force = {x: (pos0.x - pos1.x), y: (pos0.y - pos1.y)};
  	var dist = Util.len(force);
  	force.x = -force.x / (Math.pow(dist,2)) * m;
  	force.y = -force.y / (Math.pow(dist,2)) * m;

  	return force;
}

Util.angleBetween = function (v0, v1) {
	a = Math.atan2(v1.y, v1.x) - Math.atan2(v0.y, v0.x);
  	if (a < 0) a += (Math.PI*2);
  	return a;
}

// line defined by 2 points l0, l1
Util.distanceLinePoint = function (l0, l1, p) {
	nom = Math.abs((l1.y-l0.y)*p.x - (l1.x-l0.x)*p.y + l1.x*l0.y + l1.y*l0.x);
	den = Math.sqrt(Math.pow((l1.x-l0.x),2)+Math.pow((l1.y-l0.y),2));

	return nom / den;
}

Util.lineBloom = function (r,g,b,width) {
  c.strokeStyle = "rgba("+r+","+g+","+b+",0.1)";
  c.lineWidth = width;
  c.stroke();

  c.strokeStyle = "rgba("+r+","+g+","+b+",0.1)";
  c.lineWidth = width/2;
  c.stroke();

  r += 40;
  g += 40;
  b += 40;
  c.strokeStyle = "rgba("+r+","+g+","+b+",1.0)";
  c.lineWidth = width/12;
  c.stroke();
}

Util.circle = function (x,y,R,r,g,b) {
  c.beginPath();
  c.arc (x,y,R, 0, 2*Math.PI);
  Util.lineBloom (r,g,b,1460);
}

Util.circleNoBloom = function (x,y,R,r,g,b) {
  c.beginPath();
  c.arc (x,y,R, 0, 2*Math.PI);
  c.stroke();
}





