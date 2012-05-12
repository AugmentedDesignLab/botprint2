EllipseHandler.prototype = new DrawHandlerBase();
EllipseHandler.prototype.constructor = EllipseHandler;

function EllipseHandler(canvas, options) {
	DrawHandlerBase.call(this, canvas);
	this.draw = canvas.draw;
}

EllipseHandler.prototype.onMouseDown = function(x, y){
	this.selected = this.draw.ellipse(x, y, 0, 0);
	this.selected.attr('fill', '#00FF00');
	//FIXME use options
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
		this.addSVG(this.selected);
		this.selected = null;
	}
};