/**
 * Part domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Part(opts){
	var children = [];
	var self = {
		/**
		 * adds a new child part.
		 * @param child part to be added.
		 */
		add: function(child){
			children.push(child);
		},

		/**
		 * gets a given child located at a given index.
		 * @param idx location of the child of interest.
		 * @return {*} child of interest.
		 */
		getChild: function (idx){
			return children[idx];
		},

		/**
		 * removes a child.
		 * @param child child part to be removed.
		 * @return {Boolean} true if the child was removed.False otherwise.
		 */
		remove: function(child){
			for (var node, i = 0; node = self.getChild(i); i++) {
				if(node == child){
					children.splice(i, 1);
					return true;
				}

				if(node.remove(child)){
					return true;
				}
			}

			return false;
		},

		/**
		 * samples the children data structure given a filtering condition.
		 * @param filter filtering condition.
		 */
		select: function(filter){
			filter = filter || function(p) { return true; };
			children.select(filter);
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	opts = opts || {};
	$.extend (self, Model (opts));
	return self;
}
