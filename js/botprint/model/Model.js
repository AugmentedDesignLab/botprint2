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
	Mixable(self).mix(Bindable (options.bus));
	Mixable(self).mix(Describable(options));
	return self;
}