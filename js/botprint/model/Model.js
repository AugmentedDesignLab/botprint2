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

		name: options.name,

		options: function(){
			return options;
		},
		
		toJSON: function() {
		// Used by JSON.stringify.	
			if(this.serializable) {
				var replacer = {};
				var theModel = this;
				this.serializable.forEach(function(attr) {
					replacer[attr] = theModel[attr];
				});
				return replacer;
			} else {
				return this;
			}
		}
		
	};

	// Mixing it in, just smash the methods of the newly created Bindable onto
	// this object
	Mixable(self).mix(Bindable (options.bus));
	Mixable(self).mix(Describable(options));
	return self;
}