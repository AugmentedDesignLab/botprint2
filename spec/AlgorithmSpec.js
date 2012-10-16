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
		expect(clusters.length).toBe(7); // Yeah! We have 25 parts to play with!
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

	describe("Once the Opt Grid is found", function(){
		it("First row should be filled with two parts, while last one with one part", function(){
			var full    = Solution();
			var wheels  = TestUtil.wheels();
			var servos  = TestUtil.servos();

			var grid       = TestUtil.grid(10, 0);
			var space      = 2 * TestUtil.space(10);

			for(var flag = 0; flag < 2; flag++){
				// walk rows
				var row = flag == 0 ? 0 : grid.length - 1;
				walk(grid, full, row, true,
					(flag == 0 ? wheels : servos), space);
			}

			var size = full.size();
			expect(size).toBe(3);
		});

		it("First and Last Columns should have one sensor each", function(){
			var full    = Solution();
			var sensors = TestUtil.sensors();

			var grid       = TestUtil.grid(10, 0);
			var space      = 2 * TestUtil.space(10);

			for(var flag = 0; flag < 2; flag++){
				// walk columns
				var col = flag == 0 ? 0 : grid.length - 1;
				walk(grid, full, col, false,
					(flag == 0 ? pack(sensors.pop()) : pack(sensors.pop())), space);
			}

			var size = full.size();
			expect(size).toBe(2);
		});

		it("First & Last Rows and Columns Should be Filled", function(){
			var full    = Solution();
			var sensors = TestUtil.sensors();
			var wheels  = TestUtil.wheels();
			var servos  = TestUtil.servos();

			var grid       = TestUtil.grid(10, 0);
			var space      = 2 * TestUtil.space(10);

			for(var flag = 0; flag < 2; flag++){
				// walk rows
				var row = flag == 0 ? 0 : grid.length - 1;
				walk(grid, full, row, true,
					(flag == 0 ? wheels : servos), space);

				// walk columns
				var col = flag == 0 ? 0 : grid.length - 1;
				walk(grid, full, col, false,
					(flag == 0 ? pack(sensors.pop()) : pack(sensors.pop())), space);
			}

			var size = full.size();
			expect(size).toBe(5);
		});

		it("Point(405, 280) should be inside the chassis", function(){
			var path  = TestUtil.payload().path;
			var state = TestUtil.isInside(path, 405, 280);
			expect(state).toBe(true);
		});

		it("Enumerate all possible placements", function(){
			var full 	  = TestUtil.partialSolution();
			expect(full.size()).toBe(5);

			var leftover  = {cpu:TestUtil.cpu(), battery:TestUtil.battery()};
			var grid	  = TestUtil.grid(10, 0);
			var solutions = HillClimbing({area: TestUtil.gridArea()}).enumerate(
				grid, full, leftover, 1, grid.length - 1
			);
			var size = solutions.length;
			expect(size).toBe(139);
		});

		it("Find the solution with the max utility function score", function(){
			var full 	  = TestUtil.partialSolution();
			var leftover  = {cpu:TestUtil.cpu(), battery:TestUtil.battery()};
			var gridArea  = TestUtil.gridArea();
			var grid	  = TestUtil.grid(10, 0);
			var max       = HillClimbing({area: gridArea}).findMax(
				grid, full, leftover, 1, grid.length
			);
			var size      = max.size();
			var score     = max.score(gridArea.width(), gridArea.height());
			expect(size).toBe(7);
			expect(score).toBe(3.3636678002498415);
		});
	});

	describe("Once given an sketched chassis", function(){
		it("a layout should be generated using backtracking & iter improvement", function(){
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