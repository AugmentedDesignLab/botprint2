/******************************************************************************
 *
 * This is a very simple binary tree based bin packing algorithm that is initialized
 * with a fixed width and height and will fit each block into the first node where
 * it fits and then split that node into 2 parts (down and right) to track the
 * remaining whitespace.
 *
 * Best results occur when the input blocks are sorted by height, or even better
 * when sorted by max(width,height).
 *
 * Inputs:
 * ------
 * w:      width of target rectangle
 * h:      height of target rectangle
 * blocks: array of any objects (e.g., robot parts)
 * 		   that have .w and .h attributes
 *
 * Outputs:
 * -------
 * marks each block that fits with a .fit attribute pointing to a
 * node with .x and .y coordinates
 *
 * Example:
 * -------
 * var blocks = [
 * { w: 100, h: 100 },
 * { w: 100, h: 100 },
 * { w:  80, h:  80 },
 * { w:  80, h:  80 },
 * etc
 * etc
 * ];
 *
 * var deck = Deck({dimensions:{w:500,h:500}});
 * var binPacker = new BinPacker(deck);
 * packer.fit(blocks);
 *
 * for(var n = 0 ; n < blocks.length ; n++) {
 * 	var block = parts[n];
 * 	if (block.fit) {
 * 		Draw(block.fit.x, block.fit.y, block.w, block.h);
 * 	}
 * }
 * ******************************************************************************/

BinPacker = function(deck) {
	this.init(deck);
};

BinPacker.prototype = {
	init: function(deck) {
		this.deck 		= deck;
		var coordinates = deck.coordinates();
		var dimensions  = deck.dimensions();
		this.root = {
			x: coordinates.x,
			y: coordinates.y,
			w: dimensions.w,
			h: dimensions.h
		};
	},

	fit: function(blocks) {
		var n, node, block;

		for (n = 0; n < blocks.length; n++) {
			block = blocks[n];
			node = this.findNode(this.root, block.dimensions().w, block.dimensions().h);
			if (node /* if node != null, then ...*/){
				block.fit = this.splitNode(node, block.dimensions().w, block.dimensions().h);
				this.deck.add(block);
			}
		}
	},

	findNode: function(root, w, h) {
		if (root.used)
			return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
		else if ((w <= root.dimensions().w) && (h <= root.dimensions().h))
			return root;
		else
			return null;
	},

	splitNode: function(node, w, h) {
		node.used = true;
		node.down  = { x: node.x,     y: node.y + h, w: node.dimensions().w,     h: node.dimensions().h - h };
		node.right = { x: node.x + w, y: node.y,     w: node.dimensions().w - w, h: h          };
		return node;
	}

};


