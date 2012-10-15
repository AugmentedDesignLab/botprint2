var Cell = function(x, y, i, j, angle, space){
	var self = this;

	var corners = [
		Point.make(x, y), 					// top left
		Point.make(x + space, y), 			// top right
		Point.make(x + space, y + space), 	// bottom right
		Point.make(x, y + space)			// bottom left
	];

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
		this.corners.point(0).distanceTo(cell.corners.point(0));
	};
	self.part    = null;
	self.name    = self.part != null ? self.part.name : "none";

}; Cell.isValid = function(path, cell){
	// return true if all the points are inside the chassis.
	var result = false;
	cell.corners.each(function(p){
		if(Geometry.isInside(path, p)){
			result = true;
		}
	});

	return result;
};

Cell.copy = function(cell){
	return new Cell(cell.x, cell.y, cell.i, cell.j, cell.angle, cell.w);
};

var Solution = function(){
	var elements = [];
	return {
		add: function(cell){
			elements.push(cell);
		},

		find: function(i, j){
			var result = null;
			elements.forEach(function(each){
				if(each.i == i && each.j == j){
					result = each;
				}
			});

			return result;
		},

		score: function(){
			// todo(Huascar) once I found the problem with Geometry.isInside
			// I will implement this.
			return 1;
		},

		size: function(){
			return elements.length;
		},

		at: function(idx){
			return elements[idx];
		},

		contains: function(i, j, name){
			var result = false;
			var part   = this.find(i, j);

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