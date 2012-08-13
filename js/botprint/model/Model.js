/**
 * Model mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Model (options/*options, e.g., {bus: EventBus(), name:"ModelA"}*/) {
	options = options || {};
	var self = {
		radio: options.app,
		
		bus: function(){
			return options.bus;
		},

		name: function(){
			return options.name;
		},

		options: function(){
			return options;
		},
		
		update: function(){
			/* All attributes of self will be stringified by default.
			 * However, it is encouraged to specify a list of attributes
			 * in the replacer, so that only those attributes will be
			 * stringified. Alternatively, a subclass can define a
			 * toJSON method, and return an object that will be stringified
			 * instead of self
			 */
			var json = JSON.stringify(self, self.replacer);
			self.radio.trigger(ApplicationEvents.robotUpdated, {robot: json});
		}
	};

	// Mixing it in, just smash the methods of the newly created Bindable onto
	// this object
	Mixable(self).mix(Bindable (options.bus));
	Mixable(self).mix(Describable(options));
	return self;
}