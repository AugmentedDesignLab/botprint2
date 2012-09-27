/**
 * It allows us to get an optimal placement of "clusters of parts" on a grid using backtracking and
 * incremental improvement ideas.
 *
 * @param data
 * 		a record object consisting of cell width-height (d:int), NxN grid (n:Int), clusters
 * 		of parts.
 * @return sol
 * 		consisting of an optimal parts placement.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function ItemsPlacement(/*d:int, n:int, clusters:array of parts*/data){

	var solutions = [];

	var PackIt      = function(data, solution){
		var opts  = {
			name: 			"TOP",
			app: 			data.radio,
			bus: 			data.bus,
			coordinates: 	data.coordinates,
			dimensions: 	data.dimensions,
			polygon: 		data.polygon
		};

		var deck    = Deck(opts);

		solution.current.forEach(function(each){
			var blocks = each.group;
			var packer = BinPacker(each);
			packer.fit(blocks);

			for(var i = 0; i < blocks.length; i++){
				if(blocks[i].fit){
					deck.add(blocks[i].fit);
				}
			}
		});

		return deck;
	};

	var Area 		= function(){
		var self = this;
		self.x = 0;
		self.y = 0;
		self.w = 0;
		self.h = 0;

		self.group = [];
	};

	var Shuffler    = function(){
		return {
			uniform: function(N){
				return Math.floor(Math.random() * N);
			},

			shuffle: function(a){
				var N = a.length;
				for(var i = 0; i < N; i++){
					var r = i + this.uniform(N - i); // btw i and N - 1
					var temp = a[i];
					a[i]     = a[r];
					a[r]     = temp;
				}
			}
		};
	};

	var Solution	= function(){
		var self = this;
		self.current = []; // array of areas
	};

	var findMin     = function(solutions){
		var min = null;

		// Get an optimal solution
		for(var i = 0; i < solutions.length; i++){
			var each = solutions[i];
			if(min == null) { min = each; } else {
				if(less(each, min)){
					min = each;
				}
			}
		}

		return min;
	};

	var less		= function(a, b){
		return distance(a) < distance(b);
	};

	var distance	= function(sol){
		var dist   = 0;
		var pivot = sol.current[0];
		for (var i = 1; i < sol.current.length; i++) {
			var each = sol.current[i];
			var pow  = Math.pow(pivot.x - each.x, 2) + Math.pow(pivot.y - each.y, 2);
			dist    += Math.floor(Math.sqrt(pow));
			pivot    = each;
		}
		return dist;
	};

	var isConsistent = function(q, j, r){
		for (var i = 0; i < r; i++) {
			if (q[i] == j) {
				return false;   // same column in the grid
			}
			if (q[i] == j + r - i) {
				return false;   // same major diagonal in the grid
			}
			if (q[i] == j - r + i) {
				return false;   // same minor diagonal in the grid
			}
		}
		return true;
	};


	var self = {
		admit: function(q){
			var src = this.evictSolution(q);
			// using JQuery to perform a deep copy of array
			// see http://stackoverflow.com/questions/565430/deep-copying-an-array-using-jquery
			var dst = $.extend(true, [], src);
			var sol = new Solution();
			sol.current = dst;
			solutions.push(sol);
		},

		evictSolution: function(q){
			var areas = [];
			var N     = q.length;

			var x	  = 0;
			var y	  = 0;

			var d     = this.data().d;

			for(var i = 0; i < N; i++){
				for(var j = 0; j < N; j++) {
					if(q[i] == j){
						var area = new Area();
						area.x   = x;
						area.y   = y;
						area.w   = d;

						areas.push(area);
					}

					x += d;

					if(j + 1 == N){
						x = 0;
						y += d;
					}
				}

				if(i + 1 == N){
					y = 0;
				}
			}

			return areas;

		},

		// solves the items placement as an optimization problem
		solve: function(){
			/**Get an optimal placement**/
			return findMin(
				/**Enumerate feasible placements**/
				this.enumerate()
			);
		},

		// enumerate feasible placements
		enumerate: function(){
			this.enumerateAll(new Array(this.data().n), 0);
			this.prepGroups();
			return solutions;
		},

		// enumerate all possible ones
		enumerateAll: function(q, r) {
			var N = q.length;
			if(r == N) { this.admit(q); } else {
				for (var j = 0; j < N; j++) {
					q[r] = j;
					if(isConsistent(q, j, r)) { this.enumerateAll(q, r + 1); }
				}
			}
		},

		prepGroups: function(){
			var clusters = this.data().clusters;
			solutions.forEach(function(each){
				Shuffler().shuffle(clusters);
				for(var j = 0; j < each.current.length; j++){
					each.current[j].group = $.extend(true, [], clusters[i]);
				}
			});

		}
	};

	Mixable(self).mix(Algorithm (data));
	return PackIt(data, self.solve());
}