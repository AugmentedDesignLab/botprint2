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
			var events = value.events;
			if(events)
			{
				var ev = events.pop();
				while(ev){
					ev.unbind();
					ev = events.pop();
				}
			}
		});
		// $.each(elem.children(), function(index, value){
			// if(value instanceof SVGSVGElement){
				// value.unbind();
			// }
		// });
	}
}


HandlerBase.prototype.addSVG = function(svg) {

	
	var draw = this.canvas.draw;
	
	// var box = svg.getBBox();
	// draw.rect(box.x, box.y, box.width, box, height);
	this.canvas.svgs.push(svg);
};
