/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
// point data type
var Point = function(x, y){
	var self = this;

	self.x = x || 0;
	self.y = y || 0;

	self.distanceTo = function(q){
		var x = self.x;
		var y = self.y;
		return Math.sqrt(Math.pow(x - q.x, 2) +  Math.pow(y - q.y, 2));
	};
	
	/* Decide if a point is inside a shape
	 * shapePath: an array representing the path, or an SVG path string
	 * point: any object that has x and y attributes
	 */
	self.isInside = function(shapePath) {
		var pathElem = document.createElement('path');
		pathElem.setAttribute('d', shapePath);
		var lineElem = document.createElement('line');
		lineElem.setAttribute('x1', 0);
		lineElem.setAttribute('y1', 0);
		lineElem.setAttribute('x2', this.x);
		lineElem.setAttribute('y2', this.y);
		
		var intersect = Intersection.intersectShapes(new Path(pathElem), new Line(lineElem));
		if(intersect.status == 'Intersection') {
			var xPoints = intersect.points;
			return xPoints.length % 2 == 1;
		} else {
			return false;
		}		

	};
};

/**
 * solves the counterclockwise problem: Given three points a, b, c, is a-b-c a
 * counterclockwise turn? This problem is analogous to comparisons in sorting. The
 * difference is that we are comparing slopes. The practical use of this is to provide a
 * very simple way to determine if two lines intersect.
 * @param a point a
 * @param b point b
 * @param c point c
 */
Point.ccw = function(a, b, c) {
	// determinant gives twice area of triangle
	var area = (b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x);

	// if area < 0, thena-b-c is clockwise
	if      (area < 0) return  -1;
	// if area > 0, then a-b-c is counterclockwise
	else if (area > 0) return   1;
	// if area == 0, then a-b-c are collinear
	else                return  0;
};

Point.of = function(p){
	return Point.make(p.x, p.y);
};

Point.make = function(x, y){
	return new Point(x, y);
};