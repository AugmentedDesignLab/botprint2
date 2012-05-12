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
	this._options = {
		stroke: "#F8F8F8 ",
		"stroke-opacity": 1,
		fill: "#00FF00",
		"stroke-width": 2,
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	};
    this.svgs = [];
}

Canvas2D.prototype.setOptions = function(options) {
	if(options === undefined){
		return false;
	} else {
		this._options = options;
		return true;
	}
};

Canvas2D.prototype.setHandler = function(handlerClass) {
    this.handler = new handlerClass(this, this._options);
};

Canvas2D.prototype.translateX = function(x) {
	return x - this.offset[0];
};

Canvas2D.prototype.translateY = function(y) {
	return y - this.offset[1];
};
