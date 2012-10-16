function Chassis2D(svg, options) {
	var punchHole2Ds = [];
	
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
			// todo(Huascar) fix this.. glow on original sketch wont go away.
			//self.glow = svg.glow({color: self.color});
			var path = svg.attrs.path;
			var points = Geometry.getVertices(path);
			points.forEach(function(p, index){
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
		
		unwarn: function() {
			svg.attr({stroke: null});
		},
		
		redraw: function() {
			// Redraw a Catmull-Rom curve
			var path = [];
			svg.attrs.path.forEach(function(p, index, originalPath) {
				if(p[0].toUpperCase() == 'C') {
					if(path[path.length-1][0]=='R') {
						if(index == originalPath.length-1 || originalPath[index+1][0].toLowerCase() != 'z'){
							// only push when it is NOT the last curve before z
							path[path.length-1].push(p[5], p[6]);						
						}
						return;
					} else if(index+1<originalPath.length && originalPath[index+1][0].toUpperCase() == 'C') {
						path.push(['R', p[5], p[6]]);
						return;
					}
				}
				path.push(p);
			});
			svg.attr('path', path);
		},
		
		removePunchHoles: function() {
			// remove 2d view for old punch holes
			for(var ph2D=punchHole2Ds.pop(); ph2D; ph2D=punchHole2Ds.pop()) {
				ph2D.remove();
			}			
		},
		
		updatePunchHoles: function(punchHoles) {
			self.removePunchHoles();
			var paper = svg.paper;
			punchHoles.forEach(function(ph) {
				var ph2D = paper.circle(ph.x, ph.y, ph.radius);
				ph2D.attr({fill: 'blue'});
				punchHole2Ds.push(ph2D);
			});
		},
		
		updateVertexAt: function(index, coord) {
			var path = svg.attrs.path;
			var action = path[index];
			action[action.length-2] = coord.x;
			action[action.length-1] = coord.y;
			svg.attr({path: path});
			self.redraw();
		}
	};
	
	Mixable(self).mix(View());
		
	var selectionHandler = SelectionHandler(Selectable(self), {app: options.app});
	selectionHandler.enable();
	self.trigger(UserEvents.click, {});
	
	var errorHandler = ChassisValidationHandler(self, {app: options.app});
	errorHandler.enable();
	
	return self;
}
