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
					// draw a circle for each vertex along the path
					var circle = draw.circle(action[1], action[2], 4);
					circle.attr({fill: 'white', stroke: 'black'});
					
					var vertex = Vertex2D(circle);
					vertex.path_index = index;
					vertex.chassis = view.chassis;
					vertex.handlers = [];
					var handlerOptions = {bus: view.bus};
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
			while(vertices.length > 0)
			{
				var vertex = vertices.pop();
				vertex.handler.disable();
				vertex.svg.remove();
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
