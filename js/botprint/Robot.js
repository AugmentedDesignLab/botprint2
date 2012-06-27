/**
 * Robot domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Robot (opts/*e.g., {name: "RobotA", bus: EventBus(), algs: {wheel:W, chassis: C}}*/){
	opts 		= opts || {};
	var parts 	= [];

	var self 	= {
		options: function(){
			return opts;
		},

		addPart: function(part) {
			parts.push(part);
		},

		generate: function(){
		  	// iterate over all algorithms in the right order
	      	// get the necessary data or resources for the algo to function
		  	// return a result
			var algs = this.options().algs;
		},

		getPart: function(idx){
			return parts[idx];
		},

		removePart: function(part){
			var elems = parts.select(
				function(p){ return p.name() == part.name(); }
			);

			if(parts.length == 1){
				throw "Error: A robot cannot exist without the parts that makes it."
			}

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
