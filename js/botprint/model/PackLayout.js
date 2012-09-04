/**
 * This algorithm uses a very simple binary tree based bin packing
 * algorithm to generate the layout pattern of a deck.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function PackLayout(data/*{app: radio, bus: bus, rect: max, parts: parts}*/){
	var Relax = function(polygon, violations, gap){
		var width = 0, height = 0, x = 0, y = 0;
		if(!violations.BLTL || !violations.BL || !violations.TL){
			if(!violations.BL){
				x 		= polygon.topLeft().x   + gap;
				y 		= polygon.topLeft().y   - gap;
				width  	= polygon.width()  		- gap;
				height	= polygon.height() 		- gap;
			} else {
				x = polygon.topLeft().x + gap;
				y = polygon.topLeft().y + gap;
				width  = polygon.width() - gap;
				height = polygon.height() - gap;
			}
		} else if (!violations.BRBL){
			x 		= polygon.topLeft().x;
			y 		= polygon.topLeft().y  	- gap;
			width  	= polygon.width() 		- gap;
			height 	= polygon.height() 		- gap;
		} else if (!violations.TLTR){
			x 		= polygon.topLeft().x;
			y 		= polygon.topLeft().y  	+ gap;
			width  	= polygon.width() 		- gap;
			height 	= polygon.height() 		- gap;
		} else if(!violations.TRBR || !violations.BR || !violations.TR) {
			if(!violations.BR){
				x 		= polygon.topLeft().x   - gap;
				y 		= polygon.topLeft().y   - gap;
				width  	= polygon.width()  		- gap;
				height	= polygon.height() 		- gap;
			} else {
				x = polygon.topLeft().x   - gap;
				y = polygon.topLeft().y   + gap;
				width  = polygon.width()  - gap;
				height = polygon.height() - gap;
			}
		}

		return {
			x: x || polygon.topLeft().x,
			y: y || polygon.topLeft().y,
			w: width || polygon.width(),
			h: height || polygon.height()
		};
	};

	var self = {
		now: function() {
			var data 	= this.data();
			var polygon = data.rect;
			var parts   = data.parts;
			var name    = data.name;
			var bus     = data.bus;
			var radio   = data.app;

			var violations = data.violations;
			var gap		   = data.gap;
			polygon.points.log();
			var relaxed    = Relax(polygon, violations, gap);

			var options = {
				name:name,
				bus: bus,
				app: radio,
				coordinates: {x: relaxed.x, 	y: relaxed.y 		},
				dimensions:  {w: relaxed.w, 	h: relaxed.h, d:0 	},
				polygon: polygon
			};

			var deck 	= Deck(options);
			var packer  = BinPacker(deck);
			packer.fit(parts);

			for(var n = 0 ; n < parts.length ; n++) {
				var part = parts[n];
				if (part.fit) {
					deck.add(part);
				}
			}

			return deck;
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Algorithm (data));
	return self.now();
}