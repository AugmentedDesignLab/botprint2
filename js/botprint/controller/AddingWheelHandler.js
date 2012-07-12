/**
 * @author Zhongpeng Lin
 */
function AddingWheelHandler(view, options) {
	var elem = view.elem;
	var events = ['click']
	var wheelDef = {
		width: 30,
		height: 60,
		radius: 5,
		fill: '#00ffff'
	};
	
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
			var x = EventX(payload).offsetX;
			var y = EventX(payload).offsetY;
			var svg = view.draw.rect(x - wheelDef.width/2, y - wheelDef.height/2,
				wheelDef.width, wheelDef.height, wheelDef.radius);
			svg.attr({fill: wheelDef.fill});

			var wheel = Wheel2D(svg);
			var dragging = DraggingHandler(wheel, {bus: view.bus});
			dragging.enable();
		}
	};

	$.extend(self, EventHandler(view, options));
	return self;
}
