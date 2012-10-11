/**
 * Rectangle data type.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
var Rectangle = function(points){
	var len  = points.size();
	var lo   = 0;
	var hi   = len - 1;
	var mid  = lo + Math.floor((hi - lo) / 2);

	var self = this;

	self.topLeft 		= function(){
		return self.points.point(lo);
	};

	self.topRight 		= function(){
		return self.points.point(mid);
	};

	self.bottomRight 	= function(){
		return self.points.point(mid + 1);
	};

	self.bottomLeft 	= function(){
		return self.points.point(hi);
	};

	self.center  		= function(){
		return calculateCenter(self.topLeft(), self.bottomRight());
	};

	self.width	 		= function(){
		return self.topLeft().distanceTo(self.topRight());
	};

	self.height	 		= function(){
		return self.topLeft().distanceTo(self.bottomLeft());
	};

	self.area			= function(){
		return self.width * self.height;
	};

	self.each			= points.each;
	self.points			= points;

	self.clone       	= function(){
		var seed = new Points();
		seed.add(Point.of(self.topLeft()));
		seed.add(Point.of(self.topRight()));
		seed.add(Point.of(self.bottomRight()));
		seed.add(Point.of(self.bottomLeft()));
		return new Rectangle(seed);
	};

	function calculateCenter(topleft, bottomright) {
		return CalculateCenter(topleft, bottomright, Rectangle.GAP);
	}
};

Rectangle.travel = function(rectangle, onX, onY){
	var t = rectangle.clone();
	t.points.each(function(p, i){
		p.x = p.x + onX;
		p.y = p.y + onY;
	});

	return t;
};

Rectangle.make = function(points){
	return new Rectangle(points);
};

Rectangle.of   = function(x, y, size){
	var rectsize = size/2;
	var points   = new Points();
	var tl		 = Point.of(x, y);
	var tr       = Point.of(x + rectsize, y);
	var br       = Point.of(x + rectsize, y + rectsize);
	var bl       = Point.of(x, y + rectsize);
	points.add(tl);
	points.add(tr);
	points.add(br);
	points.add(bl);
	return Rectangle.make(points);
};

Rectangle.GAP = 10; // this defines the boundary of a valid layout