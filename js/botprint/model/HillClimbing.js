/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function HillClimbing(data){
	var SPACE = 2 * data.space;

	function CenterLine(area){
		var tl = area.topLeft();
		var tr = area.topRight();
		var br = area.bottomRight();
		var bl = area.bottomLeft();

		var lmidx = (tl.x + bl.x) / 2;
		var lmidy = (tl.y + bl.y) / 2;

		var rmidx = (tr.x + br.x) / 2;
		var rmidy = (tr.y + br.y) / 2;

		return [Point.make(lmidx, lmidy), Point.make(rmidx, rmidy)];

	}

	var self = {
		postprocessing: function(solution){
			var path   = data.path;
			var newSol = Solution();
			var slide  = 0, climb = 0;
			var max    = max;

			solution.findBy().forEach(function(each){
				var taken = each;
				while(!Cell.isValid(path, taken, max)){
					taken = Cell.tune(taken, slide, climb);
					// to be fair
					if(Shuffler().bernoulli(0.5)) {slide += 1;} else {climb += 1;}
				}
				newSol.add(taken);
			});

			return newSol;
		},

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

			return this.postprocessing(this.findMax(grid, full, leftover, 5, max));

		},

		findMax: function(grid, full, leftover, lo, hi){
			// everytime I place the cpu, I should try up, down, left,
			// right to place battery pack.
			// everytime I do that, I can calculate the score.

			var width      = data.area.width();
			var height     = data.area.height();
			var centerLine = CenterLine(data.area);

			var solutions = this.enumerate(
				grid, full, leftover, lo, hi - 1
			);

			var max = solutions[0];
			for(var s = 1; s < solutions.length; s++){
				var candidate = solutions[s];
				var candScore = candidate.score(width, height, centerLine);
				var maxScore  = max.score(width, height, centerLine);
				if(candScore > maxScore){
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