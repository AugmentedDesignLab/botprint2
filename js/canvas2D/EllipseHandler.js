function EllipseHandler(draw) {
	this.draw = draw;
}

EllipseHandler.prototype.onMouseDown = function(x, y){
	this.selected = this.draw.ellipse(x, y, 0, 0);
	this.selected.attr('fill', '#00FF00');
};

EllipseHandler.prototype.onMouseMove = function(x, y){
	if(this.selected)
	{
		var attrs = this.selected.attrs;
		this.selected.attr('rx', Math.abs(x - attrs.cx));
		this.selected.attr('ry', Math.abs(y - attrs.cy));
	}
};

EllipseHandler.prototype.onMouseUp = function(x, y) {
	if(this.selected){
		this.current = this.selected;
		this.selected = null;		
	}
};

EllipseHandler.prototype.onDoubleClick = function(x, y) {};