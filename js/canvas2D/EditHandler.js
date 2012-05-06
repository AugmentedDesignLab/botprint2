/**
 * @author Zhongpeng Lin
 */
EditHandler.prototype = new HandlerBase();
EditHandler.prototype.constructor = EditHandler;

function EditHandler(canvas){
	HandlerBase.call(this, canvas);
}
