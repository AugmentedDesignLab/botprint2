/**
 * @author Zhongpeng Lin
 */
function SelectionHandler(view, options) {
	var self = {
		appEvents: ['selectionChanged', 'optionChanged'],
		userEvents: ['click'],
		
		enable: function() {
			var thisHandler = this;
			thisHandler.appEvents.forEach(function(ev){
			    self.bind(Events[ev], thisHandler[ev]);
			});
			thisHandler.userEvents.forEach(function(ev){
			    view.bind(Events[ev], thisHandler[ev]);
			});			
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.appEvents.forEach(function(ev){
			    self.unbind(Events[ev], thisHandler[ev]);
			});
			thisHandler.userEvents.forEach(function(ev){
			    view.unbind(Events[ev], thisHandler[ev]);
			});			
		},

		click: function(payload) {
			payload.event.stopPropagation();
			if(view.selected)
				return;
			// Notify others to deselect themselves, and SidePanel to change selected color
			self.trigger(Events.selectionChanged, {target: view});
			// Select this view
			view.select();
		},
		
		selectionChanged: function(payload) {
			view.deselect();
		},
		
		optionChanged: function(payload) {
			if(view.selected && payload.color) {
				view.setColor(payload.color);
			}
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;	
}
