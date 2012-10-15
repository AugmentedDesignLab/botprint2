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

		it("a layout should be generated using HillClimbing", function(){
			var max             = 6;
			var radio           = Bindable();
			var chassisString 	= JSON.stringify({"id":1350324371746,"name":"Chassis","path":[["M",424,145],["C",410.8333333333333,144.66666666666666,433.8333333333333,248.83333333333334,405,270],["C",376.1666666666667,291.1666666666667,258.1666666666667,257.5,251,272],["C",243.83333333333334,286.5,352.6666666666667,316.1666666666667,362,357],["C",371.3333333333333,397.8333333333333,294.8333333333333,506.5,307,517],["C",319.1666666666667,527.5,395.8333333333333,422.5,435,420],["C",474.1666666666667,417.5,528.5,513.5,542,502],["C",555.5,490.5,506.5,389.1666666666667,516,351],["C",525.5,312.8333333333333,604.3333333333334,286.1666666666667,599,273],["C",593.6666666666666,259.8333333333333,513.1666666666666,293.3333333333333,484,272],["C",454.8333333333333,250.66666666666666,437.1666666666667,145.33333333333334,424,145],["Z"]],"transform":[],"corners":[{"x":250.66128125776356,"y":144.99920178952277},{"x":599.258571991077,"y":144.99920178952277},{"x":599.258571991077,"y":517.7378255181301},{"x":250.66128125776356,"y":517.7378255181301}]});
			var attr 			= JSON.parse(chassisString);
			var chassisModel	= Chassis(attr);
			var corners			= Points.of(chassisModel.corners);
			var rectangle       = new Rectangle(corners);
			var space	        = Math.floor(rectangle.topLeft().distanceTo(rectangle.topRight())/max);

            var optarea         =  {angle: 0, area: rectangle, path: attr.path};

			var parts 	= MakeParts({app: radio});
			var wheels   = parts.select(function(each){ return each.name == "Wheel";  });
			var sensors  = parts.select(function(each){ return each.name == "Sensor"; });
			var servos   = parts.select(function(each){ return each.name == "Servo"; });
			var cpu      = parts.select(function(each){ return each.name == "Microcontroller"; });
			var battery  = parts.select(function(each){ return each.name == "BatteryPack"; });

			var payload  = {
				max: max, space: space, wheels: wheels, sensors: sensors, servos: servos,
				cpu: cpu[0], battery: battery[0], angle: optarea.angle, area: optarea.area,
				path: optarea.path
			};

			var solution = HillClimbing(payload);
			expect(solution != null).toBe(true);
			expect(solution.size()).toBe(7);  // 7 parts
			expect(solution.score()).toBe(1);

		});

		// failing test
		it("this cell should be inside the chassis", function(){
			var chassisString 	= JSON.stringify({"id":1350324371746,"name":"Chassis","path":[["M",424,145],["C",410.8333333333333,144.66666666666666,433.8333333333333,248.83333333333334,405,270],["C",376.1666666666667,291.1666666666667,258.1666666666667,257.5,251,272],["C",243.83333333333334,286.5,352.6666666666667,316.1666666666667,362,357],["C",371.3333333333333,397.8333333333333,294.8333333333333,506.5,307,517],["C",319.1666666666667,527.5,395.8333333333333,422.5,435,420],["C",474.1666666666667,417.5,528.5,513.5,542,502],["C",555.5,490.5,506.5,389.1666666666667,516,351],["C",525.5,312.8333333333333,604.3333333333334,286.1666666666667,599,273],["C",593.6666666666666,259.8333333333333,513.1666666666666,293.3333333333333,484,272],["C",454.8333333333333,250.66666666666666,437.1666666666667,145.33333333333334,424,145],["Z"]],"transform":[],"corners":[{"x":250.66128125776356,"y":144.99920178952277},{"x":599.258571991077,"y":144.99920178952277},{"x":599.258571991077,"y":517.7378255181301},{"x":250.66128125776356,"y":517.7378255181301}]});
			var attr 			= JSON.parse(chassisString);
			var chassisModel	= Chassis(attr);
			var corners			= Points.of(chassisModel.corners);
			var rectangle       = new Rectangle(corners);
			var grid            = Grid.of(2, rectangle, attr.path, 6, 0);

			expect(grid[3][2].valid).toBe(true);
			expect(grid[3][3].valid).toBe(true);
			expect(grid[4][2].valid).toBe(true);
			expect(grid[4][3].valid).toBe(true);

		});
	});

});