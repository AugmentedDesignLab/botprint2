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
	
	this.setHandler(PolygonHandler);
    
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
	var handler = new handlerClass(this.draw, this._options);
	var self = this;
	// unbind all event handlers
	this.elem.unbind();
	
	// bind new event handlers
	this.elem.mousedown(function(event){
      event.preventDefault();
      handler.onMouseDown(self.translateX(event.clientX), self.translateY(event.clientY));
    });

	this.elem.mousemove(function(event){
      event.preventDefault();
      handler.onMouseMove(self.translateX(event.clientX), self.translateY(event.clientY));
    });

	this.elem.mouseup(function(event){
      event.preventDefault();
      handler.onMouseUp(self.translateX(event.clientX), self.translateY(event.clientY));
    });
    
    this.elem.dblclick(function(event){
      event.preventDefault();
      handler.onDoubleClick(self.translateX(event.clientX), self.translateY(event.clientY));    	
    });
    
    this.handler = handler;
};


Canvas2D.prototype.getCurrentShape = function() {
	return this.handler.current;
};

Canvas2D.prototype.translateX = function(x) {
	return x - this.offset[0];
};

Canvas2D.prototype.translateY = function(y) {
	return y - this.offset[1];
};
