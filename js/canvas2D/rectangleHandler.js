/**
 * @author Zhongpeng Lin
 */
var rectangleHandler = function(spec) {
	var handler = abstractDrawHandler(spec);
	
	handler.mousedown = function(x, y){
		this.start = new THREE.Vector2(x, y);
		var draw = this.canvas.draw;
		this.selected = draw.rect(x, y, 0, 0);
		this.selected.attr(this.options);
	};
	
	handler.mousemove = function(x, y){
		if(this.selected){
			var attrs = this.selected.attrs;
			this.selected.attr('width', Math.abs(x - this.start.x));
			this.selected.attr('height', Math.abs(y - this.start.y));
			this.selected.attr('x', x < this.start.x ? x : this.start.x);
			this.selected.attr('y', y < this.start.y ? y : this.start.y);
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
