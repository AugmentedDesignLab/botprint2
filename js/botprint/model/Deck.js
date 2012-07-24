/**
 * The Deck domain object. This object will represent the layout pattern
 * of our robot.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Deck (opts){
	var options = {isLeaf: false};
	$.extend(options, opts || {});

	var self = this;

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}
