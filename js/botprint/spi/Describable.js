/**
 * Describable mixin
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Describable (){
	var position 	= { x:0, 	 y:0, 		z:0		};
	var dimensions  = { width:0, height:0, 	depth:0	};
	return {
		position: function(){
			return position;
		},

		dimensions: function(){
			return dimensions;
		}
	};
}
