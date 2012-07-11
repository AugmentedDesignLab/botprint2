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
		shapeAttributes: {
				'stroke': '#F8F8F8 ',
				'stroke-opacity': 1,
				'stroke-width': 2,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round'
		},
		
		setHandler: function(handler) {
			if(self.handler)
			{
				// self.handler.disable();
			}
			self.handler = handler;
			self.handler.enable();
		},
		
		optionChanged: function(payload) {
			if(payload.color) {
				self.shapeAttributes.fill = payload.color;
			}
			
			if(payload.sketching != undefined){
				var constructor;
				if(payload.sketching){
					constructor = SketchingHandler;
				} else {
					constructor = EditingHandler;
				}
				self.setHandler(constructor(this, {shapeAttributes: self.shapeAttributes, bus: options.bus}));				
			}
		},
		
		translateX: function(x) {
			return x - offset.x;
		},
		
		translateY: function(y) {
			return y - offset.y;
		}
	};
	
	$.extend(self, View(options));
	
	self.bind(Events.optionChanged, self.optionChanged);
	return self;
}