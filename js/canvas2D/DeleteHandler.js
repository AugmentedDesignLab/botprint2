/**
 * @author Zhongpeng Lin
 */
DeleteHandler.prototype = new HandlerBase();
DeleteHandler.prototype.constructor = DeleteHandler;

function DeleteHandler(canvas){
	HandlerBase.call(this, canvas);
	$.each(canvas.svgs, function(index, svg){
		svg.mousedown(function(event){
			svg.attr('fill', '#0000FF');
			if(confirm('Are you sure you want to delete this shape?'))
				svg.remove();
			else
				svg.attr('fill', '#00FF00');
		});
	});
}
