function SVG2Shape() {}

SVG2Shape.prototype.convert = function(elem) {
	var shape;
	switch(elem.type) {
		case 'path': shape = this.fromPath(elem); break;
		case 'rect': shape = this.fromRect(elem); break;
		case 'circle': shape = this.fromCircle(elem); break;
		case 'ellipse': shape = this.fromEllipse(elem); break;
	}
	// save transforms to be replayed later at Chassis.js
	shape.transforms = elem.transform();
	return shape;
};

SVG2Shape.prototype.fromPath = function(elem) {
	var path  = elem.attrs.path;
	var shape = new THREE.Shape();
	var start = new THREE.Vector2();

	// used to remove duplicate actions
	var existingActions = {};

	for(var i = 0; i < path.length; i++)
	{
		var action = path[i];
		if(!existingActions[action]){
			existingActions[action] = true;
			switch(action[0]){
				case 'M':
				case 'm':
					shape.moveTo(action[1], action[2]);
					start.set(action[1], action[2]);
					break;
				case 'L':
				case 'l':
					shape.lineTo(action[1], action[2]);
					break;
				case 'Z':
				case 'z':
					shape.lineTo(start.x, start.y);
					break;
			}

		}
	}

	return shape;
};

SVG2Shape.prototype.fromRect = function(elem) {
	var shape = new THREE.Shape();
	var attrs = elem.attrs;
	shape.moveTo(attrs.x, attrs.y);
	shape.lineTo(attrs.x + attrs.width, attrs.y);
	shape.lineTo(attrs.x + attrs.width, attrs.y + attrs.height);
	shape.lineTo(attrs.x, attrs.y + attrs.height);
	shape.lineTo(attrs.x, attrs.y);
	
	return shape;
};

SVG2Shape.prototype.fromCircle = function(elem) {
	var shape = new THREE.Shape();
	var attrs = elem.attrs;
	var circleRadius = attrs.r;
	var centerX = attrs.cx;
	var centerY = attrs.cy;
	/*
	 * circles drawn by quadratic curves are not actually
	 * circles, need to use arc instead. Also, the center
	 * of circle should be set according to the original
	 * center so that the relative position to other shapes
	 * would be kept.
	 */
	shape.absarc(centerX, centerY, circleRadius, 0, 2*Math.PI);
	return shape;
};

SVG2Shape.prototype.fromEllipse = function(elem) {
	var shape = new THREE.Shape();
	var attrs = elem.attrs;
	var cx = attrs.cx, cy = attrs.cy, rx = attrs.rx, ry = attrs.ry;

	/*
	 * absellipse is added to three.js by Zhongpeng Lin. To the date of
	 * 2012-05-12, the changes have not been accepted by official
	 * three.js repository, unfornately. In order to make this work,
	 * the three.js built from https://github.com/linzhp/three.js
	 * should be used.
	 */
	shape.absellipse(cx, cy, rx, ry, 0, 2*Math.PI);	
	return shape;
};
