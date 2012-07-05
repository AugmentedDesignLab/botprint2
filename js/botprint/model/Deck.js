/**
 * The Deck domain object
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Deck (opts){
	var options = {isLeaf: false};
	$.extend(options, opts || {});

	var self = this;

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	$.extend (self, Part (opts));
	return self;
}
