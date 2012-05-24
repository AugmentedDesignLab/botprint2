/**
 * @author Zhongpeng Lin
 * 
 * This class is an abstract class
 */
function sketchingHandler(spec) {
	var handler = spec;
	var elem = handler.canvas.elem;
	var events = ['mousedown', 'mousemove', 'mouseup', 'dblclick'];
	handler.enable = function() {
		$.each(events, function(index, ev){
			if(handler[ev]){
				elem.bind(ev, function(event){
			      event.preventDefault();
			      handler[ev](handler.canvas.translateX(event.clientX), handler.canvas.translateY(event.clientY));
			    });
			}
		});
	};
	
	handler.disable = function() {
		elem.unbind();
	};
	
	return handler;
}
