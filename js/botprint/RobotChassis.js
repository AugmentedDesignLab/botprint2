var RobotChassis = Base.extend({
	constructor: function(shape, decks){
		this._shape = shape;
		this._decks = decks;
	},

	shape: function() {
		return this._shape;
	},

	decks: function(){
		return this._decks;
	},

	add: function(deck, parts){
		for(var eachDeck in this._decks){
			if(eachDeck == deck){
				eachDeck.add(parts);
			}
		}
	},

	remove: function(deck, parts){
		for(var eachDeck in this._decks){
			if(eachDeck == deck){
				deck.remove(parts);
			}
		}
	}
});