/**
 * @author Zhongpeng Lin
 */

function EventHandler(view, options) {
	return Bindable(view.bus || options.bus); 
}
