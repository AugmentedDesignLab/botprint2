/**
 * Describable mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Describable (options){
	var coordinates = options.coordinates || {}; //e.g., coordinates: { x:0, y:0, z:0 };
	var dimensions  = options.dimensions  || {}; //e.g., dimensions: { width:0, height:0, depth:0	};
	var shape		= options.shape 	  || {};
	return {
		shape: function(){
			return shape;
		},

		coordinates: function(){
			return coordinates;
		},

		dimensions: function(){
			return dimensions;
		}
	};
}
