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
						return !(Geometry.equal(p, start1) || Geometry.equal(p, end1) || Geometry.equal(p, start2) || Geometry.equal(p, end2));
					});
					if(crossPonts.length > 0) {
						return true;
					}					
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
	},
	
	equal: function (vect1, vect2) {
		return Math.abs(vect1.x - vect2.x)< 0.001 && Math.abs(vect1.y - vect2.y) < 0.001;
	},
	
	getVertices: function(shapePath) {
		var start;
		var vertices = [];
		shapePath.forEach(function(action) {
			if(action.length >= 3) {
				var v = {x: action[action.length-2], y: action[action.length-1]};
				if(!start) {
					start = v;
					vertices.push(v);
				} else if(!Geometry.equal(v, start)){
					vertices.push(v);
				}
			}
		});
		return vertices;
	}
};