var Servo = Base.extend({
	constructor: function(name, deck, shape){
		this._name  = name;
		this._deck  = deck;
		this._shape = shape;
	},

	name: function(){
		return this._name;
	},

	deck: function() {
		return this._deck;
	},

	shape: function() {
		return this._shape;
	}
});