/**
 * 2D representation of a wheel
 * 
 * @author Zhongpeng Lin
 */
function Wheel2D(svg, options) {
	var self = {
		elem: svg,
		id: new Date().getTime(),
		handlers: [],
		
        // position of a wheel is the position of its center
		get position() {
			return {x: svg.attrs.x + svg.attrs.width * .5,
                            y: svg.attrs.y + svg.attrs.height * .5};
		},
		
		set position(pos) {
			svg.attr({x: pos.x - svg.attrs.width * .5,
					 y: pos.y - svg.attrs.height * .5});
			if(this.removeButton) {
				this.removeButton.targetPosition = pos;
			}
		},
		
		highlight: function() {
			svg.attr({stroke: '#00FFFF'});	
		},
		
		lowlight: function() {
			svg.attr({stroke: null});
		},
		
		set color(c) {
			svg.attr({fill: c});
		},
		
		get color(){
			return svg.attrs.fill;
		},
		
		select: function() {
			svg.attr({stroke: '#00FFFF'});	
			this.selected = true;
			this.removeButton = RemoveButton(this, options);
		},
		
		deselect: function() {
			svg.attr({stroke: null});
			this.selected = false;
			if(this.removeButton) {
				this.removeButton.remove();
			}
		}
	};
	
	$.extend(self, View());
	// making it draggable
	self = Draggable2D(self);
	var dragging = WheelDraggingHandler(self, options);
	dragging.enable();
	self.handlers.push(dragging);
	// makeing it selectable
	var selection = SelectionHandler(self, options);
	selection.enable();
	self.handlers.push(selection);
	// Automatically 'click' it to make it selected
	self.trigger(UserEvents.click);
	// making it removable
	self = Removable2D(self);
	
	var errorHandler = WheelValidationHandler(self, options);
	errorHandler.enable();
	self.handlers.push(errorHandler);
	
	return self;
}
