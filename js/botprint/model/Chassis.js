/**
 * Chassis domain object. A chassis object 	has two decks (top and bottom),
 * and four panels front, back, left, and right. Each of these parts
 * contains a determined layout for the elements they will contain.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Chassis (opts){
	var options = {isLeaf: false};
	$.extend(options, opts || {});
	var self = {
		path: options.path,
		transform: options.transform,
		
		update: function(){
			// to trigger an event related to this model object
			self.radio.trigger(ApplicationEvents.chassisShapeUpdated,
							   {path: self.path, transform: self.transform});
		},
		
		selfIntersecting: function() {
			function endPoint(path) {
				var length = path.length;
				return new Vector2D(path[length-2], path[length-1]);
			}
			
			function equal(vect1, vect2) {
				if(vect1.x == vect2.x && vect1.y == vect2.y)
					return true;
				else
					return false;
			}
			
			var intersect;
			for(var i = 1; i < self.path.length; i++) {
				var start1 = endPoint(self.path[i-1]);
				var end1 = new Vector2D(self.path[i][5], self.path[i][6]);
				for(var j = i+1; j < self.path.length; j++) {
					var start2 = endPoint(self.path[j-1]);
					if(self.path[i][0] == 'C' && self.path[j][0] == 'C'){
						var end2 = new Vector2D(self.path[j][5], self.path[j][6]);
						intersect = Intersection.intersectBezier3Bezier3(
							start1,
							new Vector2D(self.path[i][1], self.path[i][2]),
							new Vector2D(self.path[i][3], self.path[i][4]),
							end1,
							start2,
							new Vector2D(self.path[j][1], self.path[j][2]),
							new Vector2D(self.path[j][3], self.path[j][4]),
							end2
						);
					} // other line intersections can be added there when needed
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
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}