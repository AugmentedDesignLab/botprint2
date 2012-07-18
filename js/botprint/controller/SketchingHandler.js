/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(view, options) {
	
	var self = {
		userEvents: ['click', 'mouseMove', 'dblClick'],
		
		click: function(payload) {
			var event = payload.event;
			var x = OffsetEvent(event).offsetX;
			var y = OffsetEvent(event).offsetY;

			if(this.shape){
				// Extend the path
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +' L ' + x + ' ' + y);
			}else{
				if(view.chassis)
					view.chassis.remove();
				// Create a new path
				var draw = view.draw;
				this.shape = draw.path('M '+x+' '+y+' L ' + x + ' ' + y);
				this.shape.attr(view.shapeAttributes);
			}
		},
		
		mouseMove: function(payload) {
			var event = payload.event;
			var x = OffsetEvent(event).offsetX;
			var y = OffsetEvent(event).offsetY;

			if(this.shape){
				// Modify the last path element
				var path = this.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = x;
				last[2] = y;
				this.shape.attr('path', path);
			}
		},
		
		dblClick: function(payload){
			if(this.shape){
				var path = this.shape.attrs.path;
				/* click event handler is called twice
				 * before this. Two pop operations from path
				 * are to offset the effect of two click events
				 */ 
				path.pop();
				path.pop();
				this.shape.attr('path', path +'Z');
				view.chassis = this.shape;
				// Automatically switch to SelectionHandler
				self.disable();
				var selectionHandler = SelectionHandler(view, {bus:options.bus});
				selectionHandler.enable();
				view.selectionHandler = selectionHandler;
				
				var chassis2D = Chassis2D(this.shape, {bus:options.bus});
				
				self.trigger(Events.chassisShapeUpdated, {shape: this.shape});
				this.shape = null;
			}
		}
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
