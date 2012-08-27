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
			for(var i = 0; i < Autosketch.MIN_LINE_COUNT - 1; i++){
				(function(idx){
					setTimeout(function(){
						sketch(self);
					}, 500 * idx);
				}(i));

				moveCirclesToFront(self);
			}

			drawMask(self); // gives the illusion of the the Rect being smoothly drawn
		};

		self.paper 		= function(){ return _paper;   };
		self.circles	= function(){ return _circles; };
		self.play  		= function(){ self._init();    };
		self.dw			= _options.dw;
		self.dh			= _options.dh;



		function sketch(autosketch) {
			var color = Autosketch.randomColor();
			var outer  = new Rectangle(
				controlPoints(),
				color
			);

			draw(outer, color, autosketch);

			Rectangle.scaledDown(outer);

			for(var item = outer.inner; item != null; item = item.inner){
				draw(item, color, autosketch);
			}
		}



		function draw(rectangle, color, autosketch) {
			if(!rectangle.fit) {
				drawCircle(rectangle.top, color, autosketch);
				drawCircle(rectangle.bottom, color, autosketch);
				drawRectangle(rectangle.top, rectangle.bottom, color, autosketch);
			} else {
				var tops  = new Points();
				tops.add(rectangle.topLeft);
				tops.add(rectangle.topRight);
				var botts = new Points();
				botts.add(rectangle.bottomLeft);
				botts.add(rectangle.bottomRight);
				drawRectangle(tops, botts, color, autosketch);
			}
		}

		function drawRectangle(points, twins, color, autosketch) {
			var pointsPath = autosketch.paper().path();
			pointsPath.attr ({
				'stroke':color,
				'fill':"none",
				'opacity':0.1,
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

		function controlPoints(){
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

	Autosketch.PADDING 		  		= 200;
	Autosketch.MIN_LINE_COUNT 	  	= 2; //4
	Autosketch.POINT_LEN      		= 5;
	Autosketch.RADIUS		  		= 4;
	Autosketch.MARGIN_LEFT    		= 300;
	Autosketch.X_SEPARATION   		= 100;
	Autosketch.Y_SEPARATION   		= 200;
	Autosketch.random 				= function(){return parseInt (Math.random () * (1 << 10))};
	Autosketch.randomColor			= function(){return Autosketch.random ().toString (16).replace (/.*(\w{3})/, '#$1');};


	var Point = function(x, y){
		var self = this;

		self.x = x || 0;
		self.y = y || 0;

		self.distanceTo = function(q){
			var x = self.x;
			var y = self.y;
			return Math.sqrt(x * q.x + y * q.y) || 0;
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

	var Rectangle  = function(points, color) {
		var top 	= points || new Points();
		var bottom	= makeBottomPoints(top);

		var self = this;

		self.topLeft 		= top.head();
		self.bottomLeft 	= bottom.head();
		self.topRight		= top.tail();
		self.bottomRight 	= bottom.tail();
		self.width			= self.topLeft.distanceTo(self.topRight);
		self.height			= self.topLeft.distanceTo(self.bottomLeft);
		self.center			= calculateCenter(self.topLeft, self.bottomRight);
		self.color			= color;
		self.top			= top;
		self.bottom			= bottom;
		self.markers		= function(){
			var markers = new Points();
			markers.add(self.topLeft);
			markers.add(self.topRight);
			markers.add(self.bottomLeft);
			markers.add(self.bottomRight);

			return markers;
		};


		self.replicate		= function(){ return new Rectangle(top, color);};

		function calculateCenter(topleft, bottomright) {
			var x = (topleft.x + (bottomright.x - topleft.x)/2);
			var y = (topleft.y - (topleft.y  - bottomright.y)/2);
			return new Point(x, y);
		}

		function makeBottomPoints(points) {
			var twins = new Points ();
			points.each(function (p, i){
				twins.add(new Point(p.x, p.y + Autosketch.Y_SEPARATION));
			});
			return twins;
		}


	};

	Rectangle.scaledDown = function(rectangle, k) {
		k = k || 0;
		if(k == 0) {
			return Rectangle.shrink(
				rectangle,
				rectangle.center
			);
		} else {
			return Rectangle.scaledDown(
				Rectangle.shrink(
					rectangle,
					rectangle.center),
				k - 1);
		}
	};

	Rectangle.shrink = function(outer, center){
		var inner = outer.replicate();
		// subtracts the center from each vertex point xi =xi−x', yi=yi−y'.
		inner.markers().each(function(p, i){
			p.x = p.x - center.x;
			p.y = p.y - center.y;
		});


		// scales each vertex point xi=alpha*xi, yi=alpha*yi.
		inner.markers().each(function(p, i){
			p.x = Rectangle.SCALE * p.x;
			p.y = Rectangle.SCALE * p.y;
		});

		// shifts back the center xi=xi+x', yi=yi+y'.
		inner.markers().each(function(p, i){
			p.x = p.x + center.x;
			p.y = p.y + center.y;
		});

		inner.fit 	= true;
		outer.inner = inner;
		return inner;
	};

	Rectangle.SCALE = 0.7;

	if(autosketch) autosketch().play();
	else {
		console.log("ERROR ERROR");
	}
}());

