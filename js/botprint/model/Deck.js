/**
 * The Deck domain object. This object will represent the layout pattern
 * of our robot.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Deck (opts){
	var options = {isLeaf: false};
	$.extend(options, opts || {});

	var self = {
		update: function(){
			var event	= ApplicationEvents.layoutUpdated;
			var payload = {x: self.x, y: self.y, w: self.w, h:self.h};
			self.radio.trigger(event, payload);
		},

		remove: function() {
			self.radio.trigger(ApplicationEvents.layoutDeleted, {});
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}
