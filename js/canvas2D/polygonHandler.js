/**
 * @author Zhongpeng Lin
 */

var polygonHandler = function(spec) {
	var handler = spec;
	
	handler.mousedown = function(x, y) {
		if(this.selected){
			// Extend the path
			var path = this.selected.attrs.path;
			this.selected.attr('path', path +' L ' + x + ' ' + y);
		}else{
			// Create a new path
			var draw = this.canvas.draw;
			this.selected = draw.path('M '+x+' '+y + ' L ' + x + ' ' + y);
			this.selected.attr(this.options);
			//this.selected.attr('fill', '#00FF00');
		}
	};

	handler.mousemove = function(x, y) {
		if(this.selected){
			// Modify the last path element
			var path = this.selected.attrs.path;
			var last = path[path.length - 1];
			last[1] = x;
			last[2] = y;
			this.selected.attr('path', path);
		}
	};
	
	handler.dblclick = function(x, y){
		if(this.selected){
			var path = this.selected.attrs.path;
			this.selected.attr('path', path +'Z');
			this.canvas.addSVG(this.selected);
			this.selected = null;
		}
	};
	
	return handler;
};
