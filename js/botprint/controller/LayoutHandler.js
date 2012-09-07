/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function LayoutHandler(view, options) {
	var radio 		= options.app;
	var bus			= view.bus;

	// Helper object that encapsulates a result
	var Result = function(a, c) {
		return {
			x:a.x,
			y:a.y,
			w:a.w,
			h:a.h,
			cartoon: c
		}
	};

	// Helper Object for caching the layout and its view
	var Cache		= function(deck2D, outline) {
		return {
			deck2D:  deck2D  || {remove: function(){}},
			outline: outline || {delete: function(){}},
			update: function(deck2D, outline) {
				this.deck2D 	= deck2D;
				this.outline	= outline;
			}
		};
	};

	var Vertices = function(path){
		var result  = new Points();
		var len     = path.length;
		for(var i = 0; i < len; i++){
			if(i === len-1) break;
			var element = path[i];
			var plen    = element.length;
			var point = Point.make(element[plen - 2], element[plen - 1]);
			result.addIfAbsent(point);
		}
		return result;
	};

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
			var x = (topleft.x + (bottomright.x - topleft.x)/2);
			var y = (topleft.y - (topleft.y  - bottomright.y)/2);
			return new Point(x, y);
		}
	};

	Rectangle.GAP = 10; // this defines the boundary of a valid layout

	var Inner = function(rectangle, center){
		var inner = rectangle.clone();
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

	Inner.SCALE = 0.6;


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
		var center  = rectangle.center();
		if(k == 1) 	{ return Inner(rectangle, center); 				}
		else		{ return InR(Inner(rectangle, center), k - 1); 	}
	};

	var vop = Cache();

	var self = {
		appEvents: ['partUpdated', 'layoutUpdated', 'layoutDeleted'],
		partUpdated: function(payload) {
			var attr = JSON.parse(payload.part);
			self.clear();
			var chassisModel	= Chassis(attr);
			var corners			= Points.of(chassisModel.corners);
			var rectangle		= new Rectangle(corners);
			var vertices		= Vertices(chassisModel.path);

			InR(rectangle);

			var valid      		= ValidInnerRectangle({vertices:vertices, rect:rectangle.inner});

			var parts       	= MakeParts(
				{
					app: radio,
					bus: bus
				}
			);

			var outline			= PackLayout(
				{
					app: radio,
					bus: bus,
					rect: valid,
					parts: parts,
					name: "Bottom"
				}
			);

			self.generateLayout(view.draw, outline, radio, bus);
		},

		// similar to sketching handler, this handler handles the generation of layout.
		generateLayout: function(paper, outline, radio, bus){
			var svgSet		= paper.set(); // use sets to group independent svgs...
			outline.select().forEach(function(each){
				console.log(each.x + "-" + each.y);
				// get random color
				var color = Raphael.getColor();
				svgSet.push(
					paper.rect(
						each.fit.x, each.fit.y,
						each.fit.w, each.fit.h
					).attr({fill: color, stroke: color})
				);
			});

			var rendered = Result(outline, svgSet);
			// show layout on canvas
			var deck2D 		= Deck2D(rendered, {app: radio, bus:bus});

			// inform interested parties.
			outline.update();
			vop.update(deck2D, outline);
		},

		layoutUpdated: function(payload) {
			console.log("Layout Has Been Updated!")
		},

		clear: function (){
			vop.deck2D.remove();
			vop.outline.delete();
		},

		layoutDeleted: function(payload) {
			console.log("Layout Has Been Deleted!")
		}
	};

	Mixable(self).mix(EventHandler(view, options));
	return self;
}