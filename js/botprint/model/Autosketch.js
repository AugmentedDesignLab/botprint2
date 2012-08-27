/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
/**
 * RecursiveRectangle(Rectangle, K){
 *     ScaledRect = ScaleDown(Rectangle, Rectangle.center);
 *     if(K == 1) return ScaledRect;
 *     else		  return RecursiveRectangle(ScaledRect, K -1);
 * }
 *
 * ScaleDown(Rectangle, Center){
 *     points = EMPTY U Rectangle.Points;
 *     N	  = points.length;
 *     for(i<-0 until N){
 *         points{i}.x -= Center.x;
 *         points{i}.y -= Center.y;
 *
 *         points{i}.x = points{i}.x * alpha;
 *         points{i}.y = points{i}.y * alpha;
 *
 *         points{i}.x += Center.x;
 *         points{i}.y += Center.y;
 *     }
 *
 *     Rectangle.update(points);
 *     return Rectangle;
 * }
 */
(function () {

	var autosketch = function(paper, options) {
		return new Autosketch(paper, options);
	};

	autosketch.VERSION = "0.0.1";

	var Autosketch = function(paper, options){
		var self  = this;

		var d = $(document);
		var _options = {
			dw:d.width(),
			dh:d.height()
		};

		$.extend(_options, options);

		paper = paper || Raphael(0, 0, _options.dw, _options.dh);

		var _paper 	 = paper;
		var _circles = paper.set();

		self._init = function(){
			for(var i = 0; i < Autosketch.CURVE_COUNT - 1; i++){
				(function(idx){
					setTimeout(function(){
						drawRandomOuterAndInnerRectangles(self);
					}, 500 * idx);
				}(i));

				moveCirclesToFront(self);
			}

			drawMask(self);
		};

		self.paper 		= function(){ return _paper;   };
		self.circles	= function(){ return _circles; };
		self.play  		= function(){ self._init();    };
		self.dw			= _options.dw;
		self.dh			= _options.dh;


		function drawRandomOuterAndInnerRectangles(autosketch) {
			var points = createTransformationPoints(); //createRandomPoints();
			var twins  = createTwinPoints(points);
			var color  = createRandomColor();

			pickExperiment("gradient", points, twins, color, autosketch);
		}

		function createTwinPoints(points) {
			var twins = new Points ();
			points.each(function (p, i){
				twins.add(new Point(p.x, p.y + Autosketch.Y_SEPARATION));
			});
			return twins;
		}


		function pickExperiment(name, points, twins, color, autosketch) {
			if(name == "gradient") {

				//drawCurve(points,  color, autosketch);
				drawCircle(points, color, autosketch);
				drawCircle(twins, color, autosketch);
				drawRectangle(points, twins, color, autosketch);
			}
		}

		function drawRectangle(points, twins, color, autosketch) {
			var pointsPath = autosketch.paper().path();
			pointsPath.attr ({
				'stroke':color,
				'fill':"none",
				'opacity':0.3,
				"stroke-width": 3
			})
				.toBack()
				.animate ({
				'opacity':0.6,
				'stroke-opacity': 1.0
			}, 3000);


			// 1. iterate over the the top line
			points.each(function(p, i, isFirst, isLast){
				pointsPath[isFirst ? "moveTo" : "lineTo"](p.x, p.y);
			});

			// 2. do the right side
			var right = new Points();

			right.add(points.tail());
			right.add(twins.tail());

			right.each(function(p, i, isFirst, isLast){
				pointsPath[isFirst ? "moveTo" : "vlineTo"](p.x, p.y);
			});

			// 3. try going in reverse
			twins.backEach(function(p, i, isFirst, isLast){
				pointsPath[isLast ? "moveTo" : "lineTo"](p.x, p.y);
			});

			var left = new Points();
			left.add(twins.head());
			left.add(points.head());

			left.each(function(p, i, isFirst, isLast){
				pointsPath[isFirst ? "moveTo" : "vlineTo"](p.x, p.y);
			});
		}

		// deprecated
		function drawCurve(points, color, autosketch) {
			var pathstr = [];

			points.each(function(p, i, isFirst, isLast){
				if(isFirst){
					// isLast is not use ok.
					console.log(isLast);
					pathstr.push('M', p.x, p.upY(i), 'R');
				} else {
					pathstr.push(p.x, p.upY(i));
				}
			});

			points.backEach(function(p, i, isFirst, isLast){
				if(isLast) {
					pathstr.push('L', p.x, p.downY(i), 'R');
				} else {
					pathstr.push(p.x, p.downY(i));
				}
			});

			autosketch.paper().path (pathstr)
				.attr ({
					'stroke':'none',
					'fill':color,
					'opacity':0
				})
				.toBack ()
				.animate ({
					'opacity':0.5
				}, 3000);

		}

		function drawCircle(points, color, autosketch) {
			points.each(function (point, i) {
				var circle = autosketch.paper().circle(point.x, point.y, 0);
				circle
					.attr({
						'stroke': '#333',
						'stroke-width': 1,
						'stroke-opacity': 0.2,
						'fill': color,
						'opacity': 0
					})
					.hover(function () {
						this.attr({ 'r': 20 });
					}, function () {
						this.attr({ 'r': 3 });
					}, circle, circle);

				autosketch.circles().push(circle);

				setTimeout(function () {
					circle.animate({
						'opacity': 0.5,
						'r': Autosketch.RADIUS
					}, 1200, 'elastic')
				}, i*500);
			});
		}

		function createTransformationPoints(){
			var w 		= _options.dw - Autosketch.PADDING;
			var h 		= _options.dh - Autosketch.PADDING;
			var points 	= new Points ();


			var origin  = new Point(
				parseInt(w / Autosketch.POINT_LEN),
				10 % h + Autosketch.PADDING/2
			);

			points.add(origin);


			var current  = origin;

			for (var i = 0; i < Autosketch.POINT_LEN; i++) {
				var x = current.x + Autosketch.X_SEPARATION;
				var y = current.y;

				var each = new Point(x, y);
				current = each;

				points.add(each);
			}

			return points;
		}

		// deprecated
		function createRandomPoints () {
			var w 		= _options.dw - Autosketch.PADDING;
			var h 		= _options.dh - Autosketch.PADDING;
			var points 	= new Points ();



			for (var i = 0; i <= Autosketch.POINT_LEN; i++) {
				var x = parseInt(w / Autosketch.POINT_LEN) * i + Autosketch.PADDING/2;
				var y = random() % h + Autosketch.PADDING/2;

				console.log("x=" + x + ", y=" + y);
				points.add(new Point(x, y));
			}

			return points;
		}


		function random () {
			return parseInt (Math.random () * (1 << 10));
		}

		function createRandomColor () {
			return random ().toString (16).replace (/.*(\w{3})/, '#$1');
		}


		function moveCirclesToFront(autosketch) {
			autosketch.circles().toFront();
		}


		function drawMask(autosketch) {
			autosketch.paper()
				.rect(
					-Autosketch.MARGIN_LEFT,
					0,
					autosketch.dw + Autosketch.MARGIN_LEFT,
					autosketch.dh
				).attr({
					'stroke': 'none',
					'fill': '180-#fff:80-#fff',
					'opacity': 0
				}).animate({
					'transform': 'T' + (autosketch.dw - Autosketch.MARGIN_LEFT) + ',0'
				}, 8000, 'ease-in');
		}

	};

	Autosketch.PADDING 		  = 200;
	Autosketch.CURVE_COUNT 	  = 2; //4
	Autosketch.POINT_LEN      = 5;
	Autosketch.RADIUS		  = 4;
	Autosketch.MARGIN_LEFT    = 300;
	Autosketch.X_SEPARATION   = 100;
	Autosketch.Y_SEPARATION   = 200;

	Autosketch.nudge = function(p){
		return [p[0] + Autosketch.randomItem(-2,2), p[1] + Autosketch.randomItem(-2, 2)];
	};

	Autosketch.randomItem = function(a, b){
		// 'Returns an integer between a and b, inclusive';
		// 'If b is not specified, returns an integer between 0 and a';
		if (b === undefined){
			b = a;
			a = 0;
		}
		return Math.floor(Math.random() * (b-a + 1)) + a;
	};

	Autosketch.line = function(path, a, b){
		var x1 = a.x;
		var y1 = a.y;
		var x2 = b.x;
		var y2 = b.y;

		var dx = (x2 - x1) / 3;
		var dy = (y2 - y1) / 3;

		var splitline = [[x1,y1],[x1,y1],[x1+dx,y1+dy],[x1+dx*2,y1+dy*2],[x2,y2],[x2,y2]];
		var overlines = Autosketch.choice([1,1,1,1,1,1,1,2,2,2,3]);

		for (var i = 0; i < overlines; i++){
			path.curve(splitline.map(Autosketch.nudge));
		}
	};

	Autosketch.choice = function(list){
		// This is an exclusive, or mutating choice that
		// picks a random item from a list and removes that
		// item before returning it
		var idx = Autosketch.randomItem(0, list.length - 1);
		var item = list[idx];
		list.splice(idx, 1); // remove item from list
		return item;
	};



	var Point = function(x, y){
		var self = this;

		self.x = x || 0;
		self.y = y || 0;

		self.upY = function(idx) {
			return self.y - (idx * Point.DIFF_RATIO);
		};

		self.downY = function(idx) {
			return self.y + (idx * Point.DIFF_RATIO);
		};

		self.rightX = function(idx) {
			return self.x + (idx * Point.DIFF_RATIO);
		};

		self.leftX = function(idx) {
			return self.x - (idx * Point.DIFF_RATIO);
		};

		self.distanceTo = function(q){
			var x = self.x;
			var y = self.y;
			return Math.sqrt(x * q.x + y * q.y) || 0;
		};
	};

	Point.DIFF_RATIO = 10;

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

	Point.collinear = function(a, b, c) {
		return Point.ccw(a, b, c) == 0;
	};

	Point.counterclockwise = function(a, b, c){
		return Point.ccw(a, b, c) == 1;
	};

	Point.clockwise = function(a, b, c){
		return Point.ccw(a, b, c) == -1;
	};



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


	var Points = function() {
		var self 	= this;
		var _points = [];

		self.add = function(point) {
			_points.push(point);
		};

		self.head = function(){
			return _points[0];
		};

		self.tail = function(){
			return _points[_points.length - 1];
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

	if(autosketch) autosketch().play();
	else {
		console.log("ERROR ERROR");
	}
}());

