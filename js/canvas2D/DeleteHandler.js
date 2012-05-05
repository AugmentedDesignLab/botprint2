/**
 * @author Zhongpeng Lin
 */
DeleteHandler.prototype = new HandlerBase();
DeleteHandler.prototype.constructor = DeleteHandler;

function DeleteHandler(canvas){
	HandlerBase.call(this, canvas);
	var shape = canvas.getCurrentShape();
	shape.mousedown(function(event){
		shape.remove();		
	});
	debugger;
}
