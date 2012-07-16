/**
 * @author Zhongpeng Lin
 */
function HTMLEventHandler(view, options) {
	var self = {
		enable: function(){
			var thisHandler = this;
			thisHandler.events.forEach(function(ev){
			    view.node.bind(ev.toLowerCase(), thisHandler[ev]);		
			});
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.events.forEach(function(ev){
			    view.node.unbind(ev.toLowerCase(), thisHandler[ev]);		
			});
		}
	};
	
	$.extend(self, Bindable(options.bus));
	
	return self;
}
