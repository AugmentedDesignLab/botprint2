function Chassis2D(svg, options) {
	var self = {
		elem: svg,
		vertices: [],
		edges: [],
		setColor: function(color) {
			svg.attr({fill: color});
		},
		
		getColor: function(color) {
			return svg.attrs.fill;
		},
		
		select: function() {
			var path = svg.attrs.path;
			var start, previous;
			path.forEach(function(action, index){
				var position;
				var widgetOptions = {app: options.app, pathIndex: index};
				if(action.length == 3){
					position = {x: action[1], y: action[2]};
					var vertex = Vertex2D(position,
						self,
						widgetOptions);					
					self.vertices.push(vertex);
				}
				
				switch(action[0]) {
					case 'M':
					case 'm':
						start = previous = position;
						break;
					case 'L':
					case 'l':
						var edge = Edge2D(previous, position, self, widgetOptions);
						self.edges.push(edge);
						previous = position;
						break;
					case 'Z':
					case 'z':
						var edge = Edge2D(previous, start, self, widgetOptions);
						self.edges.push(edge);
						break;
				}
				
			});
			
			this.selected = true;
		},
		
		deselect: function() {
			while(self.vertices.length > 0){
				var vertex = self.vertices.pop();
				vertex.remove();
			}
			while(self.edges.length > 0) {
				var edge = self.edges.pop();
				edge.remove();
			}
			this.selected = false;
		}
	};
	
	Mixable(self).mix(View());
	
	var selectionHandler = SelectionHandler(Selectable(self), {app: options.app});
	selectionHandler.enable();
	self.trigger(UserEvents.click);
	
	return self;
}
