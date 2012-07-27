/**
 * @author Zhongpeng Lin
 */
function RemovingHandler(view, options) {
	var self = {
		userEvents: ['click'],
		
		click: function(payload) {
			var color = view.target.getColor();
			view.target.setColor('#FFFF00');
			if(confirm('Are you sure you want to delete this wheel?')) {
				view.target.remove();
				view.remove();
				var wheel = Wheel({id: view.target.id, app: options.app});
				wheel.delete();
			} else {
				view.target.setColor(color);
			}
		}
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
