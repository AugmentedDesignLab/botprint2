function EditingHandler(view, options) {
	var vertices = [];
	
	var self = {
		enable: function() {
			var draw = view.elem.paper;
			var path = view.elem.attrs.path;
			path.forEach(function(action, index){
				if(action.length == 3){
					var vertex = Vertex2D({x: action[1], y: action[2]},
						view.elem,
						{app: options.app, pathIndex: index});					
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
