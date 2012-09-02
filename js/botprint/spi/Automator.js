function Automator(sketchable, options){
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


	// collection of points
	var Points = function() {
		var self 	= this;
		var _points = [];

		self.add = function(point) {
			_points.push(point);
		};

		self.point = function(idx){
			return _points[idx];
		};

		self.size = function(){
			return _points.length;
		};

		self.log = function(){
			console.log(_points);
		};

		self.each = function(callback) {
			var len = _points.length;
			for(var i = 0; i < len; i++){
				var p = _points[i];
				callback.call(p, p, i, i === 0, i === len-1);
			}
		};

		self.backEach = function(callback){
			var len = _points.length;
			for(var i = len - 1; i >= 0; i--){
				var p = _points[i];
				callback.call(p, p, i, i === 0, i === len-1);
			}
		};

	};

	options = options || { points: [
	/*TL*/{x:186, y:200},
	/*BL*/{x:186, y:385},
	/*BR*/{x:560, y:385},
	/*TR*/{x:560, y:200}
	]};

	var corners = new Points();
	for(var i = 0; i < options.points.length; i++){
		var each = options.points[i];
		corners.add(Point.make(each.x, each.y));
	}

	var self = {
		play: function(){
			corners.each(function(p, i, isFirst, isLast){
				self.draw(sketchable.sketchingHandler, p, isLast)
			});
			return sketchable;
		},

		draw: function(handler, point, finishSketch){
			var payload = {x: point.x, y:point.y };
			handler.mouseMove(payload);
			if(!finishSketch) {
				handler.click(payload);
			} else {
				handler.click(payload);
				handler.click(payload);
				handler.dblClick({});
			}
		}
	};

	return self;
}