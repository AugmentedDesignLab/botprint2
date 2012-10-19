var Geometry = {
	isSelfIntersecting: function(path){
		function endPoint(path) {
			var length = path.length;
			return new Vector2D(path[length-2], path[length-1]);
		}
		
		for(var i = 1; i < path.length; i++) {
			var start1 = endPoint(path[i-1]);
			var end1 = endPoint(path[i]);
			for(var j = i+1; j < path.length; j++) {
				var intersect = null;
				var start2 = endPoint(path[j-1]);
				if(path[i][0] == 'C' && path[j][0] == 'C'){
					var end2 = endPoint(path[j]);
					intersect = Intersection.intersectBezier3Bezier3(
						start1,
						new Vector2D(path[i][1], path[i][2]),
						new Vector2D(path[i][3], path[i][4]),
						end1,
						start2,
						new Vector2D(path[j][1], path[j][2]),
						new Vector2D(path[j][3], path[j][4]),
						end2
					);
				} // other line intersections can be added here when needed
				if(intersect) {
					var crossPonts = intersect.points.select(function(p){
						// return true only if p is not any of the vertices
						return !(Points.isEqual(p, start1) || Points.isEqual(p, end1) || Points.isEqual(p, start2) || Points.isEqual(p, end2));
					});
					if(crossPonts.length > 0) {
						return true;
					}					
				}
			}
		}
		return false;
	}
};