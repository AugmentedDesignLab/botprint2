/**
 * Model mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Model (options/*options, e.g., {bus: EventBus(), name:"ModelA"}*/) {
	options = options || {};
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