/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function HillClimbing(data){
	var SPACE = 2 * data.space;

	var walk = function(grid, full, t, horizontal, bag){
		var taken = null;
		var N     = grid.length;
		for(var f = 0; f < N; f++){
			var each = horizontal ? grid[t][f] : grid[f][t];
			if(!each.valid) continue;
			if(!each.free)  continue;

			if(taken != null){
				if(taken.distanceTo(each) < SPACE) continue;
			}

			var part = bag.pop();
			if(!part) continue;

			each.free = false;
			each.part = part;
			taken     = each;
			full.add(Cell.copy(taken));
		}
	};

	var mdim = function(d, max){
		var array = new Array(max);
		for(var i = 0; i < max; i++){
			array[i] = new Array(max);
		} return array;
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


	var setupGrid = function(dimension, area, path, max, angle){
		var space	= Math.floor(area.topLeft().distanceTo(area.topRight())/max);
		var grid	= mdim(dimension, max);
		var x		= area.topLeft().x;
		var y		= area.topLeft().y;

		for(var i = 0; i < max; i++){
			for(var j = 0; j < max; j++){
				var cell = new Cell(x, y, i, j, angle, space);
				if(!Cell.isValid(path, cell)){
					cell.valid   = false;
					grid[i][j]   = cell;
				} else {
					grid[i][j]   = cell;
				}

				y += space;
			}

			x += space;
		}

		return grid;
	};


	var self = {
		solve: function(){
			var max   = data.max;
			var angle = data.angle;
			var area  = data.area;
			var path  = data.path;

			var full = Solution();
			var grid = setupGrid(2, area, path, max, angle);


			var wheels  = data.wheels;
			var servos  = data.servos;
			var sensors = data.sensors;

			for(var flag = 0; flag < 2; flag++){
				// walk rows
				walk(grid, full, flag, true,
					flag == 0 ? wheels : servos);
				// walk cols
				walk(grid, full, flag, false,
					flag == 0 ? pack(sensors.pop()) : pack(sensors.pop()));

			}

			var leftover = [data.cpu, data.battery];

			return this.findMax(grid, full, leftover, 1, max);

		},

		findMax: function(grid, full, leftover, lo, hi){
			// everytime I place the cpu, I should try up, down, left,
			// right to place battery pack.
			// everytime I do that, I can calculate the score.

			var solutions = this.enumerate(
				grid, full, leftover, lo, hi - 1
			);

			var max = solutions[0];
			for(var s = 1; s < solutions.length; s++){
				var candidate = solutions[s];
				if(candidate.score() > max.score()){
					max = candidate;
				}
			}

			return max;
		},

		enumerate: function(grid, full, leftover, lo, hi){
			var solutions 	= [];
			var N 			= grid.length;
			var part        = null;
			while(lo < N){
				for(var j = 1; j < hi; j++){
					var sol  = Solution();
					var each = grid[lo][j];
					//if(!each.valid) continue;

					// place cpu
					part 		 = leftover.cpu;
					each.free = true;
					each.part = part;
					sol.add(Cell.copy(each));

					var eachBattery = null;
					var eachSol		 = null;
					// down
					if(isConsistent(lo + 1, j, hi)){
						eachSol				 = Solution();
						eachBattery 		 = grid[lo + 1][j];
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachSol.add(Cell.copy(eachBattery));
						solutions.push(Solution.merge([full, sol, eachSol]));
						eachSol				 = null;
					}
					// right
					if(isConsistent(lo, j + 1, hi)){
						eachSol				 = Solution();
						eachBattery 		 = grid[lo][j + 1];
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachSol.add(Cell.copy(eachBattery));

						solutions.push(Solution.merge([full, sol, eachSol]));
						eachSol				 = null;
					}
					// left
					if(isConsistent(lo, j - 1, hi)){
						eachSol				 = Solution();
						eachBattery 		 = grid[lo][j - 1];
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachSol.add(Cell.copy(eachBattery));

						solutions.push(Solution.merge([full, sol, eachSol]));

						eachSol				 = null;
					}
					// up
					if(isConsistent(lo - 1, j, hi)){
						eachSol				 = Solution();
						eachBattery 		 = grid[lo - 1][j];
						part    	   		 = leftover.battery;
						eachBattery.free     = true;
						eachBattery.part     = part;
						eachSol.add(Cell.copy(eachBattery));

						solutions.push(Solution.merge([full, sol, eachSol]));

						eachSol				 = null;
					}

				} lo++;
			}

			return $.extend(true, [], solutions);
		}
	};

	Mixable(self).mix(Algorithm (data));
	return self.solve();
}