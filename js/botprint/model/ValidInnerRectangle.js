/**
 * This algorithm adapts a scaled down rectangle inscribed inside the sketched chassis.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function ValidInnerRectangle(data){
	var self = {
		gimme: function() {
			var data 	  = this.data();
			var rectangle = data.rect;
			var vertices  = data.vertices;

			// set up
			var checkingPoints = new Points();
			var points = rectangle.points;
			var center = rectangle.center();

			var size   = points.size();

			for(var q = 0; q < 8; q++){
				var cx, cy, j, k;
				if(q < 4) {
					checkingPoints.add(Point.of(points.point(q)));
				} else {
					j  = q % 4;
					k  = ( j + 1 ) % size;
					cx = ( points.point(j).x + points.point(k).x ) / 2;
					cy = ( points.point(j).y + points.point(k).y ) / 2;
					checkingPoints.add(Point.make(cx, cy));
				}
			}

			// validate
			for(var i = 0; i < vertices.size(); i++){

				if(checkingPoints.size() > 8) break;

				var each = vertices.point(i);
				vertices.log();
				var p = Point.make(each.x, each.y);

				var separation, distance;
				for(var idx = 0; idx < checkingPoints.size(); idx++){
					var e = checkingPoints.point(idx);
					separation = e.distanceTo(center) + Rectangle.GAP;
					distance   = p.distanceTo(center);
					if(distance < separation){
						console.log("it is invalid, shrink once more.");
						InR(rectangle);
						return rectangle.inner;
					}
				}
			}



			return rectangle;
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Algorithm (data));
	return self.gimme();
}