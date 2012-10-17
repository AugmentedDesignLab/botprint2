/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Corners (shape){
	var bBox = shape.getBBox();
	// get BBox corner points
	var corners = [
		{x: bBox.x, y: bBox.y},
		{x: bBox.x + bBox.width, y: bBox.y},
		{x: bBox.x + bBox.width, y: bBox.y + bBox.height},
		{x: bBox.x, y: bBox.y + bBox.height}];
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