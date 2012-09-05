/**
 * This algorithm uses a very simple binary tree based bin packing
 * algorithm to generate the layout pattern of a deck.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function PackLayout(data/*{app: radio, bus: bus, rect: max, parts: parts}*/){
	var self = {
		now: function() {
			var data 	= this.data();
			var polygon = data.rect;
			var parts   = data.parts;
			var name    = data.name;
			var bus     = data.bus;
			var radio   = data.app;

			var options = {
				name:name,
				bus: bus,
				app: radio,
				coordinates: {x: polygon.topLeft().x, 	y: polygon.topLeft().y 		},
				dimensions:  {w: polygon.width() , 	h: polygon.height(), d:0 	},
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