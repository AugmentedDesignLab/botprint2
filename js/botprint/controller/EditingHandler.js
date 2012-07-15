function EditingHandler(view, options) {
	var vertices = [];
	
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
					var vertex = Vertex2D({x: action[1], y: action[2]}, view.chassis);
					var handlerOptions = {bus: view.bus, pathIndex: index};
					// making it draggable
					vertex = Draggable2D(vertex);
					var dragging = VertexDraggingHandler(vertex, handlerOptions);
					dragging.enable();
					vertex.handlers.push(dragging);
					// making it hoverable
					vertex = Hoverable2D(vertex);
					var hovering = HoveringHandler(vertex, handlerOptions);
					hovering.enable();
					vertex.handlers.push(hovering);
					
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
	
	return self;
}
