/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Corners (draw, shape, forced/*avoids any optimation on transformation; re-do it from scratch*/){
	// use Raphael.freetransform to get always acurate bounding box's corner points.
	var ft = Transformation.transform(draw, shape, forced);
	var corners = ft.getCorners();
	var result  = [];
	for(var i = 0; i < corners.length; i++){
		if(i < 4){
			var each  = corners[i];
			var point = {x: each.x, y: each.y};
			result.push(point);
		}
	}
	return result;
}