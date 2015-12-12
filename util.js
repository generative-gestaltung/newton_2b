var Util = {};

    Util.dist = function (v0, v1) {
      d = {x: (v0.x - v1.x), y: (v0.y - v1.y)};
      return len(d);
    }

    Util.len = function (v) {
      return Math.sqrt (v.x*v.x + v.y*v.y);
    }

    Util.blend = function (x, y, t) {
    	return x*(1-t) + y*t;
	}
