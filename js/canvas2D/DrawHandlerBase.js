/**
 * @author Zhongpeng Lin
 */
function DrawHandlerBase(canvas) {
	if(canvas){
		var elem = canvas.elem;
		// unbind all event handlers
		elem.unbind();
		// bind new event handlers
		var self = this;
		elem.mousedown(function(event){
	      event.preventDefault();
	      self.onMouseDown(canvas.translateX(event.clientX), canvas.translateY(event.clientY));
	    });
	
		elem.mousemove(function(event){
	      event.preventDefault();
	      self.onMouseMove(canvas.translateX(event.clientX), canvas.translateY(event.clientY));
	    });
	
		elem.mouseup(function(event){
	      event.preventDefault();
	      self.onMouseUp(canvas.translateX(event.clientX), canvas.translateY(event.clientY));
	    });
	    
	    elem.dblclick(function(event){
	      event.preventDefault();
	      self.onDoubleClick(canvas.translateX(event.clientX), canvas.translateY(event.clientY));    	
	    });		
	}

}

DrawHandlerBase.prototype.onMouseDown = function(x, y){};
DrawHandlerBase.prototype.onMouseMove = function(x, y){};
DrawHandlerBase.prototype.onMouseUp = function(x, y){};
DrawHandlerBase.prototype.onDoubleClick = function(x, y){};