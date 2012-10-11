var Geometry = {
	isSelfIntersecting: function(path){
		function endPoint(path) {
			var length = path.length;
			return new Vector2D(path[length-2], path[length-1]);
		}
		
		function equal(vect1, vect2) {
			return vect1.x == vect2.x && vect1.y == vect2.y;
		}
		
		var intersect;
		for(var i = 1; i < path.length; i++) {
			var start1 = endPoint(path[i-1]);
			var end1 = new Vector2D(path[i][5], path[i][6]);
			for(var j = i+1; j < path.length; j++) {
				var start2 = endPoint(path[j-1]);
				if(path[i][0] == 'C' && path[j][0] == 'C'){
					var end2 = new Vector2D(path[j][5], path[j][6]);
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
				var crossPonts = intersect.points.select(function(p){
					// return true only if p is not any of the vertices
					return !(equal(p, start1) || equal(p, end1) || equal(p, start2) || equal(p, end2));
				});
				if(crossPonts.length > 0) {
					return true;
				}
			}
		}
		return false;
	},
	
	/* Decide if a point is inside a shape
	 * shapePath: an array representing the path, or an SVG path string
	 * point: any object that has x and y attributes
	 */
	isInside: function(shapePath, point) {
		var pathElem = document.createElement('path');
		pathElem.setAttribute('d', shapePath);
		var lineElem = document.createElement('line');
		lineElem.setAttribute('x1', 0);
		lineElem.setAttribute('y1', 0);
		lineElem.setAttribute('x2', point.x);
		lineElem.setAttribute('y2', point.y);
		
		var intersect = Intersection.intersectShapes(new Path(pathElem), new Line(lineElem));
		if(intersect.status == 'Intersection') {
			var xPoints = intersect.points;
			return xPoints.length % 2 == 1;
		} else {
			return false;
		}		
	}
};