/**
 * Chassis domain object. A chassis object 	has two decks (top and bottom),
 * and four panels front, back, left, and right. Each of these parts
 * contains a determined layout for the elements they will contain.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Chassis (opts){
	var options = {isLeaf: false, name: 'Chassis'};
	$.extend(options, opts || {});
	var punchHoles;

	var self = {
		serializable: ['id', 'name', 'path', 'transform', 'corners'],

		path: options.path || [],
		transform: options.transform,
		corners: options.corners,
		
		isSelfIntersecting: function() {
			return IntersectionDetection.isSelfIntersecting(self.path);
		},
		
		isInsideChassis: function(point) {
			var pathElem = document.createElement('path');
			pathElem.setAttribute('d', self.path);
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
		
		get punchHoles() {
			punchHoles = [];
			// assuming the chassis consists of cubic bezier curves
			self.path.forEach(function(action) {
				if(action[0]=='C') {
					var deltaX = action[3]-action[5];
					var deltaY = action[4]-action[6];
					// the angle between the tangent line and positive X axis
					var angle = Math.atan2(deltaY, deltaX); 
					// calculate a point for each side
					var distanceFromEdge = SpecSheet.chassis.holeEdge;
					var angle1 = angle+Math.PI/2;
					var hole1 = {x: action[5]+distanceFromEdge*Math.cos(angle1),
									y: action[6]+distanceFromEdge*Math.sin(angle1),
									radius: SpecSheet.chassis.punchHoleRadius};
					var angle2 = angle - Math.PI/2;
					var hole2 = {x: action[5]+distanceFromEdge*Math.cos(angle2),
									y: action[6]+distanceFromEdge*Math.sin(angle2),
									radius: SpecSheet.chassis.punchHoleRadius};
					if(self.isInsideChassis(hole1)){
						punchHoles.push(hole1);
					} else if(self.isInsideChassis(hole2)) {
						punchHoles.push(hole2);
					}
					
				}
			});
			return punchHoles;
		},

		accept: function(visitor) {
			return visitor.visitChassis(this);
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}