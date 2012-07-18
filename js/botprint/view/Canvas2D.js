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
	var self = {
		node: elem,
		draw: Raphael(options.elemID, width, height),
		shapeAttributes: {
				'stroke': '#F8F8F8 ',
				'stroke-opacity': 1,
				'stroke-width': 2,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round'
		},
		
		optionChanged: function(payload) {
			if(payload.color) {
				self.shapeAttributes.fill = payload.color;
			}
			
			if(payload.wheelsLocation != undefined) {
				if(payload.wheelsLocation) {
					if(!this.chassis) {
						alert("You must sketch a chassis before start adding wheels.");
					} else {
						if(!this.addingWheelHandler)
							this.addingWheelHandler = AddingWheelHandler(this, {bus:options.bus});
						this.addingWheelHandler.enable();
					}
					
				} else {
					if(this.addingWheelHandler) {
						this.addingWheelHandler.disable();
					}
				}
			}
		},
		
		select: function() {},
		deselect: function() {},
		getColor: function() {
			// Force SidePanel to use default color when canvas is selected
			return null;
		}
	};
	
	$.extend(self, View());
	
	options.bus.subscribe(Events.optionChanged, self.optionChanged, self);
	
	self = Sketchable(self);
	self.sketchingHandler = SketchingHandler(self, {bus: options.bus});
	self.sketchingHandler.enable();
	
	return self;
}