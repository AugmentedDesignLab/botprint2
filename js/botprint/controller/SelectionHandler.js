/**
 * @author Zhongpeng Lin
 */
function SelectionHandler(view, options) {
	var self = {
		events: ['selectionChanged', 'optionChanged'],
		enable: function() {
			this.bind(Events.selectionChanged, this.selectionChanged);
			this.bind(Events.optionChanged, this.optionChanged);
			view.node.bind('click', this.click);
		},
		
		click: function(payload) {
			payload.stopPropagation();
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
