/**
 * @author Zhongpeng Lin
 */
function CanvasEventHandler(view, options) {
	var self = {
		enable: function(){
			var thisHandler = this;
			thisHandler.events.forEach(function(ev){
			    view.elem.bind(ev.toLowerCase(), thisHandler[ev]);		
			});
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.events.forEach(function(ev){
			    view.elem.unbind(ev.toLowerCase(), thisHandler[ev]);		
			});
		}
	};
	
	$.extend(self, Bindable(options.bus));
	
	return self;
}
