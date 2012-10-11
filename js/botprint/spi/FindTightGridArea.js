/**
 * Find the optimal rotated grid; that is the rectangle with the highest height.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 * @author lin.zhp@cs.ucsc.edu (Zhongpeng Lin)
 */
function FindTightGridArea(paper, chassis){
	// Create a svg element given the path of the chassis.
	// Call Freetransform and determined the bounding box with the max height.
	// cache the angle and the bbox of such rotated chassis.
	// after the above, then start plaching wheels, sensors, and servo heuristically.
	// then do Jim's way to move the battery pack and microcontroller.

	var path  = chassis.path;
	var shape = paper.path(path).hide();

	// for the corners, there is no need (i.e., false val) for a
	// clean transformation.
	var area    	= new Rectangle(Points.of(Corners(paper, shape, true)));

	// initialize the opt result.
	var opt	= {angle:0, area:area};

    var candidate = null, angle = 0;
	for(var i = 0; i <= 360; i++){
		// the idea is to get shape, rotate it, get the updated bbox and corners
		// then convert those corner points into a rectangular area
		// where one can use its height to determine which optimal grid one should
		// use.
		angle     = i;
		shape 	  = Transformation.rotate(shape, angle);
		// get BBox corner points
		var corners = Corners(paper, shape, true);
		candidate   = new Rectangle(Points.of(corners));

		if(candidate.height() > opt.area.height()){
			opt.area  = candidate;
			opt.angle = angle;
		}
	}

    return opt;
}