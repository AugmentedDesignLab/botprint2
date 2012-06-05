var Deck = MechanicalParts.extend({
	constructor: function(name, shape){
		this.base(name, null, shape);
		this._container	= new Array();

	},

	add: function(parts){
		for(var part in parts){
			this._container.push(part);
		}
	},

	_findIndex: function(part){
		var idx = 0;
		for(var each in this._container){
			if(each == part){
				return idx;
			}

			idx++;
		}
	},

	remove: function(part) {
		Arrays.remove(this._findIndex(part));
	}
});