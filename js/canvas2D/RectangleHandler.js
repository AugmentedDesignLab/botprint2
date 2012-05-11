RectangleHandler.prototype = new DrawHandlerBase();
RectangleHandler.prototype.constructor = RectangleHandler;

function RectangleHandler(canvas) {
	DrawHandlerBase.call(this, canvas);
	this.draw = canvas.draw;
}

RectangleHandler.prototype.onMouseDown = function(x, y){
	this.start = new THREE.Vector2(x, y);
	this.selected = this.draw.rect(x, y, 0, 0);
	this.selected.attr('fill', '#00FF00');
};

RectangleHandler.prototype.onMouseMove = function(x, y){
	if(this.selected)
	{
		var attrs = this.selected.attrs;
		this.selected.attr('width', Math.abs(x - this.start.x));
		this.selected.attr('height', Math.abs(y - this.start.y));
		this.selected.attr('x', x < this.start.x ? x : this.start.x);
		this.selected.attr('y', y < this.start.y ? y : this.start.y);
	}
};

RectangleHandler.prototype.onMouseUp = function(x, y) {
	if(this.selected){
		this.addSVG(this.selected);
		this.selected = null;		
	}
};

RectangleHandler.prototype.onDoubleClick = function(x, y) {};