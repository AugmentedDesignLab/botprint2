/**
 * @author Zhongpeng Lin
 */
function freeShapeHandler(spec) {
	var handler = sketchingHandler(spec);
	
	handler.mousedown = function(x, y){
		var draw = this.canvas.draw;
		this.selected = draw.path('M '+x+','+y);
		this.selected.attr(this.shapeAttributes);
	};

	handler.mousemove = function(x, y){
		if(this.selected){
			var path = this.selected.attrs.path;
			this.selected.attr('path', path +'L' + x + ',' + y);
		}
	};
	
	handler.mouseup = function(x, y){
		if(this.selected){
			var path = this.selected.attrs.path;
			this.selected.attr('path', path +'Z');
			
			this.canvas.addSVG(this.selected);
			this.selected = null;
		}
	};
	
	return handler;
};
