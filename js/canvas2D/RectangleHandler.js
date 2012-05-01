function RectangleHandler(draw) {
	this.draw = draw;
}

RectangleHandler.prototype.onMouseDown = function(x, y){
	this.selected = this.draw.rect(x, y, 0, 0);
	this.selected.attr('fill', '#00FF00');
};

RectangleHandler.prototype.onMouseMove = function(x, y){
	if(this.selected)
	{
		var attrs = this.selected.attrs;
		this.selected.attr('width', x - attrs.x);
		this.selected.attr('height', y - attrs.y);
	}
};

RectangleHandler.prototype.onMouseUp = function(x, y) {
	if(this.selected){
		this.current = this.selected;
		this.selected = null;		
	}
};

RectangleHandler.prototype.onDoubleClick = function(x, y) {};