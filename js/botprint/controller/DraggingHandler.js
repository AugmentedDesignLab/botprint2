function DraggingHandler(view, options) {
	var dragStartX, dragStartY;
	
	var self = {
		userEvents: ['dragStart', 'dragMove', 'dragEnd'],

		dragStart: function(payload) {
			payload.event.stopPropagation();
			// remember the deviation from the initial position of view
			dragStartX = view.position.x - payload.x;
			dragStartY = view.position.y - payload.y;
		},
		
		dragMove: function(payload) {
			payload.event.stopPropagation();
			/* calculate the new coordinates from the
			 * current mouse position and initial deviation
			 */ 
			var newX = payload.x + dragStartX, newY = payload.y + dragStartY;
			// move the circle
			view.position = {x: newX, y: newY};
		},

		dragEnd: function(payload) {
			payload.event.stopPropagation();
		}
		
		
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
