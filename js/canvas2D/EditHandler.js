/**
 * @author Zhongpeng Lin
 */
EditHandler.prototype = new HandlerBase();
EditHandler.prototype.constructor = EditHandler;

function EditHandler(canvas){
	HandlerBase.call(this, canvas);
	
	$.each(canvas.svgs, function(index, svg){
		// Add dragging listener
		var tstr;
		svg.drag(function(dx, dy, x, y, event){
			// onMove
			svg.transform(tstr+'T'+dx+','+dy);
		}, function(x, y, event){
			// onStart
			tstr = svg.transform();
		});
	});
}
