describe ("The Autosketch algorithm", function () {
	it ("should work as expected", function () {

		var distance = function(a, b){
			return Math.sqrt(Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2));
		};

		var Point = function(x, y){
			var self = this;

			self.x = x || 0;
			self.y = y || 0;
		};

		var Points = function() {
			var self 	= this;
			var _points = [];

			self.add = function(point) {
				_points.push(point);
			};

			self.get = function(idx) {
				return _points[idx];
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

		// Rectangle data type
		var Rectangle = function (x, y, w, h){
			var self 		= this;

			x = x || 0;
			y = y || 0;
			w = w || 0;
			h = h || 0;

			// top left
			var upperleft	= new Point(x, y);         // A.x, A.y
			// bottom left
			var lowerleft   = new Point(x, y + h);     // B.x = A.x, B.y = A.y + h
			// top right
			var upperright  = new Point(x + w, y);     // C.x = A.x + w, C.y = A.y
			// bottom right
			var lowerright  = new Point(x + w, y + h); // D.x = D.x, C.y = D.y + h

			// center of polygon
			var center		= calculateCenter(upperleft, lowerright);

			var topmid		= calculateTopMid(upperleft, upperright);



			var points		= new Points();
			points.add(upperleft);
			points.add(lowerleft);
			points.add(upperright);
			points.add(lowerright);

			// all points
			self.each 	= points.each;
			self.origin = points.get(0);
			self.width 	= w || 0;
			self.height = h || 0;
			self.center = center;
			self.ul     = function(){ return upperleft; };
			self.lr     = function(){ return lowerleft; };
			self.get    = function(idx) { return points.get(idx); };

			self.copy = function () {
				var o = self.origin;
				var w = self.width;
				var h = self.height;
				return new Rectangle(o.x, o.y, w, h);
			};

			function calculateCenter(upperleft, lowerright) {
				var x = (upperleft.x + (lowerright.x - upperleft.x)/2);
				var y = (upperleft.y - (upperleft.y  - lowerright.y)/2);
				return new Point(x, y);
			}

			function calculateTopMid(upperleft, upperright){
				var len = Math.round(distance(upperleft, upperright));
				var x   = upperleft.x + len/2;
				var y   = upperleft.y;
				return new Point(x, y);
			}
		};

		// Helper function object that gets an array containing points to draw a rect in
		// the rect defined by x, y, w, h
		var Inner = function(outer, center) {
			var inner = outer.copy();

			// 2. sSubtract the center from each vertex point xi =xi−x', yi=yi−y'.
			// where x' and y' are x, y of the center of the rectangle
			inner.each(function(p, i, isFirst, isLast){
				p.x = p.x - center.x;
				p.y = p.y - center.y;

				console.log("INFO=> SUbstracted x=" + p.x + " y=" + p.y);
			});

			// 3.Scale each vertex point xi=αxi, yi=αyi.
			// where α is the Scaling factor, which is a user defined value.
			inner.each(function(p, i, isFirst, isLast){
				p.x = Inner.SCALE * p.x;
				p.y = Inner.SCALE * p.y;

				console.log("INFO=> Scaled x=" + p.x + " y=" + p.y);

			});

			// Shift back the center xi=xi+x', yi=yi+y'.
			inner.each(function(p, i, isFirst, isLast){
				p.x = p.x + center.x;
				p.y = p.y + center.y;
				console.log("INFO=> Back To Normal x=" + p.x + " y=" + p.y);

			});


			inner.update = function() {
				var dst1 = Math.round(distance(this.get(0), this.get(1)));
				var dst2 = Math.round(distance(this.get(0), this.get(2)));

				var width  = Math.max(dst1, dst2);
				var height = Math.min(dst1, dst2);
				inner.width  = width;
				inner.height = height;
			};


			inner.update();
			outer.inner = inner;
			return inner;
		};

		Inner.SCALE = 0.7;

		// Recursively get another rectangle inside another rectangle which is scaled-down
		var RecursiveRectangles= function(rectangle, k) {
			// cached center point
			var center = rectangle.center;

			if (k == 1) {
				return Inner(rectangle, center);
			} else {
				return RecursiveRectangles(Inner(rectangle, center), k - 1);
			}
		};


		var outer = new Rectangle(50, 40, 500, 200);

		RecursiveRectangles(outer, 5);

		expect (outer != null).toBe (true);

		var stuff = [];
		for(var item = outer.inner; item != null; item = item.inner){
			stuff.push(
				item
			);
		}

		expect (stuff.length).toBe (5);

	});
});