/**
 * @author Zhongpeng Lin
 *
 */

// FIXME need a better name for this class
function DraggingHandler(view, options) {
	var deviationX, deviationY;
	
	var self = {
		enable: function() {
			var events = ['dragStart', 'dragMove', 'dragEnd', 'mouseOver', 'mouseOut', 'click'];
			events.forEach(function(ev){
			    view.bind(Events[ev], self[ev]);		
			});
		},
		
		disable: function() {
			view = null;
			// TODO waiting for a way to unbind event handlers from EventBus
		},
		
		dragStart: function(payload) {
			payload.event.stopPropagation();
			// remember the deviation from the center of view
			deviationX = view.attrs.cx - payload.x;
			deviationY = view.attrs.cy - payload.y;
		},
		
		dragMove: function(payload) {
			payload.event.stopPropagation();
			
			/* calculate the new coordinates from the
			 * current mouse position and deviation from
			 * circle center
			 */ 
			var newX = payload.x + deviationX, newY = payload.y + deviationY;
			// move the circle
			view.attr({cx: newX, cy: newY});
			// modify the chassis shape
			var path = view.chassis.attrs.path;
			path[view.path_index][1] = newX;
			path[view.path_index][2] = newY;
			view.chassis.attr({path: path});
				
		},
		
		dragEnd: function(payload) {
			payload.event.stopPropagation();
			self.trigger(Events.chassisShapeUpdated, {shape: view.chassis});
		},
		
		mouseOver: function(payload) {
			view.attr({r: 6});
		},
		
		mouseOut: function(payload) {
			view.attr({r: 4});
		},
		
		click: function(payload) {
			// Prevent Canvas2D from handling the event
			payload.event.stopPropagation();
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
