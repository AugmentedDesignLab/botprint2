/**
 * Describable mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Describable (options){
	var coordinates = options.coordinates || {}; //e.g., coordinates: { x:0, y:0, z:0 };
	var dimensions  = options.dimensions  || {}; //e.g., dimensions: { w:0, h:0, d:0 };
	var shape		= options.shape 	  || {};
	return {
		/**
		 * @return {*} the assigned Three.js shape.
		 */
		shape: function(){
			return shape;
		},

		/**
		 * @return {*} the x-y-z coordinates of an object.
		 */
		coordinates: function(){
			return coordinates;
		},

		/**
		 * @return {*} the width-height-depth values.
		 */
		dimensions: function(){
			return dimensions;
		}
	};
}
