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
			return Geometry.isSelfIntersecting(self.path);
		},
		
		// assuming the chassis is a Catmull-rom curve
		get punchHoles() {
			return InwardNormalStrategy.getPunchHoles(self.path);
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