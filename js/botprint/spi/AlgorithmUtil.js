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
	var result = false;

	if((cell.j == 0 || cell.j == N - 1) || (cell.i == N - 1)){
		var counter = 0;
		cell.corners.each(function(p){
			if(Geometry.isInside(path, p)){
				result = true;
				counter++;
			}
		});

		if(counter == 2) result = true;

	} else {
		cell.corners.each(function(p){
			if(Geometry.isInside(path, p)){
				result = true;
			}
		});
	}


	return result;
};

Cell.copy = function(cell){
	var eachCell = new Cell(cell.x, cell.y, cell.i, cell.j, cell.angle, cell.w);
	eachCell.part = $.extend(true, {}, cell.part);
	eachCell.part.x = cell.x;
	eachCell.part.y = cell.y;
	eachCell.name = cell.name;
	eachCell.free = cell.free;
	return eachCell;
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

		score: function(width, height){
			if(score == 0){
				var wheels  = this.findBy(function(each){ return each.name == "Wheel";  });
				var servos  = this.findBy(function(each){ return each.name == "Servo"; });
				var sensors = this.findBy(function(each){ return each.name == "Sensor"; });
				var cpu     = this.findBy(function(each){ return each.name == "Microcontroller"; });
				var battery = this.findBy(function(each){ return each.name == "BatteryPack"; });

				var w1      = wheels[0];
				var w2      = wheels[1];
				var srv     = servos[0];
				var sr      = sensors[0];
				var sr1     = sensors[1];
				if(!w1 || !w2 || !srv || !sr || !sr1 ) {
					score = 0;
					return score;
				}


				var d1 = wheels[0].distanceFromCenterTo(wheels[1])/width;
				var d2 = (servos[0].distanceFromCenterTo(wheels[0]) + servos[0].distanceFromCenterTo(wheels[1]))/height;
				var d3 = sensors[0].distanceFromCenterTo(sensors[1])/width;
				var d4 = ((wheels[0].distanceFromCenterTo(cpu[0])
					+ wheels[1].distanceFromCenterTo(cpu[0]) + servos[0].distanceFromCenterTo(cpu[0]))
					- servos[0].distanceFromCenterTo(battery[0]))/(width/2);

				score = d1 + d2 + d3 + 1 - d4;
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
	for(var f = 0; f < N; f++){
		var each = horizontal ? grid[t][f] : grid[f][t];
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
			for(var j = 1; j < hi; j++){
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
				var eachSol		 = null;
				// down
				if(isConsistent(lo + 1, j, hi)){
					eachSol				 = Solution();
					eachBattery 		 = grid[lo + 1][j];
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
