var ScaledDownChassisStrategy = {
	getPunchHoles: function(chassisPath) {
		punchHoles = [];
		// Scaled down the chassis
		var innerPath = Raphael.transformPath(chassisPath, 's0.8');
		// Construct an raphael element from the inner path
		var paper = Raphael(document.createElement('div'), 10000, 10000);
		var pathElem = paper.path(innerPath);
		// get the total length of the inner path
		var totalLength = pathElem.getTotalLength();
		var distanceFromEdge = SpecSheet.chassis.holeEdge;
		// get points along the inner path
		for(var length = 1; length < totalLength; length += SpecSheet.chassis.holeDistance) {
			var point = pathElem.getPointAtLength(length);
			var angle = point.alpha/180*Math.PI+Math.PI/2;
			var hole = {x: point.x,
						y: point.y,
						radius: SpecSheet.chassis.punchHoleRadius
			};
			punchHoles.push(hole);
		}
		return punchHoles;
	}
};

var InwardNormalStrategy = {
	getPunchHoles: function(chassisPath) {
		punchHoles = [];
		// Construct an raphael element from the inner path
		var paper = Raphael(document.createElement('div'), 10000, 10000);
		var pathElem = paper.path(chassisPath);
		// get the total length of the inner path
		var totalLength = pathElem.getTotalLength();
		var distanceFromEdge = SpecSheet.chassis.holeEdge;
		// get points along the inner path
		for(var length = 1; length < totalLength; length += distanceFromEdge) {
			var point = pathElem.getPointAtLength(length);
			var angle = point.alpha/180*Math.PI+Math.PI/2;
			var holeCenter1 = Point.make(point.x + distanceFromEdge*Math.cos(angle),
										 point.y + distanceFromEdge*Math.sin(angle));
			var holeCenter2 = Point.make(point.x - distanceFromEdge*Math.cos(angle),
										 point.y - distanceFromEdge*Math.sin(angle));
			
			var candidateCenter = null;
			if(holeCenter1.isInside(chassisPath)){
				candidateCenter = holeCenter1;
			} else if(holeCenter2.isInside(chassisPath)) {
				candidateCenter = holeCenter2;
			}
			if(candidateCenter) {
				// decide if the candidate is too close to the edge
				var circleElem = paper.circle(candidateCenter.x, candidateCenter.y, distanceFromEdge-1);
				var intersect = Intersection.intersectShapes(new Circle(circleElem.node), new Path(pathElem.node));
				var points = intersect.points;
				if(points.length <= 1) {
					// decide if the candidiate is too close to other punch holes
					var tooClose = false;
					var lastDistance;
					punchHoles.forEach(function(h) {
						var distance = candidateCenter.distanceTo(h);
						if(distance < distanceFromEdge-1){
							lastDistance = distance;
							tooClose = true;
						}
					});
					if(tooClose) {
						length -= lastDistance;
					} else {
						punchHoles.push({x: candidateCenter.x, y: candidateCenter.y, radius: SpecSheet.chassis.punchHoleRadius});												
					}
				}
			}
		}
		return punchHoles;
	}
};

var InnerShapeStrategy = {
	getPunchHoles: function(chassisPath) {
		punchHoles = [];
		// Construct an raphael element from the inner path
		var paper = Raphael(document.createElement('div'), 10000, 10000);
		var pathElem = paper.path(chassisPath);
		// get the total length of the inner path
		var totalLength = pathElem.getTotalLength();
		var distanceFromEdge = SpecSheet.chassis.holeEdge;
		var accumulatedDistance = distanceFromEdge;
		var lastPoint;
		// get points along the inner path
		for(var length = 1; length < totalLength; length+=2) {
			var point = pathElem.getPointAtLength(length);
			var angle = point.alpha/180*Math.PI+Math.PI/2;
			var holeCenter1 = Point.make(point.x + distanceFromEdge*Math.cos(angle),
										 point.y + distanceFromEdge*Math.sin(angle));
			var holeCenter2 = Point.make(point.x - distanceFromEdge*Math.cos(angle),
										 point.y - distanceFromEdge*Math.sin(angle));
			
			var candidateCenter = null;
			if(holeCenter1.isInside(chassisPath)){
				candidateCenter = holeCenter1;
			} else if(holeCenter2.isInside(chassisPath)) {
				candidateCenter = holeCenter2;
			}
			if(candidateCenter) {
				if(lastPoint) {
					accumulatedDistance += candidateCenter.distanceTo(lastPoint);
				}
				if(accumulatedDistance >= distanceFromEdge) {
					// decide if the candidate is too close to the edge
					var circleElem = paper.circle(candidateCenter.x, candidateCenter.y, distanceFromEdge-1);
					var intersect = Intersection.intersectShapes(new Circle(circleElem.node), new Path(pathElem.node));
					var points = intersect.points;
					if(points.length <= 1) {
						// decide if the candidiate is too close to other punch holes
						var tooClose = false;
						var lastDistance;
						punchHoles.forEach(function(h) {
							var distance = candidateCenter.distanceTo(h);
							if(distance < distanceFromEdge-1){
								lastDistance = distance;
								tooClose = true;
							}
						});
						if(!tooClose) {
							punchHoles.push({x: candidateCenter.x, y: candidateCenter.y, radius: SpecSheet.chassis.punchHoleRadius});												
							accumulatedDistance = 0;
						}
					}
				}
				lastPoint = candidateCenter;
			}
		}
		return punchHoles;
	}
};