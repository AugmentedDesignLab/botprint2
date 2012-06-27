/**
 * Motor domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Motor (opts){
	opts = opts || {};
	var self = this;
	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	$.extend (self, Part (opts));
	return self;
}