/**
 * @author Zhongpeng Lin
 */
EditHandler.prototype = new HandlerBase();
EditHandler.prototype.constructor = EditHandler;

function EditHandler(canvas, options){
	HandlerBase.call(this, canvas);
	
	$.each(canvas.svgs, function(index, svg){
		// Add rotator
		if(!svg.rotator){
			new Rotator(svg);
		}
		svg.rotator.enable();

		// Add dragging listener
		var tstr, ox, oy;
		svg.drag(function(dx, dy, x, y, event){
			/* onMove
			 * Transformation will not change the x and y
			 * of shapes, but change the cordinate systems.
			 * There is no uniform way to change the cordinates
			 * of shapes in Raphael, at least as far as I am
			 * aware of. Although transformation provides an
			 * uniform way of moving shapes, when these shapes
			 * are being extruded, they need to be transformed
			 * as well.
			*/
			svg.transform(tstr+'T'+dx+','+dy);
			
			// Rotator (circle) can be easily moved
			svg.rotator.setX(ox + dx);
			svg.rotator.setY(oy + dy);
		}, function(x, y, event){
			// onStart
			tstr = svg.transform();
			ox = svg.rotator.getX();
			oy = svg.rotator.getY();
		});
	});
	
	
}
