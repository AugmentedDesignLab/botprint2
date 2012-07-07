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
					// initialize the circle
					$.extend(circle, View({bus: view.bus()}));
					circle.attr({fill: 'blue'});
					circle.path_index = index;
					circle.chassis = view.chassis;
					// refire the events
					var startX, startY;
					circle.drag(function(dx, dy, x, y, event){
						self.trigger(Events.dragMove, {dx: dx, dy: dy, target: circle});
					}, function(x, y, event){
						self.trigger(Events.dragStart, {target: circle});
					}, function(){
						self.trigger(Events.dragEnd, {target:circle});
					});
					
					circle.hover(function(){
						self.trigger(Events.mouseOver,{target: circle});
					}, function(){
						self.trigger(Events.mouseOut, {target: circle});
					});
					controlPoints.push(circle);
					// create a handler for this circle
					var handler = DraggingHandler(circle);
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
