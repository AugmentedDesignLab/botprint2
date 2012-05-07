/**
 * @author Zhongpeng Lin
 */
function HandlerBase(canvas) {
	if(canvas) {
		this.canvas = canvas;
		var elem = canvas.elem;
		// unbind all event handlers
		elem.unbind();
		$.each(canvas.svgs, function(index, value){
			var rotator = value.rotator;
			if(rotator)
				rotator.disable();
			unbindAll(value);
		});
	}
}


HandlerBase.prototype.addSVG = function(svg) {

	
	var draw = this.canvas.draw;
	
	// var box = svg.getBBox();
	// draw.rect(box.x, box.y, box.width, box, height);
	this.canvas.svgs.push(svg);
};
