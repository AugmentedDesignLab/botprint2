function BinaryHeap(scoring/*scoring function*/){
	var array = [];
	var self = {
		empty: function(){
			return self.size() == 0;
		},

		downheap: function(pos){
			while(pos < Math.floor(self.size()/2)){
				var child = 2 * pos + 1;
				if(child < self.size() - 1
					&& scoring(array[child]) > scoring(array[child + 1])){
					++child;
				}

				if(scoring(array[pos]) <= scoring(array[child])) break;

				pos = self.swap(pos, child);

			}
		},

		// add the item to the bottom level of the heap
		push: function(item){
			array.push(item);
			// item's position
			var position = self.size() - 1;
			self.upheap(position);
		},

		peek: function(){
			return array[0];
		},

		remove: function(item){
			var len = self.size();
			for (var i = 0; i < len; i++) {
				if(array[i] == item){
					// when it is found, the process seen in "pop"
					// is repeated to fill up the hole.
					var end = self.pop();
					if(i != len - 1){
						array[i] = end;
						if(scoring(end) < scoring(item)){ self.upheap(i);   }
						else 							{ self.downheap(i); }
					}

					return;
				}
			}

			throw new Error("item not found.");
		},

		pop: function(){
			var removedNode = array[0];
			var lastNode	= array.pop();
			if(!self.empty()){
				array[0] = lastNode;
				self.downheap(0);
			}

			return removedNode;
		},

		size: function(){
			return array.length;
		},

		swap: function(i, j){
			var swo   = array[i];
			array[i] = array[j];
			array[j] = swo;

			j = i;

			return j;
		},

		upheap: function(pos){
			while(pos > 0){
				var parentPos 	= Math.floor((pos - 1) / 2);
				var parent    	= array[parentPos];
				var item 		= array[pos];

				// compare the added item with its parent; if they are in the correct order, stop.
				// otherwise, swap them
				if(scoring(item) >= scoring(parent)) break;

				// swap and then update 'pos' to continue at the new position.
				pos = self.swap(pos, parentPos);

			}
		}
	};

	return self;
}