/**
 * @author Zhongpeng Lin
 */

function Canvas2D(elemID) {
	this.elem = $('#'+elemID);
	var width = this.elem.width();
	var height = this.elem.height();
	this.draw = Raphael(elemID, width, height);
	var pos = this.elem.offset();
	this.offset = [pos.left, pos.top];
	
    
    this.width = width;
    this.height = height;
    
    this.svgs = [];
    
	// set default handler
	this.setHandler(EllipseHandler);
}

Canvas2D.prototype.setHandler = function(handlerClass) {
    this.handler = new handlerClass(this);
};

Canvas2D.prototype.translateX = function(x) {
	return x - this.offset[0];
};

Canvas2D.prototype.translateY = function(y) {
	return y - this.offset[1];
};
