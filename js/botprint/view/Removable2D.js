/**
 * @author Zhongpeng Lin
 */
function Removable2D(object2D) {
	object2D.remove = function() {
		this.handlers.forEach(function(h){
			h.disable();
		});
		if(this.elem.unbindAll){
			this.elem.unbindAll();
		}
		this.elem.remove();
	};
	return object2D;
}
