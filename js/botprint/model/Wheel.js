/**
 * Wheel domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Wheel (opts){
	var options = {isLeaf: true};
	$.extend(options, opts || {});

	var snappedAt = { x:0, y:0, z:0};

	var self = {
		snap: function(position){
			snappedAt = position;
		},

		getSnappingLocation: function(){
			return snappedAt;
		}
	};
	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}