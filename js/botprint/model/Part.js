/**
 * Part domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Part(opts){
	opts = opts || {};

	var parts = [];
	var root  = {};

	var self 	= {
		options: function(){
			return opts;
		},

		mount: function(owner) {
			root = owner;
		},

		addChild: function(part) {
			parts.push(part);
		},

		getAllParts: function(){
			return parts;
		},

		removeChild: function(part){
			var elems = parts.select(
				function(p){ return p.name() == part.name(); }
			);

			if(elems){
				delete elems[0];
			}
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	$.extend (self, Model (opts));
	return self;
}
