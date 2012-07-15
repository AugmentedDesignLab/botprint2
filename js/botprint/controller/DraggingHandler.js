function DraggingHandler(view, options) {
	var dragStartX, dragStartY;
	
	var self = {
		events: ['dragStart', 'dragMove', 'dragEnd'],

		dragStart: function(payload) {
			payload.event.stopPropagation();
			// remember the deviation from the initial position of view
			dragStartX = view.getPosition().x - payload.x;
			dragStartY = view.getPosition().y - payload.y;
		},
		
		dragMove: function(payload) {
			payload.event.stopPropagation();
			/* calculate the new coordinates from the
			 * current mouse position and initial deviation
			 */ 
			var newX = payload.x + dragStartX, newY = payload.y + dragStartY;
			// move the circle
			view.setPosition(newX, newY);
		},

		dragEnd: function(payload) {
			payload.event.stopPropagation();
		}
		
		
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
