/**
 * @author Zhongpeng Lin
 *
 */

// FIXME need a better name for this class
function DraggingHandler(view, options) {
	var dragStartX, dragStartY;
	
	var self = {
		enable: function() {
			self.bindAll(['dragStart', 'dragMove', 'dragEnd', 'mouseOver', 'mouseOut']);			
		},
		
		disable: function() {
			view = null;
			// TODO waiting for a way to unbind event handlers from EventBus
		},
		
		dragStart: function(payload) {
			if(self.proceed(payload)){
				// remember the starting coordinates
				dragStartX = view.attrs.cx;
				dragStartY = view.attrs.cy;
			}
		},
		
		dragMove: function(payload) {
			if(self.proceed(payload)){
				/* calculate the new coordinates from the
				 * starting coordinates and the offset
				 */ 
				var newX = dragStartX+payload.dx, newY = dragStartY+payload.dy;
				// move the circle
				view.attr({cx: newX, cy: newY});
				// modify the chassis shape
				var path = view.chassis.attrs.path;
				path[view.path_index][1] = newX;
				path[view.path_index][2] = newY;
				view.chassis.attr({path: path});
				
			}
		},
		
		dragEnd: function(payload) {
			if(self.proceed(payload)){
				self.trigger(Events.chassisShapeUpdated, {shape: view.chassis});
			}
		},
		
		mouseOver: function(payload) {
			if(self.proceed(payload)){
				view.attr({r: 6});
			}
		},
		
		mouseOut: function(payload) {
			if(self.proceed(payload)){
				view.attr({r: 4});
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
