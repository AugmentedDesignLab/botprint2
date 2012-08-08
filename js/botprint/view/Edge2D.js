/**
 * @author Zhongpeng Lin
 */
function Edge2D(start, path, target, options) {
	var draw = target.elem.paper;
	var svg = draw.path('M '+start.x+' '+start.y+' '+path);
	svg.attr({opacity: 0, 'stroke-width': 10});
	svg.insertAfter(target.elem);
	svg.node.style.cursor = 'crosshair';

	var self = {
		elem: svg,
		handlers: [],
		target: target,
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
