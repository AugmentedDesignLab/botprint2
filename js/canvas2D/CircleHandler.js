CircleHandler.prototype = new DrawHandlerBase();
CircleHandler.prototype.constructor = CircleHandler;

function CircleHandler(canvas, options) {
	DrawHandlerBase.call(this, canvas);
	this.draw 		= canvas.draw;
	this._options 	= options;

	this.end        = {
		w: 5
	};
}

CircleHandler.prototype.onMouseDown = function(x, y){
	this.start = {
		_x: x,
		_y: y,
		_w: this.end.w
	};

	this.selected = this.draw.circle(
		this.start._x,
		this.start._y,
		this.start._w
	);
	this.selected.attr(this._options);
//	this.selected.attr('fill', '#00FF00');
};

CircleHandler.prototype.onMouseMove = function(x, y){
	if(this.selected){
		var v = {
			x: Math.abs(x - this.start._x),
			y: Math.abs(y - this.start._y)
		};

		//Radius
		this.end.w = Math.sqrt((Math.pow(v.x, 2) + Math.pow(v.y, 2)));
		this.redraw();
	}
};

CircleHandler.prototype.onMouseUp = function(x, y) {
	if(this.selected){
		this.current = this.selected;
		this.selected = null;
	}
};

CircleHandler.prototype.redraw = function(){
	if(this.selected){
		this.selected.attr({r: this.end.w});
	}
};

CircleHandler.prototype.onDoubleClick = function(x, y) {};