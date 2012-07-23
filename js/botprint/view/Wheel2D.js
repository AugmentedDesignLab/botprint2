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
		
		getPosition: function() {
			return {x: svg.attrs.x, y: svg.attrs.y};
		},
		
		setPosition: function(x, y) {
			svg.attr({x: x, y: y});
			if(this.removeButton) {
				this.removeButton.setPosition(x, y);
			}
		},
		
		highlight: function() {
			svg.attr({stroke: '#00FFFF'});	
		},
		
		lowlight: function() {
			svg.attr({stroke: null});
		},

		setColor: function(color) {
			svg.attr({fill: color});
		},
		
		getColor: function() {
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
		
	return self;
}
