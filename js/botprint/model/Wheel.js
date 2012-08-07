/**
 * Wheel domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Wheel (opts){
	var spec = SpecSheet.wheel;
	var options = {
		isLeaf: true,
		dimensions: { w:spec.width, h:spec.radius * 2, d:0 }
	};

	$.extend(options, opts || {});

	var snappedAt = { x:0, y:0, z:0};

	var self = {
		id: opts.id,
		
		snap: function(position){
			snappedAt = position;
		},

		getSnappingLocation: function(){
			return snappedAt;
		},

		update: function(){
			self.radio.trigger(ApplicationEvents.wheelUpdated,
                            {id: self.id, x: self.x, y: self.y});
		},
		
		delete: function() {
			self.radio.trigger(ApplicationEvents.wheelDeleted, {id: self.id});
		}
	};
	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}