/**
 * Model mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Model (options/*options, e.g., {bus: EventBus(), name:"ModelA"}*/) {
	options = options || {};
	var self = {
		bus: function(){
			return options.bus;
		},

		name: function(){
			return options.name;
		},

		options: function(){
			return options;
		}
	};

	// Mixing it in, just smash the methods of the newly created Bindable onto
	// this object
	$.extend (self, Bindable (options.bus));
	$.extend (self, Describable(options));
	return self;
}