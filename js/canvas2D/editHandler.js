/**
 * @author Zhongpeng Lin
 */
var editHandler = function(spec) {
	var handler = spec;
	
	handler.enable = function() {
		$.each(handler.canvas.svgs, function(index, svg){
			// Add rotator
			if(!svg.rotator){
				svg.rotator = rotator(svg);
			}
			svg.rotator.enable();
		
			if(!svg.remover){
				svg.remover = remover(svg, handler.canvas);
			}
			svg.remover.enable();
		
			// Add dragging listener
			var svgStr, orignalCoordinatesForRotator, removerStr;
			
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
				svg.transform(svgStr+'T'+dx+','+dy);
				// Rotator (circle) can be easily moved
				svg.rotator.setCoordinates({x: orignalCoordinatesForRotator.x + dx, y: orignalCoordinatesForRotator.y + dy});
				
				svg.remover.transform(removerStr+'T'+dx+','+dy);
			}, function(x, y, event){
				// onStart
				svgStr = svg.transform();
				orignalCoordinatesForRotator = svg.rotator.getCoordinates();
				removerStr = svg.remover.getTransformStr();
			});
		});
			
	};
	
	handler.disable = function() {
		$.each(handler.canvas.svgs, function(index, svg){
			svg.rotator.disable();
			svg.remover.disable();
			svg.unbindAll();
		});
	};
	return handler;
};
