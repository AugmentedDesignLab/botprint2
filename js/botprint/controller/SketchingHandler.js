/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(view, options) {
	var elem = view.elem;
	
	var self = {
		
		enable: function(){
			var events = ['mousedown', 'mousemove', 'dblclick'];
			
			events.forEach(function(ev){
				elem.bind(ev, function(eventObj){
					eventObj.preventDefault();
					self[ev]({x:view.translateX(eventObj.clientX),
			      		y:view.translateY(eventObj.clientY), target: view});
			      	// FIXME having trouble using EventBus here, help me out!
			      	// self.trigger(Events[ev.toUpperCase()], {x:view.translateX(eventObj.clientX),
			      	// y:view.translateY(eventObj.clientY), target: view});
			    });				
			});
			// self.bindAll(events);
		},
		
		disable: function() {
			elem.unbind();
		},
				
		mousedown: function(payload) {
			if(!this.isMyJob(payload))
				return;
			if(this.shape){
				// Extend the path
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +' L ' + payload.x + ' ' + payload.y);
			}else{
				if(view.chassis)
					view.chassis.remove();
				// Create a new path
				var draw = view.draw;
				this.shape = draw.path('M '+payload.x+' '+payload.y+' L ' + payload.x + ' ' + payload.y);
				this.shape.attr(options.shapeAttributes);
			}
		},
		
		mousemove: function(payload) {
			if(!this.isMyJob(payload))
				return;
			if(this.shape){
				// Modify the last path element
				var path = this.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = payload.x;
				last[2] = payload.y;
				this.shape.attr('path', path);
			}
		},
		
		dblclick: function(payload){
			if(!this.isMyJob(payload))
				return;
			if(this.shape){
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +'Z');
				view.chassis = this.shape;
				this.trigger(Events.CHASSIS_SHAPE_UPDATED, {shape: this.shape});
				this.shape = null;
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
