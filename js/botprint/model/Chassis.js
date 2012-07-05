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

	var self = this;

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	$.extend (self, Part (opts));
	return self;
}