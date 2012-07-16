function EditingHandler(view, options) {
	var vertices = [];
	
	var self = {
		enable: function() {
			self.trigger(Events.enabled, {view: view});
		},
		
		disable: function() {
			self.trigger(Events.disabled, {});
		}
	};

	$.extend(self, Bindable(view.bus));

	// these ones can be placed in a helper object, maybe called Functors
	var estra = function(payload) {
		var view = payload['view'];
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
	};

	var distra = function(payload) {
		while(vertices.length > 0){
			var vertex = vertices.pop();
			vertex.remove();
		}
	};

	Binder(self).bindAll(function(){
		this.bindSelfToDraggable();
		this.bindSelfToHoverable();
		this.bindSelfToDisabled(distra);
		this.bindSelfToEnabled(estra);
	});
	return self;
}
