/**
 * @author Zhongpeng Lin
 * The 2D drawing area. DO NOT confuse this with HTML5 canvas element.
 * In fact, Canvas2D uses SVG under the hood, instead of HTML5 canvas
 * 2D context.
 */

function Canvas2D(options) {
	var elem = $('#'+options.elemID);
	var width = elem.width();
	var height = elem.height();
	var offset = {x:elem.offset().left, y:elem.offset().top};
	var self = {
		elem: elem,
		draw: Raphael(options.elemID, width, height),
		
		setHandler: function(handler) {
			if(self.handler)
			{
				self.handler.disable();
			}
			self.handler = handler;
			self.handler.enable();
		},
		
		translateX: function(x) {
			return x - offset.x;
		},
		
		translateY: function(y) {
			return y - offset.y;
		}
	};
	
	$.extend(self, View(options));
	return self;
}