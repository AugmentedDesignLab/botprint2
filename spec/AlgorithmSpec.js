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
		var clusters = MakeParts({app: Bindable(), bus: EventBus()});
		expect(clusters.length).toBe(5); // Yeah! We have 25 parts to play with!
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

		it("a layout should be generated", function(){
			var D = 2;
			var N = 5;

			var micro = Microcontroller({name:"MICRO"});
			var pack  = BatteryPack({name:"PACK"});
			var ONE   = [micro, pack];

			var w1  = Wheel();
			var w2  = Wheel();
			var TWO = [w1, w2];

			var servo = Motor({name: "Servo"});
			var w3    = Wheel();
			var THREE = [servo, w3];

			var s1    = Sensor();
			var s2    = Sensor();
			var FOUR  = [s1, s2];

			var s3    = Sensor();
			var FIVE  = [s3];

			var clusters = [ONE, TWO, THREE, FOUR, FIVE];
			var points   = new Points();
			points.add(Point.make(1, 2));
			points.add(Point.make(2, 2));
			points.add(Point.make(2, 4));
			points.add(Point.make(1, 4));
			var rect     = new Rectangle(points);
			var data     = {d: D, n: N, clusters: clusters, polygon: rect};

			var opt      = ItemsPlacement(data);
			expect(opt != null).toBe(true);

		});
	});
});