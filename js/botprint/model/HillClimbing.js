/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function HillClimbing(data){
	var SPACE = 2 * data.space;
	var self = {
		solve: function(){
			var max   = data.max;
			var angle = data.angle;
			var area  = data.area;
			var path  = data.path;

			var full = Solution();
			var grid = Grid.of(2, area, path, max, angle);


			var wheels  = data.wheels;
			var servos  = data.servos;
			var sensors = data.sensors;

			for(var flag = 0; flag < 2; flag++){
				// walk rows
				var row = flag == 0 ? 0 : grid.length - 1;
				walk(grid, full, row, true,
					(flag == 0 ? wheels : servos), SPACE);
				// walk cols
				var col = flag == 0 ? 0 : grid.length - 1;
				walk(grid, full, col, false,
					(flag == 0 ? pack(sensors.pop()) : pack(sensors.pop())), SPACE);

			}

			var leftover = {cpu:data.cpu, battery:data.battery};

			return this.findMax(grid, full, leftover, 1, max);

		},

		findMax: function(grid, full, leftover, lo, hi){
			// everytime I place the cpu, I should try up, down, left,
			// right to place battery pack.
			// everytime I do that, I can calculate the score.

			var width  = data.area.width();
			var height = data.area.height();

			var solutions = this.enumerate(
				grid, full, leftover, lo, hi - 1
			);

			var max = solutions[0];
			for(var s = 1; s < solutions.length; s++){
				var candidate = solutions[s];
				if(candidate.score(width, height) > max.score(width, height)){
					max = candidate;
				}
			}

			return max;
		},

		enumerate: function(grid, full, leftover, lo, hi){
			return Enumerate.all(grid, full, leftover, lo, hi);
		}
	};

	Mixable(self).mix(Algorithm (data));
	return self;
}