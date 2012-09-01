/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
/**
 * InR(Rectangle, K){
 *     I = Inner(Rectangle, Rectangle.center);
 *     if(K == 1) return I;
 *     else		  return InR(I, K -1);
 * }
 *
 * Inner(Rectangle, Center){
 *     I = Replicate(Rectangle);
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
 *     Rectangle.I = I
 *     return I;
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

		var set = paper.set();
		set.contains = function(obj){
			var result = false;
			for(var i = 0; i < this.items.length; i++){
				var each = this.items[i];
				if(each.attrs.cx == obj.attrs.cx
					&& each.attrs.cy == obj.attrs.cy
					&& each.attrs.r == obj.attrs.r){
					result = true;
					break;
				}
			}

			return result;
		};

		set.pushIfAbsent = function(obj){
			if(!this.contains(obj)){
				this.push(obj);
				return true;
			}

			return false;
		};

		// enriched Raphael.set();
		var eSet = function(rset){
			rset.contains = function(obj){
				var result = false;
				for(var i = 0; i < this.items.length; i++){
					var each = this.items[i];
					if(each.attrs.cx == obj.attrs.cx
						&& each.attrs.cy == obj.attrs.cy
						&& each.attrs.r == obj.attrs.r){
						result = true;
						break;
					}
				}

				return result;
			};

			rset.pushIfAbsent = function(obj){
				if(!this.contains(obj)){
					this.push(obj);
					return true;
				}

				return false;
			};

			return rset;
		};

		var _paper 	  = paper;
		var _blankets = eSet(paper.set());
		var _circles  = eSet(paper.set());

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

		self.paper 		 = function(){ return _paper;   };
		self.circles	 = function(){ return _circles; };
		self.blankets    = function(){ return _blankets;};
		self.play  		 = function(){ self._init();    };
		self.dw			 = _options.dw;
		self.dh			 = _options.dh;
		self.isDrag		 =  -1;
		self.unhighlight = function () {};

		self.update 	 = function(){};


		function sketch(autosketch) {
			var color = Autosketch.randomColor();
			var seed  = controlPoints();
			var outer = new R(Points.translateOnY(seed), color);

			InR(outer);

			draw(outer, color, autosketch, true);

			for(var item = outer.inner; item != null; item = item.inner){
				draw(item, color, autosketch, false);
			}
		}


		function draw(rectangle, color, autosketch, markers) {
			if(markers){
				drawCircle(rectangle.points, color, autosketch);
				drawBlanket(rectangle.points, color, autosketch);
			}

			drawMasterpiece(rectangle, color, autosketch);
		}

		function drawMasterpiece(rectangle, color, autosketch){
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

			rectangle.each(function(p, i, isFirst, isLast){
				pointsPath[isFirst ? "moveTo" : "lineTo"](p.x, p.y);
			});
		}

		function drawBlanket(points, color, autosketch){
			var r = (autosketch.dw - 60) / points.size();
			points.each(function (point, i, isFirst, isLast) {
				if(!isLast){
					var circle = autosketch.paper().circle(point.x, point.y, r);
					circle
						.attr({stroke: "none", fill: color, opacity: 0})
						.mouseover(function () {
							if (autosketch.isDrag + 1) {
								autosketch.unhighlight = function () {};
							} else {
								autosketch.circles().items[i].animate({r: 10}, 200);
							}
						})
						.mouseout(function () {
							if (autosketch.isDrag + 1) {
								autosketch.unhighlight = function () {
									autosketch.circles().items[i].animate({r: 5}, 200);
								};
							} else {
								autosketch.circles().items[i].animate({r: 5}, 200);
							}
						})
						.drag(function (dx, dy) {
							var start = this.start;
							start && autosketch.update(start.i, start.p + dy);
						}, function (x, y) {
							this.start = {i: i, m: y, p:point.y};
						});
					autosketch.circles().pushIfAbsent(circle);

				}
			});

		}

		function drawCircle(points, color, autosketch) {
			points.each(function (point, i, isFirst, isLast) {
				if(!isLast){
					var circle = autosketch.paper().circle(point.x, point.y, 0);
					circle
						.attr({
							'stroke': '#333',
							'stroke-width': 1,
							'stroke-opacity': 0.2,
							'fill': color,
							'opacity': 0
						});

					if(autosketch.circles().pushIfAbsent(circle)){
						setTimeout(function () {
							circle.animate({
								'opacity': 0.5,
								'r': Autosketch.RADIUS
							}, 1200, 'elastic')
						}, i*500);
					}

				}
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

	Autosketch.random 				= function(){
		return parseInt (Math.random () * (1 << 10));
	};
	Autosketch.randomColor			= function(){
		return Autosketch.random ().toString (16).replace (/.*(\w{3})/, '#$1');
	};


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
		return new Point(p.x, p.y);
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
			var test1 = 0, test2 = 0;
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

	Points.union = function(a, b){
		var result  = new Points();
		var closing = new Point();
		a.each(function(p, i, isFirst, isLast){
			if(isFirst) { closing = p; }
			result.add(p);
		});

		b.backEach(function(p){ result.add(p);});

		result.add(closing);

		return result;
	};

	Points.translateOnY = function(seed){
		return Points.translate(seed, 0, Autosketch.Y_SEPARATION);
	};

	Points.translate = function(seed, xsep, ysep){
		xsep = xsep ? xsep : 0;
		ysep = ysep ? ysep : 0;
		var twins = new Points ();
		seed.each(function (p){
			twins.add(new Point(p.x + xsep, p.y + ysep));
		});
		return Points.union(seed, twins);
	};

	var Inner = function(rectangle, center){
		var inner = rectangle.replicate();
		inner.points.log();
		inner.points.each(function(p, i){
			// subtracts the center from each vertex point
			p.x = p.x - center.x;
			p.y = p.y - center.y;

			// scales each vertex point
			p.x = Inner.SCALE * p.x;
			p.y = Inner.SCALE * p.y;

			// shifts back the center
			p.x = p.x + center.x;
			p.y = p.y + center.y;
		});

	    rectangle.inner = inner;
		return inner;
	};

	Inner.SCALE = 0.7;

	/**
	 * InR algorithm, which recursively inscribe an scaled down version of an
	 * outer rectangle.
	 *
	 * @param rectangle outer rectangle.
	 * @param k # of scaled down rectangles to be inscribed.
	 * @return {*} a scaled down rectangle.
	 * @constructor
	 */
	var InR = function(rectangle, k){
		k			= k || 1;
		var center  = rectangle.center;
		if(k == 1) 	{ return Inner(rectangle, center); 				}
		else		{ return InR(Inner(rectangle, center), k - 1); 	}
	};

	// Helper object representing the Rectangle datatype.
	var R = function(points/*union of top&bottom points*/, color){
		var len  = points.size();
		var lo   = 0;
		var hi   = len - 2;
		var mid  = Math.floor(lo + (hi - lo) / 2);
		var self = this;

		self.each 	 		= points.each;

		// bug coordinates for br, bl are all screwed up.

		self.topLeft 		= points.point(lo) 		|| 0;
		self.topRight 		= points.point(mid) 	|| 0;
		self.bottomRight 	= points.point(mid + 1) || 0;
		self.bottomLeft 	= points.point(hi)  	|| 0;
		self.center  		= calculateCenter(self.topLeft, self.bottomRight)  || 0;
		self.color   		= color;
		self.width	 		= self.topLeft.distanceTo(self.topRight);
		self.height	 		= self.topLeft.distanceTo(self.bottomLeft);
		self.points			= points;

		self.replicate = function() {
			var seed = new Points();
			seed.add(Point.of(self.topLeft));
			seed.add(Point.of(self.topRight));
			seed.add(Point.of(self.bottomRight));
			seed.add(Point.of(self.bottomLeft));
			seed.add(Point.of(self.topLeft)); // we need this to close the path.
			return new R(seed, Autosketch.randomColor());

		};

		function calculateCenter(topleft, bottomright) {
			var x = (topleft.x + (bottomright.x - topleft.x)/2);
			var y = (topleft.y - (topleft.y  - bottomright.y)/2);
			return new Point(x, y);
		}
	};

	if(autosketch) autosketch().play();
	else {
		console.log("ERROR ERROR");
	}
}());

