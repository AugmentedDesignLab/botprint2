/**
 * This algorithm uses a very simple binary tree based bin packing
 * algorithm to generate the layout pattern of a deck.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function BinPackerLayoutAlgorithm(data){
	var layout = {};
	var deck   = data.deck;
	var blocks = deck.select();

	var self = {
		perform: function(){
			var binPacker = new BinPacker(deck);
			packer.fit(blocks);
			return self.pack();
		},

		pack: function(){
			deck.select(function(block){
				if(block.fit){
					self.define(
						block.fit.x,
						block.fit.y,
						block.dimensions().w,
						block.dimensions().h
					);
				}
			});

			// return persisted layout.
			return layout;
		},

		define: function(x, y, w, h){
			// todo(Huascar) do the following:
			// 1. define layout
			// 2. persist this layout.
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Algorithm (data));
	return self;
}