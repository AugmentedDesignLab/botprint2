function Chassis2D(svg, options) {
	var self = {
		elem: svg,
		vertices: [],
		edges: [],
		points: [],
		id: new Date().getTime(),
		
		set color(c) {
			svg.attr({fill: c});
		},
		
		get color(){
			return svg.attrs.fill;
		},
		
		select: function() {
			self.glow = svg.glow({color: self.color});
			var path = svg.attrs.path;
			
			self.points.forEach(function(p, index){
				var widgetOptions = {app: options.app, pathIndex: index};
				var vertex = Vertex2D(p,
					self,
					widgetOptions);					
				self.vertices.push(vertex);
				var edge = Edge2D(p, path[index+1], self, widgetOptions);
				self.edges.push(edge);
			});
			
			this.selected = true;
		},
		
		deselect: function() {
			if(self.glow) {
				self.glow.remove();
				self.glow = null;
			}
			while(self.vertices.length > 0){
				var vertex = self.vertices.pop();
				vertex.remove();
			}
			while(self.edges.length > 0) {
				var edge = self.edges.pop();
				edge.remove();
			}
			this.selected = false;
		},
		
		warn: function() {
			svg.attr({stroke: 'red'});
		},
		
		diswarn: function() {
			svg.attr({stroke: null});
		},
		
		redraw: function() {
			// Redraw a Catmull-Rom curve
			var path;
			self.points.forEach(function(p, index) {
				if(index == 0) {
					path = ['M', p.x, p.y, 'R'];
				} else {
					path.push(p.x, p.y);
				}
			});
			path.push('Z');
			svg.attr('path', path);
		}
	};
	
	Mixable(self).mix(View());
	
	var polygonPath = svg.attrs.path;
	polygonPath.forEach(function(action, index){
		switch(action[0]){
			case 'M':
				self.points.push({x: action[1], y: action[2]});
				break;
			case 'L':
				self.points.push({x: action[1], y: action[2]});
				break;
		}
	});
	self.redraw();
	
	var selectionHandler = SelectionHandler(Selectable(self), {app: options.app});
	selectionHandler.enable();
	self.trigger(UserEvents.click, {});
	
	var errorHandler = ChassisValidationHandler(self, {app: options.app});
	errorHandler.enable();
	
	return self;
}
