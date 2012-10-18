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

var InnerVertexStrategy = {
	getPunchHoles: function(chassisPath) {
		punchHoles = [];
		
		var innerVertices = [];
		chassisPath.forEach(function(action) {
			if(action[0]=='C') {
				var deltaX = action[3]-action[5];
				var deltaY = action[4]-action[6];
				// the angle between the tangent line and positive X axis
				var angle = Math.atan2(deltaY, deltaX); 
				// calculate a point for each side
				var distanceFromEdge = SpecSheet.chassis.holeEdge;
				var angle1 = angle+Math.PI/2;
				var v1 = {x: action[5]+distanceFromEdge*Math.cos(angle1),
								y: action[6]+distanceFromEdge*Math.sin(angle1)};
				var angle2 = angle - Math.PI/2;
				var v2 = {x: action[5]+distanceFromEdge*Math.cos(angle2),
								y: action[6]+distanceFromEdge*Math.sin(angle2)};
				if(Geometry.isInside(chassisPath, v1)){
					innerVertices.push(v1);
				} else if(Geometry.isInside(chassisPath, v2)) {
					innerVertices.push(v2);
				}
			}
		});
		// construct a inner chassis path from inner vertices
		var start = innerVertices.pop();
		var innerPath = [['M', start.x, start.y], ['R'], ['z']];
		innerVertices.forEach(function(v) {
			innerPath[1].push(v.x, v.y);
		});
		// Construct an raphael element from the inner path
		var paper = Raphael(document.createElement('div'), 10000, 10000);
		var pathElem = paper.path(innerPath);
		// get the total length of the inner path
		var totalLength = pathElem.getTotalLength();
		var distanceFromEdge = SpecSheet.chassis.holeEdge;
		// get points along the inner path
		for(var length = 1; length < totalLength; length += SpecSheet.chassis.holeDistance) {
			var point = pathElem.getPointAtLength(length);
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
		for(var length = 1; length < totalLength; length += SpecSheet.chassis.holeDistance) {
			var point = pathElem.getPointAtLength(length);
			var angle = point.alpha/180*Math.PI+Math.PI/2;
			var hole1 = {x: point.x + distanceFromEdge*Math.cos(angle),
						y: point.y + distanceFromEdge*Math.sin(angle),
						radius: SpecSheet.chassis.punchHoleRadius
			};
			var hole2 = {x: point.x - distanceFromEdge*Math.cos(angle),
						y: point.y - distanceFromEdge*Math.sin(angle),
						radius: SpecSheet.chassis.punchHoleRadius
			};
			
			if(Geometry.isInside(chassisPath, hole1)){
				punchHoles.push(hole1);
			} else if(Geometry.isInside(chassisPath, hole2)) {
				punchHoles.push(hole2);
			}
		}
		return punchHoles;
	}
};