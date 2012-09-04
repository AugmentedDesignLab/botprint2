/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function LayoutHandler(view, options) {
	var radio 		= options.app;
	var bus			= view.bus;

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

	var Corners = function(view, shape){
		// use Raphael.freetransform to get always acurate bounding box's corner points.
		var ft = view.draw.freeTransform(shape);
		var corners = ft.getCorners();
		var result  = new Points();
		for(var i = 0; i < corners.length; i++){
			if(i < 4){
				var each  = corners[i];
				var point = Point.make(each.x, each.y);
				result.add(point);
			}
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
		appEvents: ['chassisShapeUpdated', 'layoutUpdated', 'layoutDeleted'],
		chassisShapeUpdated: function(payload) {
			self.clear();
			var chassisModel	= Chassis(payload);
			var shape			= chassisModel.shape;
			var corners			= Corners(view, shape);
			var rectangle		= new Rectangle(corners);

			InR(rectangle);

			var valid      = self.gimmeValid(chassisModel.vertices, rectangle.inner);

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

			var rendered	= RenderLayout(
				{
					paper: view.draw,
					layout: outline
				}
			);

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

		gimmeValid: function(vertices, rectangle){
			var answer = rectangle;


			// set up
			var checkingPoints = new Points();
			var points = rectangle.points;
			var center = rectangle.center();

			var size   = points.size();

			for(var q = 0; q < 8; q++){
				var cx, cy, j, k;
				if(q < 4) {
					checkingPoints.add(Point.of(points.point(q)));
				} else {
					j  = q % 4;
					k  = ( j + 1 ) % size;
					cx = ( points.point(j).x + points.point(k).x ) / 2;
					cy = ( points.point(j).y + points.point(k).y ) / 2;
					checkingPoints.add(Point.make(cx, cy));
				}
			}

			// validate
			for(var i = 0; i < vertices.length; i++){

				if(checkingPoints.size() > 8) break;

				var each = vertices[i];
				var p = Point.make(each.position.x, each.position.y);

				var separation, distance;
				for(var idx = 0; idx < checkingPoints.size(); idx++){
					var e = checkingPoints.point(idx);
					separation = e.distanceTo(center) + Rectangle.GAP;
					distance   = p.distanceTo(center);
					if(distance < separation){
						console.log("it is invalid, shrink once more.");
						InR(rectangle);
						return rectangle.inner;
					}
				}
			}



			return answer;
		},

		layoutDeleted: function(payload) {
			console.log("Layout Has Been Deleted!")
		}
	};

	Mixable(self).mix(EventHandler(view, options));
	return self;
}