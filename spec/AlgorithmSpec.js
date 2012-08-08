/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
describe("A PCG Algorithm", function(){
	var deck;
	var blocks;
	var dataMaker;

	beforeEach(function(){
		dataMaker   = new DataMaker();
		blocks 		= dataMaker.blocks();
		deck 	    = new Deck({name:"Bottom", bus: dataMaker.bus, dimensions: { w:50, h:50, d:0 }});
	});

	afterEach(function(){
		dataMaker = null;
		blocks    = null;
		deck	  = null;
	});

	it("should make its own input.", function(){
		var parts = MakeParts({app: Bindable(), bus: EventBus()});
		expect(parts.length).toBe(25); // Yeah! We have 25 parts to play with!
	});

	it("should easily find its max working area.", function(){
		var points	= [{x:1, y:4}, {x:0, y:3}, {x:0, y:0}, {x:3, y:0}, {x:3, y:3}];
		var max		= FindMaxRectangle({corners: points});

		expect(max.area).toBe(306);
		expect(max.height).toBe(0.02125);
		expect(max.width).toBe(0.0225);
		expect(max.x).toBe(0);
		expect(max.y).toBe(0);
	});

	describe("Once given a 50x50 area", function(){
		it("should generate a layout (via packer only)", function(){
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

		it("should generate a layout (via algorithm)", function(){
			var packer = new GrowingLayout();

		});

	});

	describe("Once given an sketched chassis", function(){
		it("should snap the best fitting wheels", function(){
			expect(true).toBeTruthy();
		});
	});
});