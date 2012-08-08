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
		elem: elem,
		draw: Raphael(options.elemID, width, height),
		shapeAttributes: {
				'stroke': '#F8F8F8',
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
					if(!self.chassis) {
						alert("You must sketch a chassis before start adding wheels.");
					} else {
						if(!self.addingWheelHandler)
							self.addingWheelHandler = AddingWheelHandler(self, {app:options.app});
						self.addingWheelHandler.enable();
						self.selectionHandler.disable();
					}
					
				} else {
					if(self.addingWheelHandler) {
						self.addingWheelHandler.disable();
					}
					if(self.selectionHandler) {
						self.selectionHandler.enable();						
					}
				}
			}
		},
		
		doneSketching: function(chassis) {
			this.chassis = chassis;
			// Automatically switch to SelectionHandler
			this.sketchingHandler.disable();
			var selectionHandler = SelectionHandler(this, {app:options.app});
			selectionHandler.enable();
			this.selectionHandler = selectionHandler;
			// adding the layout handler, so that the layout gets automatically generated
			// every time we sketch or update a chassis.
			this.layoutHandler = LayoutHandler(this, {app:options.app});
			this.layoutHandler.enable();
		},
		
		select: function() {},
		deselect: function() {},
		getColor: function() {
			// Force SidePanel to use default color when canvas is selected
			return null;
		}
	};
	
	$.extend(self, View());
	
	options.app.bind(ApplicationEvents.optionChanged, self.optionChanged);
	
	self = Sketchable(self);
	self.sketchingHandler = SketchingHandler(self, {app: options.app});
	self.sketchingHandler.enable();
	
	return self;
}