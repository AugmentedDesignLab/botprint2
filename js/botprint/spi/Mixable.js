/**
 * @author Zhongpeng Lin
 */
function Mixable(object) {
	object.mix = function(mixin) {
		this.super = mixin;
		for(var prop in mixin) {
			if(mixin.hasOwnProperty(prop) && !this.hasOwnProperty(prop)){
				this[prop] = mixin[prop];
			}
		}
	};
	return object;
}