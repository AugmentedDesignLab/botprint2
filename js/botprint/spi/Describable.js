/**
 * Describable mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Describable (options){
	var coordinates = options.coordinates || { x:0, y:0, z:0 };
	var dimensions  = options.dimensions  || { w:0, h:0, d:0 };
	var shape		= options.shape 	  || {};
	return {
		/**
		 * @return {*} the assigned Three.js shape.
		 */
		shape: function(){
			return shape;
		},

		x: coordinates.x,
		y: coordinates.y,
		w: dimensions.w,
		h: dimensions.h
	};
}
