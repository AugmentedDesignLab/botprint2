function EditingHandler(view, options) {
	var controlPoints = [];
	
	var self = {
		enable: function() {
			var draw = view.draw;
			var path = view.chassis.attrs.path;
			path.forEach(function(action, index){
				if(action.length == 3){
					// draw a circle for each point along the path
					var circle = draw.circle(action[1], action[2], 4);
					// initialize the circle
					$.extend(circle, View({bus: view.bus()}));
					circle.attr({fill: 'blue'});
					circle.path_index = index;
					circle.chassis = view.chassis;
					// handle the events
					var startX, startY;
					circle.drag(function(dx, dy, x, y, event){
						self.trigger(Events.DRAG_MOVE, {dx: dx, dy: dy, target: circle});
					}, function(x, y, event){
						self.trigger(Events.DRAG_START, {target: circle});
					}, function(){
						self.trigger(Events.DRAG_END, {target:circle});
					});
					
					circle.hover(function(){
						self.trigger(Events.MOUSEOVER,{target: circle});
					}, function(){
						self.trigger(Events.MOUSEOUT, {target: circle});
					});
					controlPoints.push(circle);
					// create a handler for this circle
					var handler = DraggingHandler(circle);
					handler.bind(Events.DRAG_START, handler.drag_start);
					handler.bind(Events.DRAG_MOVE, handler.drag_move);
					handler.bind(Events.DRAG_END, handler.drag_end);
					handler.bind(Events.MOUSEOVER, handler.mouseover);
					handler.bind(Events.MOUSEOUT, handler.mouseout);
				}
			});
		},
		
		disable: function() {
			while(controlPoints.length > 0)
			{
				var point = controlPoints.pop();
				point.remove();
				// TODO unbind handlers from EventBus
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
