/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(view, options) {
	var elem = view.elem;
	var events = ['click', 'mouseMove', 'dblClick'];
	
	var self = {
		enable: function(){
			events.forEach(function(ev){
			    elem.bind(ev.toLowerCase(), self[ev]);		
			});
		},
		
		disable: function() {
			events.forEach(function(ev){
			    elem.unbind(ev.toLowerCase(), self[ev]);		
			});
		},
				
		click: function(payload) {
			var x = OffsetEvent(payload).offsetX;
			var y = OffsetEvent(payload).offsetY;

			if(this.shape){
				// Extend the path
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +' L ' + x + ' ' + y);
			}else{
				if(view.chassis)
					view.chassis.remove();
				// Create a new path
				var draw = view.draw;
				this.shape = draw.path('M '+x+' '+y+' L ' + x + ' ' + y);
				this.shape.attr(options.shapeAttributes);
			}
		},
		
		mouseMove: function(payload) {
			var x = OffsetEvent(payload).offsetX;
			var y = OffsetEvent(payload).offsetY;

			if(this.shape){
				// Modify the last path element
				var path = this.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = x;
				last[2] = y;
				this.shape.attr('path', path);
			}
		},
		
		dblClick: function(payload){
			if(this.shape){
				var path = this.shape.attrs.path;
				/* click event handler is called twice
				 * before this. Two pop operations from path
				 * are to offset the effect of two click events
				 */ 
				path.pop();
				path.pop();
				this.shape.attr('path', path +'Z');
				view.chassis = this.shape;
				// Automatically switch to EditingHandler
				self.disable();
				var editingHandler = EditingHandler(view);
				editingHandler.enable();
				self.trigger(Events.chassisShapeUpdated, {shape: this.shape});
				this.shape = null;
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
