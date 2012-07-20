/**
 * 2D representation of a wheel
 * 
 * @author Zhongpeng Lin
 */
function Wheel2D(svg, options) {
	
	var self = {
		elem: svg,
		id: new Date().getTime(),
		
		getPosition: function() {
			return {x: svg.attrs.x, y: svg.attrs.y};
		},
		
		setPosition: function(x, y) {
			svg.attr({x: x, y: y});
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
		},
		
		deselect: function() {
			svg.attr({stroke: null});
			this.selected = false;
		}
	};
	
	$.extend(self, View());
	// making it draggable
	self = Draggable2D(self);
	var dragging = WheelDraggingHandler(self, options);
	dragging.enable();
	// makeing it selectable
	var selection = SelectionHandler(self, options);
	selection.enable();
	// 'click' it to make it selected
	self.trigger(UserEvents.click);
	return self;
}
