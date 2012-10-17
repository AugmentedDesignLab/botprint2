/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
var Transformation = {
	transform: function(paper, shape, forced){
		var ft = paper.freeTransform(shape);
		if(forced){
			ft.unplug();
			ft = paper.freeTransform(shape);
		}
		return ft;
	},

	rotate: function(shape, angle){
		shape.transform("r" + angle);
		return $.extend(true, {}, shape);
	}
};