/**
 * Find the optimal rotated grid; that is the rectangle with the highest height.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 * @author lin.zhp@cs.ucsc.edu (Zhongpeng Lin)
 */
function FindTightGridArea(paper, chassis){

	// Create a svg element given the path of the chassis.
	var path  = chassis.path;
	var shape = paper.path(path).hide();

	// FInd the corners of the BBox and cast them as a Rectangle.
	var area    	= new Rectangle(Points.of(Corners(shape)));

	// initialize the opt result.
	var opt	= {angle:0, area:area, path:path};

	// TODO(Zhongpeng) the angle may be also important to look at.
	var candidate = null, angle = 0;
	for(var i = 0; i <= 360; i++){
		// the idea is to get shape, rotate it, get the updated bbox and corners
		// then convert those corner points into a rectangular area
		// where one can use its height to determine which optimal grid one should
		// use.
		angle     = i;
		shape.transform('r'+angle);
		candidate   = new Rectangle(Points.of(Corners(shape)));

		if(candidate.height() > opt.area.height()){
			opt.area  = candidate;
			opt.angle = angle;
			opt.path = shape.attrs.path;
		}
	}

	return opt;
}