Block = function(x, y, w, h) {
	this.init(x, y, w, h);
};

Block.prototype = {
	init: function(x, y, w, h) {
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
	},

	x: function(){
		return this._x;
	},

	y: function(){
		return this._y;
	},

	w: function(){
		return this._w;
	},

	h: function(){
		return this._h;
	}
};
