function EditingHandler(view, options) {
	var controlPoints = [];
	
	var self = {
		enable: function() {
			if(!view.chassis) {
				alert("You must sketch a shape before start editing.");
				return;
			}
			var draw = view.draw;
			var path = view.chassis.attrs.path;
			path.forEach(function(action, index){
				if(action.length == 3){
					// draw a circle for each point along the path
					var circle = draw.circle(action[1], action[2], 4);
					/* extend circle with View mixin, using its own event bus
					 * making it self a separate channel so that different
					 * circles don't interfere with each other 
					 */
					$.extend(circle, View());
					// initialize the circle
					circle.attr({fill: 'white', stroke: 'black'});
					circle.path_index = index;
					circle.chassis = view.chassis;
					// refire the events
					circle.drag(function(dx, dy, x, y, event){
						circle.trigger(Events.dragMove, {dx: dx, dy: dy, x: x, y: y, event: event});
					}, function(x, y, event){
						circle.trigger(Events.dragStart, {x: x, y: y, event: event});
					}, function(){
						circle.trigger(Events.dragEnd, {event: event});
					});
					
					circle.hover(function(){
						circle.trigger(Events.mouseOver);
					}, function(){
						circle.trigger(Events.mouseOut);
					});
					
					circle.click(function(event) {
						circle.trigger(Events.click, {event: event});
					});
					controlPoints.push(circle);
					/* create a handler for this circle,
					 * using a shared event bus so that it can
					 * notify other parts of the system
					 */
					var handler = VertexHandler(circle, {bus: view.bus});
					handler.enable();
					circle.handler = handler;
				}
			});
		},
		
		disable: function() {
			while(controlPoints.length > 0)
			{
				var point = controlPoints.pop();
				point.handler.disable();
				point.remove();
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
