var Cell = function(x, y, i, j, angle, space){
	var self = this;

	var corners = [
		Point.make(x, y), 					// top left
		Point.make(x + space, y), 			// top right
		Point.make(x + space, y + space), 	// bottom right
		Point.make(x, y + space)			// bottom left
	];

	self.x       = x;
	self.y       = y;
	self.angle   = angle;
	self.free  	 = true;
	self.taken   = !self.free;
	self.valid   = false;
	self.corners = Points.of(corners);
	self.i       = i;
	self.j       = j;
	self.w       = space;
	self.h       = space;
	self.center  = CalculateCenter(
		self.corners.point(0), self.corners.point(2)
	);
	self.distanceTo = function(cell){
		if(!cell) return 0;
		return this.corners.point(0).distanceTo(cell.corners.point(0));
	};

	self.distanceFromCenterTo = function(cell){
		if(!cell) return 0;
		return this.center.distanceTo(cell.center);
	};
	self.part    = null;
	self.name    = self.part != null ? self.part.name : "none";

}; Cell.isValid = function(path, cell, N){
	// return true if all the points are inside the chassis.
	var result   = false;
	var isSensor = (cell.j == 0 || cell.j == N - 1);
	var counter = 0;
	cell.corners.each(function(p){
		result = Geometry.isInside(path, p);
		if(result) counter++;
	});

	if(isSensor) { if(counter == 2) result = true; }  else { if(counter == 4) result = true;}


	return result;
};

Cell.copy = function(cell){
	return Cell.tune(cell, 0, 0);
};

Cell.from = function(obj, angle){
	return new Cell(obj.x, obj.y , 0, 0, angle, obj.w);
};

Cell.tune = function(cell, slide, climb){
	var eachCell = new Cell(cell.x + slide, cell.y + climb, cell.i, cell.j, cell.angle, cell.w);
	eachCell.part   = $.extend(true, {}, cell.part);
	eachCell.part.x = cell.x;
	eachCell.part.y = cell.y;
	eachCell.name   = cell.name;
	eachCell.free   = cell.free;
	eachCell.valid  = cell.valid;
	return eachCell;
};

function PointToCenterLine(centerline, c){
	var A = centerline[0];
	var B = centerline[1];
	var normalLength = Math.sqrt(Math.pow(B.x - A.x, 2), Math.pow(B.y - A.y));
	return Math.abs((c.x - A.x) * (B.y - A.y) - (c.y - A.y) * (B.x - A.x)) / normalLength;
}

var ScoringFormula = function(back1, back2, servo, sen1, sen2, cpu, battery, width, height, centerline){
	var illegalWheels  = !back1 || !back2;
	var illegalServo   = !servo && illegalWheels;
	var illegalSensors = !sen1 || !sen2;
	var illegalCore    = (!cpu || !battery) || (illegalWheels || !servo);

	var d1 = illegalWheels  ? 0 : back1.distanceTo(back2)/width;
	var d2 = illegalServo   ? 0 : (servo.distanceFromCenterTo(back1) + servo.distanceFromCenterTo(back2))/height;
	var d3 = illegalSensors ? 0 :sen1.distanceFromCenterTo(sen2)/width;

	var d4 = illegalServo   ? 0 : PointToCenterLine(centerline, Point.make(servo.x, servo.y)) / (width/2);
	this.score = function(){
		return d1 + d2 + d3 + 1 - d4;
	}
};

var Solution = function(){
	var elements = [];
	var score    = 0;

	return {
		add: function(cell){
			elements.push(cell);
		},

		findBy: function(filter){
			filter = filter || function(each){ return true};
			return elements.select(filter);
		},

		findByRowsAndColumns: function(i, j){
			// this method returns null if element not fount
			return this.findBy(function(each){ return (each.i == i && each.j == j);})[0] || null;
		},

		score: function(width, height, centerline){
			if(score == 0){
				var wheels  = this.findBy(function(each){ return each.name == "Wheel";  });
				var servos  = this.findBy(function(each){ return each.name == "Servo"; });
				var sensors = this.findBy(function(each){ return each.name == "Sensor"; });
				var cpu     = this.findBy(function(each){ return each.name == "Microcontroller"; });
				var battery = this.findBy(function(each){ return each.name == "BatteryPack"; });

				var back1   = wheels[0];
				var back2   = wheels[1];
				var servo   = servos[0];
				var sen1    = sensors[0];
				var sen2    = sensors[1];

				score = new ScoringFormula(back1, back2, servo, sen1, sen2,
					cpu[0], battery[0], width, height, centerline).score();
			}

			return score;
		},

		size: function(){
			return elements.length;
		},

		at: function(idx){
			return elements[idx];
		},

		contains: function(i, j, name){
			var result = false;
			var part   = this.findByRowsAndColumns(i, j);

			if(part != null){
				result = part.name == name;
			}

			return result;
		},

		union: function(sol){
			var result 	= Solution();
			var N 		= Math.max(this.size(), sol.size());

			for(var i = 0; i < N; i++){
				var c = this.at(i);
				var o = sol.at(i);
				if(c){
					if(o){
						if(o != c){
							result.add(c);
							result.add(o);
						} else {
							result.add(c);
						}
					} else {
						result.add(c);
					}
				} else {
					result.add(o);
				}
			}
			return result;
		}
	};
}; Solution.merge = function(sols){
	var all = Solution();
	var N   = sols.length;

	for(var i = 0; i < N; i++){
		var each = sols[i];
		all = all.union(each);
	}

	return all;
};

