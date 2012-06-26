/**
 * View mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function View (O/*options, e.g., {bus: EventBus, name: "ViewA"}*/) {
	var options = O || {};
	var self = {
		name:function () {
			return options.name;
		},

		bus: function(){
			return options.bus;
		}
	};

	// Mixing it in, just smash the methods of the newly created Bindable onto
	// this object
	$.extend (self, Bindable (options.bus));

	return self;
}