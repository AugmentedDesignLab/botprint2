/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function LayoutHandler(view, options) {
	var radio 		= options.app;

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

	var Data	  = function(innerRectangle, vertices, radio, N){
		var parts = MakeParts( { app: radio} );
		N = N || 5;
		return {
			n:N,
			d:Math.ceil(Math.max (innerRectangle.width (), innerRectangle.height ()) / N),
			polygon:innerRectangle,
			clusters:parts,
			app:radio,
			coordinates:{x:innerRectangle.topLeft ().x, y:innerRectangle.topLeft ().y  },
			dimensions:{w:innerRectangle.width (), h:innerRectangle.height (), d:0}
		};
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

			InR({rect:rectangle});

			var data    = Data(rectangle.inner, vertices, radio, 4);
			var outline = ItemsPlacement(data);

			self.generateLayout(view.draw, outline);
		},

		// similar to sketching handler, this handler handles the generation of layout.
		generateLayout: function(paper, outline){
			var radio       = outline.radio;
			var svgSet		= paper.set(); // use sets to group independent svgs...

			outline.select().forEach(function(each){
				console.log(each.x + "-" + each.y);
				// get random color
				var color = Raphael.getColor();
				svgSet.push(
					paper.rect(
						each.x, each.y,
						each.w, each.h
					).attr({fill: color, stroke: color})
				);
			});

			var rendered = Result(outline, svgSet);
			// show layout on canvas
			var deck2D 		= Deck2D(rendered, {app: radio});

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