/**
 * @author Zhongpeng Lin
 */
function DeleteHandler(canvas, options){
	$.each(canvas.svgs, function(index, svg){
		svg.mousedown(function(event){
			svg.attr('fill', '#0000FF');
			if(confirm('Are you sure you want to delete this shape?'))
			{
				var index = canvas.svgs.indexOf(svg);
				canvas.svgs.splice(index, 1);
				svg.remove();
			}
			else
				svg.attr('fill', '#00FF00');
		});
	});
}
