/**
 * @author Zhongpeng Lin
 */
function AddingWheelHandler(view, options) {
	var wheelDef = {
		width: 30,
		height: 60,
		radius: 5,
	};
	
	var self = {
		userEvents: ['click'],

		enable: function() {
			var thisHandler = this;
			thisHandler.userEvents.forEach(function(ev){
			    view.bind(Events[ev], thisHandler[ev]);
			});			
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.userEvents.forEach(function(ev){
			    view.unbind(Events[ev], thisHandler[ev]);
			});			
		},

		click: function(payload) {
			var x = OffsetEvent(payload.event).offsetX;
			var y = OffsetEvent(payload.event).offsetY;
			var svg = view.draw.rect(x - wheelDef.width/2, y - wheelDef.height/2,
				wheelDef.width, wheelDef.height, wheelDef.radius);
			svg.attr(view.shapeAttributes);

			var wheel = Wheel2D(svg);
			var handlerOptions = {bus: options.bus};
			// making it draggable
			wheel = Draggable2D(wheel);
			var dragging = DraggingHandler(wheel, handlerOptions);
			dragging.enable();
			// makeing it selectable
			var selection = SelectionHandler(wheel, handlerOptions);
			selection.enable();
		}
	};

	Mixable(self).mix(EventHandler(view, options));
	return self;
}
