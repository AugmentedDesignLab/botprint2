/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
describe("PCG-Algorithms", function(){
	var deck;
	var blocks;
	var dataMaker;

	beforeEach(function(){
		dataMaker   = new DataMaker();
		blocks 		= dataMaker.blocks();
		deck 	    = new Deck({name:"Bottom", bus: dataMaker.bus, dimensions: { w:500, h:500, d:0 }});
	});

	afterEach(function(){
		dataMaker = null;
		blocks    = null;
		deck	  = null;
	});

	describe("Once ready for packing the layout", function(){
		it("should pack a 50 by 50 area (via packer only)", function(){
			var packer = new BinPacker(deck);
			blocks.sort();
			packer.fit(blocks);
			var packed = [];
			for(var n = 0 ; n < blocks.length ; n++) {
				var block = blocks[n];
				if (block.fit) {
					packed.push(block);
				}
			}

			expect(packed.length).toBeGreaterThan(0);
		});

		it("should pack a 50 by 50 area (via algorithm)", function(){
			// todo(Huascar) do next
			expect(true).toBeTruthy();
		});
	});

	describe("Once ready for snapping wheels", function(){
		it("should be TBD", function(){
			expect(true).toBeTruthy();
		});
	});
});