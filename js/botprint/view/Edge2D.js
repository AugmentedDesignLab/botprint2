/**
 * @author Zhongpeng Lin
 */
function Edge2D(start, end, target, options) {
	var draw = target.elem.paper;
	var svg = draw.path('M '+start.x+' '+start.y+' L '+end.x+' '+end.y);
	svg.attr({stroke: '#00FFFF', 'stroke-width': 4});
	svg.insertAfter(target.elem);
	var self = {
		elem: svg,
		handlers: [],
		target: target
	};
	
	Mixable(self).mix(View());

	self = Hoverable2D(self);
	self = Sketchable(self);
	self = Removable2D(self);
	var handler = Edge2DHandler(self, options);
	handler.enable();
	self.handlers.push(handler);
	return self;
}
