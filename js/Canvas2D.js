/**
 * @author Zhongpeng Lin
 */

function Canvas2D(elem, width, height) {
	this.draw = Raphael(elem, width, height);
	var pos = jQuery('#'+elem).offset();
	this.offset = [pos.left, pos.top];
	var self = this;
	$('#'+elem).mousedown(function(event){
      event.preventDefault();
      self.onMouseDown(self.translateX(event.clientX), self.translateY(event.clientY));
    });

	$('#'+elem).mousemove(function(event){
      event.preventDefault();
      self.onMouseMove(self.translateX(event.clientX), self.translateY(event.clientY));
    });

	$('#'+elem).mouseup(function(event){
      event.preventDefault();
      self.onMouseUp(self.translateX(event.clientX), self.translateY(event.clientY));
    });
  }

Canvas2D.prototype.onMouseDown = function(x, y){
	this.selected = this.draw.path('M '+x+' '+y);
};

Canvas2D.prototype.onMouseMove = function(x, y){
	if(this.selected){
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +' L ' + x + ' ' + y);
	}
};

Canvas2D.prototype.onMouseUp = function(x, y){
	if(this.selected){
		var path = this.selected.attrs.path;
		this.selected.attr('path', path +' Z');
		this.selected = null;
	}
};

Canvas2D.prototype.translateX = function(x) {
	return x - this.offset[0];
};

Canvas2D.prototype.translateY = function(y) {
	return y - this.offset[1];
};
