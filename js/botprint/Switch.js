/**
 * Switch domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Switch (O){
	var opts = O || {};
	var self = this;
	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	$.extend (self, Part (opts));
}