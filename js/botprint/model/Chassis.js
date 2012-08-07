/**
 * Chassis domain object. A chassis object 	has two decks (top and bottom),
 * and four panels front, back, left, and right. Each of these parts
 * contains a determined layout for the elements they will contain.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Chassis (opts){
	var options 	= {isLeaf: false};
	$.extend(options, opts || {});

	var vertices	= options.vertices || [];

	var self = {
		path: options.path,
		transform: options.transform,
		vertices: vertices,

		update: function(){
			// to trigger an event related to this model object
			self.radio.trigger(
				ApplicationEvents.chassisShapeUpdated,
				{
					path: 	   self.path,
					transform: self.transform,
					vertices:  self.vertices
				}
			);
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}