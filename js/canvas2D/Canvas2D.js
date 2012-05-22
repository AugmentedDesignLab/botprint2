/**
 * @author Zhongpeng Lin
 * The 2D drawing area. DO NOT confuse this with HTML5 canvas element.
 * In fact, Canvas2D uses SVG under the hood, instead of HTML5 canvas
 * 2D context.
 */

function Canvas2D(elemID) {
	this.elem = $('#'+elemID);
	this.width = this.elem.width();
	this.height = this.elem.height();
	this.draw = Raphael(elemID, this.width, this.height);
	var pos = this.elem.offset();
	this.offset = [pos.left, pos.top];
    this.svgs = [];
}

Canvas2D.prototype.setHandler = function(handler) {
	if(this.handler)
	{
		this.handler.disable();
	}
	this.handler = handler;
	this.handler.enable();
};

Canvas2D.prototype.addSVG = function(svg) {
	if(!svg.__proto__.unbindAll){
		svg.__proto__.unbindAll = function(){
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
	}
	this.svgs.push(svg);
};

Canvas2D.prototype.translateX = function(x) {
	return x - this.offset[0];
};

Canvas2D.prototype.translateY = function(y) {
	return y - this.offset[1];
};
