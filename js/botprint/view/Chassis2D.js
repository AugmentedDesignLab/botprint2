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
		
		unwarn: function() {
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
			path.push('z');
			svg.attr({path: path, stroke: 'red'});
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
				ph2D.attr({fill: 'black', stroke: 'blue'});
				punchHole2Ds.push(ph2D);
			});
		},
		
		updateVertexAt: function(index, coord) {
			var p = self.points.point(index);
			p.x = coord.x;
			p.y = coord.y;
			self.redraw();
		}
	};
	
	Mixable(self).mix(View());
	self.points = Points.fromPath(svg.attrs.path);
	
	var selectionHandler = SelectionHandler(Selectable(self), {app: options.app});
	selectionHandler.enable();
	self.trigger(UserEvents.click, {});
	
	var errorHandler = ChassisValidationHandler(self, {app: options.app});
	errorHandler.enable();
	
	return self;
}
