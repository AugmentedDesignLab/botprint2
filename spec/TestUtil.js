var TestUtil = {
	// TODO (Huascar): rename this to indicate that these test data is only used for AlgorithmSpec. Change the data structure to allow adding more chassis
	payload: function(){
		return {id:1350324371746,
			name:"Chassis",
			path:[["M",424,145],
				["C",410.8333333333333,144.66666666666666,433.8333333333333,248.83333333333334,405,270],
				["C",376.1666666666667,291.1666666666667,258.1666666666667,257.5,251,272],
				["C",243.83333333333334,286.5,352.6666666666667,316.1666666666667,362,357],
				["C",371.3333333333333,397.8333333333333,294.8333333333333,506.5,307,517],
				["C",319.1666666666667,527.5,395.8333333333333,422.5,435,420],
				["C",474.1666666666667,417.5,528.5,513.5,542,502],
				["C",555.5,490.5,506.5,389.1666666666667,516,351],
				["C",525.5,312.8333333333333,604.3333333333334,286.1666666666667,599,273],
				["C",593.6666666666666,259.8333333333333,513.1666666666666,293.3333333333333,484,272],
				["C",454.8333333333333,250.66666666666666,437.1666666666667,145.33333333333334,424,145],
				["Z"]],
			transform:[],
			corners:[
				{x:250.66128125776356,y:144.99920178952277},
				{x:599.258571991077,y:144.99920178952277},
				{x:599.258571991077,y:517.7378255181301},
				{x:250.66128125776356,y:517.7378255181301}
			]
		};
	},

	chassisModel: function(){
		return Chassis(this.payload());
	},

	corners: function(){
		return Points.of(this.payload().corners);
	},

	gridArea: function(){
		var rect = new Rectangle(this.corners());
		InR({rect: rect});
		return rect.inner;
	},

	robotParts: function(){
		var radio = Bindable();
		return MakeParts({app: radio});
	},

	wheels: function(){
		return this.robotParts().select(function(each){ return each.name == "Wheel";  });
	},

	sensors: function(){
		return this.robotParts().select(function(each){ return each.name == "Sensor"; });
	},

	servos: function(){
		return this.robotParts().select(function(each){ return each.name == "Servo"; });
	},

	cpu: function(){
		return this.robotParts().select(function(each){ return each.name == "Microcontroller"; })[0];
	},

	battery: function(){
		return this.robotParts().select(function(each){ return each.name == "BatteryPack"; })[0];
	},

	space: function(max){
		var rectangle = this.gridArea();
		return Math.floor(rectangle.topLeft().distanceTo(rectangle.topRight())/max);
	},

	grid: function(max, angle){
		return Grid.of(2, this.gridArea(), this.payload().path, max, angle);
	},

	partialSolution: function(){
		var full    = Solution();
		var sensors = this.sensors();
		var wheels  = this.wheels();
		var servos  = this.servos();

		var grid       = this.grid(10, 0);
		var space      = 2 * this.space(10);

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

		return full;
	},

	isInside: function(path, x, y){
		return Geometry.isInside(path, Point.make(x, y));
	}
};