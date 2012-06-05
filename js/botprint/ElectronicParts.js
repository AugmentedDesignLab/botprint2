var ElectronicParts = Base.extend({
	constructor: function(name, shape, deck){
		this._name 				= name;
		this._shape				= shape;
		this._deck 				= deck;
	},

	name: function(){
		return this._name;
	},

	shape: function() {
		return this._shape;
	},

	deck: function(){
		return this._deck;
	},

	mount: function(deck){
		if(this._deck != deck){
			this._deck = deck;
		}
	},

	unmount: function(){
		this.mount(null);
	}
});