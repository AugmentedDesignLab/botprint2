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
	this.disableHandlers();
    this.handler = new handlerClass(this, this._options);
};

/*
 * Disable all current handlers
 */
Canvas2D.prototype.disableHandlers = function() {
	this.elem.unbind();
	$.each(this.svgs, function(index, svg){
		var rotator = svg.rotator;
		if(rotator)
			rotator.disable();
		svg.unbindAll();
	});
	
};

Canvas2D.prototype.addSVG = function(svg) {
	svg.unbindAll = function(){
		// Add this function to svg so that it can be called to unbind events later
		var events = this.events;
		if(events)
		{
			var ev = events.pop();
			while(ev){
				ev.unbind();
				ev = events.pop();
			}
		}
	};
	this.svgs.push(svg);
};

Canvas2D.prototype.translateX = function(x) {
	return x - this.offset[0];
};

Canvas2D.prototype.translateY = function(y) {
	return y - this.offset[1];
};
