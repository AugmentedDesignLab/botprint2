function EditingHandler(view, options) {
	var vertices = [];
	
	var self = {
		enable: function() {
			if(!view.chassis) {
				alert("You must sketch a shape before start editing.");
				return;
			}
			var path = view.chassis.attrs.path;
			path.forEach(function(action, index){
				if(action.length == 3){
					var vertex = Vertex2D({x: action[1], y: action[2]}, view.chassis);
					var handlerOptions = {bus: view.bus, pathIndex: index};

					// making it draggable
					vertex = Draggable2D(vertex);
					self.trigger(Events.draggable, {vertex: vertex, handlerOptions: handlerOptions});

					// making it hoverable
					vertex = Hoverable2D(vertex);
					self.trigger(Events.hoverable, {vertex: vertex, handlerOptions: handlerOptions});
					
					vertices.push(vertex);
					
					
				}
			});
		},
		
		disable: function() {
			while(vertices.length > 0){
				var vertex = vertices.pop();
				vertex.remove();
			}
		}
	};

	$.extend(self, Bindable(view.bus));
	HandlerMaker(self).makeAll();
	return self;
}
