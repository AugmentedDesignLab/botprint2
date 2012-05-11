function Rotator(svg) {
	var draw = svg.paper;
	var bBox = svg.getBBox();
	if(!bBox)
		debugger;
	var circle = draw.circle((bBox.x+bBox.x2)/2, bBox.y-14, 5);
	circle.attr({'fill': 'white'});
	
	this.svg = svg;
	this.circle = circle;
	svg.rotator = this;
}

Rotator.prototype.enable = function(){
	var tstr, circle = this.circle, svg = this.svg;
	var ox, oy, oDeg = 0, deg;
	circle.drag(function(dx, dy, x, y, event){
		/* onDrag, x and y here are both relative to upper-left corner of
		 * the BROWSER!
		 */
		var box = svg.getBBox();
	    var rad = Math.atan2((box.x+box.width/2)-(ox+dx), (oy+dy)-(box.y + box.height/2));
	    /* deg: the angle of the positive y and the line between current 
	     * circle position and box center
	     */
		deg = rad/Math.PI*180; 
		svg.transform(tstr+'R'+(deg-oDeg));
		circle.attr({'cx': ox+dx, 'cy': oy+dy});
	}, function(x, y, event){
		// onStart
		tstr = svg.transform();
		ox = circle.attrs.cx;
		oy = circle.attrs.cy;
	}, function(event) {
		// onEnd
		oDeg = deg;
	});
	
	circle.mouseover(function(){
		this.attr({'fill':'blue'});
	});
	
	circle.mouseout(function(){
		this.attr({'fill':'white'});
	})
	this.circle.show();
};

Rotator.prototype.disable = function() {
	unbindAll(this.circle);
	this.circle.hide();
};



Rotator.prototype.setX = function(x) {
	this.circle.attr('cx', x);
};

Rotator.prototype.setY = function(y) {
	this.circle.attr('cy', y);
};

Rotator.prototype.getX = function() {
	return this.circle.attrs.cx;
};

Rotator.prototype.getY = function() {
	return this.circle.attrs.cy;
};
