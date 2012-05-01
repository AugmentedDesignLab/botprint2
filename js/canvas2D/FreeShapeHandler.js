function FreeShapeHandler(draw) {
	this.draw = draw;
}

FreeShapeHandler.prototype.onMouseDown = function(x, y){
	this.selected = this.draw.path('M '+x+','+y);
	this.selected.attr('fill', '#00FF00');
};

FreeShapeHandler.prototype.onMouseMove = function(x, y){
	if(this.selected){
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +'L' + x + ',' + y);
	}
};

FreeShapeHandler.prototype.onMouseUp = function(x, y){
	if(this.selected){
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +'Z');
		this.current = this.selected;
		this.selected = null;
	}
};

FreeShapeHandler.prototype.onDoubleClick = function(x, y) {};