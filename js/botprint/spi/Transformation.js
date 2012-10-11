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

	rotate: function(paper, shape, angle){
		var ft = this.transform(paper, shape);
		ft.attrs.rotate = angle;
		ft.apply();
		return ft.subject;
	}
};