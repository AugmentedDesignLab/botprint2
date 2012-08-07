/**
 * PowerAmplifier domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function PowerAmplifier (opts){
	var options = {
		isLeaf: true
	};
	$.extend(options, opts || {});

	var self = {
		update: function(){
			// to trigger an event related to this model object
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}