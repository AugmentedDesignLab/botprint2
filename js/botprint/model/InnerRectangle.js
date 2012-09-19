/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function InnerRectangle(data){
	var self = {
		inner: function(){
			var data		= this.data();
			var rectangle 	= data.rect;
			var center	  	= data.center;

			var inner = rectangle.clone();
			inner.points.each(function(p, i){
				// subtracts the center from each vertex point
				p.x = p.x - center.x;
				p.y = p.y - center.y;

				// scales each vertex point
				p.x = InnerRectangle.SCALE * p.x;
				p.y = InnerRectangle.SCALE * p.y;

				// shifts back the center
				p.x = p.x + center.x;
				p.y = p.y + center.y;
			});

			rectangle.inner = inner;
			return inner;

		}
	};

	Mixable(self).mix(Algorithm (data));
	return self.inner();
}

InnerRectangle.SCALE = 0.1234;