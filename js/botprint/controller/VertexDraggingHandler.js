/**
 * @author Zhongpeng Lin
 *
 */

// TODO need to figure out a way to extend this from DraggingHandler
function VertexDraggingHandler(view, options) {
	var deviationX, deviationY;
	
	var self = {
		enable: function() {
			var events = ['dragStart', 'dragMove', 'dragEnd'];
			events.forEach(function(ev){
			    view.bind(Events[ev], self[ev]);		
			});
		},
		
		disable: function() {
			// TODO waiting for a way to unbind event handlers from EventBus
		},
		
		dragStart: function(payload) {
			payload.event.stopPropagation();
			// remember the deviation from the center of view
			deviationX = view.getPosition().x - payload.x;
			deviationY = view.getPosition().y - payload.y;
		},
		
		dragMove: function(payload) {
			payload.event.stopPropagation();
			
			/* calculate the new coordinates from the
			 * current mouse position and deviation from
			 * circle center
			 */ 
			var newX = payload.x + deviationX, newY = payload.y + deviationY;
			// move the circle
			view.setPosition(newX, newY);
			// modify the chassis shape
			var path = view.chassis.attrs.path;
			path[view.path_index][1] = newX;
			path[view.path_index][2] = newY;
			view.chassis.attr({path: path});
				
		},
		
		dragEnd: function(payload) {
			payload.event.stopPropagation();
			self.trigger(Events.chassisShapeUpdated, {shape: view.chassis});
		}
		
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
