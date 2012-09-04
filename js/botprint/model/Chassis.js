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

	var self = {
		serializable: ['id', 'name', 'path', 'transform', 'vertices', 'shape'],

		path: options.path || [],
		transform: options.transform,
		vertices: options.vertices || [],
		shape: options.shape,
		
		isSelfIntersecting: function() {
			return IntersectionDetection.isSelfIntersecting(self.path);
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