/**
 * Find the optimal rotated grid
 */
function FindOptRotatedGrid(paper, chassis){
	// Create a svg element given the path of the chassis.
	// Call Freetransform and determined the bounding box with the max height.
	// cache the angle and the bbox of such rotated chassis.

	var shape = document.createElement('path');
	var path    = chassis.path;
	shape.setAttribute('d', path.toString);


    var angles = [45, 67, 90, 135, 180, 270, 360];
	var transform = paper.freeTransform(shape);
	transform.unplug();
	transform = paper.freeTransform(shape);


	// permute the angles
	Shuffler().shuffle(angles);

	var N 	= angles.length;
	var max	= {angle:0, grid:{}};


	for(var i = 0; i < N; i++){
		transform.attrs.rotate = angles[i];
		transform.apply();
		shape = transform.subject;

	}

}