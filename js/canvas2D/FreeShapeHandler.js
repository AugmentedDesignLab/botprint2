FreeShapeHandler.prototype = new DrawHandlerBase();
FreeShapeHandler.prototype.constructor = FreeShapeHandler;

function FreeShapeHandler(canvas, options) {
	DrawHandlerBase.call(this, canvas);
	this.canvas = canvas;
	this._options = options;
}

FreeShapeHandler.prototype.onMouseDown = function(x, y){
	var draw = this.canvas.draw;
	this.selected = draw.path('M '+x+','+y);
	this.selected.attr('fill', '#00FF00');
};

FreeShapeHandler.prototype.onMouseMove = function(x, y){
	if(this.selected){
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +'L' + x + ',' + y);
		this.selected.attr(this._options);
	}
};

FreeShapeHandler.prototype.onMouseUp = function(x, y){
	if(this.selected){
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +'Z');
		
		this.canvas.addSVG(this.selected);
		this.selected = null;
	}
};
