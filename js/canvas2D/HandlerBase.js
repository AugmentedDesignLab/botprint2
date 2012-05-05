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
	this.canvas.svgs.push(svg);
};
