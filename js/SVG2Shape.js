function SVG2Shape() {
	
}

SVG2Shape.prototype.convert = function(elem) {
	var shape;
	switch(elem.type) {
		case 'path': shape = this.fromPath(elem); break;
		case 'rect': shape = this.fromRect(elem); break;
		case 'circle': shape = this.fromCircle(elem); break;
	}
	return shape;
};

SVG2Shape.prototype.fromPath = function(elem) {
	var path = elem.attrs.path;
	var shape = new THREE.Shape();
	var start = new THREE.Vector2();
	for(var i = 0; i < path.length; i++)
	{
		var action = path[i];
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
}