var walk = function(grid, full, t, horizontal, bag, SPACE){
	var taken = null;
	var N     = grid.length;
	var lo    = 0;
	var hi    = N - 1;
	for(var f = 0; f < N; f++){
		var r = lo + Math.floor((hi - lo) / 2);
		while((r > 2 && r < 6)) { r = 1 + Shuffler().uniform(N - 1); }
		var each = horizontal ? grid[t][(t == N - 1) ? r : f] : grid[f][t];
		if(!each.valid) continue;
		if(!each.free)  continue;

		if(taken != null){
			if(taken.distanceFromCenterTo(each) < SPACE) continue;
		}

		var part = bag.pop();
		if(!part) continue;

		each.free = false;
		each.part = part;
		each.name = part.name;
		taken     = each;
		full.add(Cell.copy(taken));
	}
};

var pack = function(elem){
	var result = [];
	result.push(elem);
	return result;
};

var isConsistent = function(i, j, N){
	if (i < 1 || i >= N - 1) return false;    // invalid row
	if (j < 1 || j >= N - 1) return false;    // invalid column
	return true;
};

var Enumerate = {
	all: function(grid, full, leftover, lo, hi){
		var solutions 	= [];
		var N 			= grid.length;
		var part        = null;
		while(lo < N){
			for(var j = 3; j < hi; j++){
				var sol  = Solution();
				var each = grid[lo][j];
				if(!each.valid) continue;

				// place cpu
				part 		 = leftover.cpu;
				each.free = true;
				each.part = part;
				each.name = part.name;
				sol.add(Cell.copy(each));

				var eachBattery = null;
				var eachSol		= null;
				// down
				if(isConsistent(lo + 1, j, hi)){
					eachSol				 = Solution();
					eachBattery 		 = grid[lo + 1][j];
					if(eachBattery.free) {
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachBattery.name     = part.name;
						eachSol.add(Cell.copy(eachBattery));
						solutions.push(Solution.merge([full, sol, eachSol]));
						eachSol				 = null;
					}
				}
				// right
				if(isConsistent(lo, j + 1, hi)){
					eachSol				 = Solution();
					eachBattery 		 = grid[lo][j + 1];
					if(eachBattery.free) {
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachBattery.name = part.name;
						eachSol.add(Cell.copy(eachBattery));

						solutions.push(Solution.merge([full, sol, eachSol]));
						eachSol				 = null;
					}
				}
				// left
				if(isConsistent(lo, j - 1, hi)){
					eachSol				 = Solution();
					eachBattery 		 = grid[lo][j - 1];
					if(eachBattery.free) {
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachBattery.name = part.name;
						eachSol.add(Cell.copy(eachBattery));

						solutions.push(Solution.merge([full, sol, eachSol]));

						eachSol				 = null;
					}
				}
				// up
				if(isConsistent(lo - 1, j, hi)){
					eachSol				 = Solution();
					eachBattery 		 = grid[lo - 1][j];
					if(eachBattery.free) {
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachBattery.name = part.name;
						eachSol.add(Cell.copy(eachBattery));

						solutions.push(Solution.merge([full, sol, eachSol]));

						eachSol				 = null;
					}
				}

			} lo++;
		}

		return $.extend(true, [], solutions);
	}
};

function PackIt(data, solution){
	var opts  = {
		name: 			"TOP",
		app: 			data.app,
		coordinates: 	data.coordinates,
		dimensions: 	data.dimensions,
		polygon: 		data.area
	};

	var deck    = Deck(opts);

	solution.findBy().forEach(function(each){
		deck.add(each);
	});

	var tobeDrawn   = deck.select();
	console.log(tobeDrawn.length <= 0 ? "NOTHING" : "SOMETHING");

	return deck;
}
