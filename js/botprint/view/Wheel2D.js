/**
 * 2D representation of a wheel
 * 
 * @author Zhongpeng Lin
 */
function Wheel2D(svg, options) {
	
	var self = {
		getPosition: function() {
			return {x: svg.attrs.x, y: svg.attrs.y};
		},
		
		setPosition: function(x, y) {
			svg.attr({x: x, y: y});
		},
		
		highlight: function() {
			svg.attr({stroke: '#F8F8F8'});			
		},
		
		lowlight: function() {
			svg.attr({stroke: null});
		}
	};
	
	// handling events of svg by triggering events defined by us
	svg.drag(function(dx, dy, x, y, event){
		self.trigger(Events.dragMove, {dx: dx, dy: dy, x: x, y: y, event: event});
	}, function(x, y, event){
		self.trigger(Events.dragStart, {x: x, y: y, event: event});
	}, function(){
		self.trigger(Events.dragEnd, {event: event});
	});
	
	svg.hover(function(){
		self.trigger(Events.mouseOver);
	}, function(){
		self.trigger(Events.mouseOut);
	});
	
	svg.click(function(event) {
		self.trigger(Events.click, {event: event});
	});

	
	$.extend(self, View(options));
	return self;
}
