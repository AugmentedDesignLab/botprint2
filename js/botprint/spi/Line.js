/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
// a, b are Point objects
var Line  = function(a, b){
	var self = this;
	self.p1 = a;
	self.p2 = b;

	/**
	 * The idea is to check if the endpoints of one line segment are on
	 * different "sides"  of the other line segment.
	 *
	 * @param q second line segment.
	 */
	self.intersectWith = function(q) {
		var test1, test2 = 0;
		test1 = Point.ccw(self.p1, self.p2, q.p1) * Point.ccw(self.p1, self.p2, q.p2);
		test2 = Point.ccw(q.p1, q.p2, self.p1) * Point.ccw(q.p1, q.p2, self.p2);
		return (test1 <= 0) && (test2 <= 0);
	};

};