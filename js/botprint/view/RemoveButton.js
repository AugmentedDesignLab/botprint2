/**
 * @author Zhongpeng Lin
 */
function RemoveButton(target, options) {
	var draw = target.elem.paper;
	var bBox = target.elem.getBBox();
	// Path taken from http://raphaeljs.com/icons/#cross
	var button = draw.path('M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z');
	button.attr({fill: 'white'});
	var initPosition = {x: bBox.x2-16, y: bBox.y-17};
	var initTransform = 'T'+initPosition.x+','+initPosition.y;
	button.transform(initTransform);
	var targetPosition = target.getPosition();
	var offset = {x: initPosition.x - targetPosition.x, y: initPosition.y - targetPosition.y};
	
	var self = {
		target: target,
		elem: button,
		handlers: [],
		setPosition: function(targetX, targetY) {
			var x = targetX + offset.x;
			var y = targetY + offset.y;
			button.transform('T'+x+','+y);
		},
		
		highlight: function(){
			button.attr({fill: '#00FFFF'});
		},
		
		lowlight: function() {
			button.attr({fill: 'white'});			
		}
	};
	
	Mixable(self).mix(View());
	
	// making it reponding to click event
	self = Selectable(self);
	var handler = RemovingHandler(self, options);
	handler.enable();
	self.handlers.push(handler);
	// making it removable
	self = Removable2D(self);
	// making it hoverable
	self = Hoverable2D(self);
	var hover = HoveringHandler(self, options);
	hover.enable();
	self.handlers.push(hover);
	return self;
}
