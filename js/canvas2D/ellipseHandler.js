/**
 * @author Zhongpeng Lin
 */
var ellipseHandler = function(spec) {
	var handler = spec;
	
	handler.mousedown = function(x, y){
		var draw = this.canvas.draw;
		this.selected = draw.ellipse(x, y, 0, 0);
		this.selected.attr(spec.options);
		//FIXME use options
	};
	
	handler.mousemove = function(x, y){
		if(this.selected)
		{
			var attrs = this.selected.attrs;
			this.selected.attr('rx', Math.abs(x - attrs.cx));
			this.selected.attr('ry', Math.abs(y - attrs.cy));
		}
	};
	
	handler.mouseup = function(x, y) {
		if(this.selected){
			this.canvas.addSVG(this.selected);
			this.selected = null;
		}
	};
	
	return handler;
};
