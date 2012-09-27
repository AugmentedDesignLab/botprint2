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
		var parts = MakeParts( { app: radio} ); // todo(Huascar) fix this bus vs radio stuff.
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

	var Translate = function(rectangle){
		var gap      = Rectangle.GAP;
		var upleft   = Rectangle.travel(rectangle, -(gap) - 35,  gap + 50);
		var upright  = Rectangle.travel(rectangle,  gap + 40,  gap + 45);
		var loright  = Rectangle.travel(rectangle,  gap + 50, -(gap) - 20);
		var loleft   = Rectangle.travel(rectangle, -gap - 50, -gap - 20);
		return [rectangle.clone(), upleft, upright, rectangle.clone(), loright, loleft];
	};

	var Outline  = function(allTranslated, rectangle, parts){

		var deckopts = {
			name:"top",
			app: radio,
			coordinates: {x: rectangle.topLeft().x, 	y: rectangle.topLeft().y 		},
			dimensions:  {w: rectangle.width() , 	h: rectangle.height(), d:0 	        },
			polygon: rectangle
		};

		var splitparts = Array.chunkIt(parts, 6);
		// the idea is that len(valid) === len(splitparts)
		var len = Math.max(allTranslated.length, splitparts.length);


		for(var o = 0; o < len; o++){
			var area  = allTranslated[o];
			var ps    = splitparts[o];

			var subject = {
				x: area.topLeft().x,
				y: area.topLeft().y,
				w: area.width(),
				h: area.height()
			};

			var packer = BinPacker(subject);
			packer.fit(ps);
		}

		var deck = Deck(deckopts);
		for(var n = 0 ; n < splitparts.length ; n++) {
			var sparts = splitparts[n];
			for(var m = 0 ; m < sparts.length ; m++) {
				var part = sparts[m];
				if (part.fit) {
					deck.add(part);
				}
			}
		}

		return deck;
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

			var outline = ItemsPlacement(Data(rectangle.inner, vertices, radio, 4));

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