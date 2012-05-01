function PolygonHandler(draw) {
	this.draw = draw;
}

PolygonHandler.prototype.onMouseDown = function(x, y) {
	if(this.selected){
		// Extend the path
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +' L ' + x + ' ' + y);
	}else{
		// Create a new path
		this.selected = this.draw.path('M '+x+' '+y + ' L ' + x + ' ' + y);
		this.selected.attr('fill', '#00FF00');
	}
};

PolygonHandler.prototype.onMouseMove = function(x, y) {
	if(this.selected){
		// Modify the last path element
		var path = this.selected.attrs.path;
		var last = path[path.length - 1];
		last[1] = x;
		last[2] = y;
		this.selected.attr('path', path);
	}
};

PolygonHandler.prototype.onMouseUp = function(x, y) {};

PolygonHandler.prototype.onDoubleClick = function(x, y){
	if(this.selected){
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +'Z');
		this.current = this.selected;
		this.selected = null;
	}
};