/**
 * @author Zhongpeng Lin
 */
var circleHandler = function(spec) {
	var handler = abstractDrawHandler(spec);
	handler.end = {
		w: 5
	};
	
	handler.mousedown = function(x, y){
		this.start = {
			_x: x,
			_y: y,
			_w: this.end.w
		};
	
		var draw = this.canvas.draw;
		this.selected = draw.circle(
			this.start._x,
			this.start._y,
			this.start._w
		);
		this.selected.attr(this.options);
	//	this.selected.attr('fill', '#00FF00');
	};
	
	handler.mousemove = function(x, y){
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
	
	handler.mouseup = function(x, y) {
		if(this.selected){
			// add this.selected to the canvas.svgs list
			this.canvas.addSVG(this.selected);
			this.selected = null;
		}
	};
	
	handler.redraw = function(){
		if(this.selected){
			this.selected.attr({r: this.end.w});
		}
	};

	return handler;
};
