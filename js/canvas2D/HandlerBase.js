/**
 * @author Zhongpeng Lin
 */
function HandlerBase(canvas) {
	if(canvas) {
		this.canvas = canvas;
		var elem = canvas.elem;
		// unbind all event handlers
		elem.unbind();
		// $.each(elem.children(), function(index, value){
			// if(value instanceof SVGSVGElement){
				// value.unbind();
			// }
		// });
	}
}


HandlerBase.prototype.addSVG = function(svg) {
	// Add dragging listener
	var ox, oy;
	svg.drag(function(dx, dy, x, y, event){
		// onMove
		svg.translate(dx - ox, dy - oy);
		ox = dx;
		oy = dy;
	}, function(x, y, event){
		// onStart
		ox = 0;
		oy = 0;
	});
	
	var draw = this.canvas.draw;
	
	// var box = svg.getBBox();
	// draw.rect(box.x, box.y, box.width, box, height);
	this.canvas.svgs.push(svg);
};
