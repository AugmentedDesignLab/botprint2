/******************************************************************************
 *
 * This is a very simple binary tree based bin packing algorithm that is initialized
 * with a fixed width and height and will fit each block into the first node where
 * it fits and then split that node into 2 parts (down and right) to track the
 * remaining whitespace.
 *
 * Best results occur when the input blocks are sorted by height, or even better
 * when sorted by max(width,height).
 * Inputs:
 * ------
 * w:      width of target rectangle
 * h:      height of target rectangle
 * blocks: array of any objects that have .w and .h attributes
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
 * var binPacker = new BinPacker(500, 500);
 * packer.fit(blocks);
 *
 * for(var n = 0 ; n < blocks.length ; n++) {
 * 	var block = blocks[n];
 * 	if (block.fit) {
 * 		Draw(block.fit.x, block.fit.y, block.w, block.h);
 * 	}
 * }
 * ******************************************************************************/

BinPacker = function(w, h) {
	this.init(w, h);
};

BinPacker.prototype = {
	init: function(w, h) {
		this.root = {
			x: 0,
			y: 0,
			w: w,
			h: h
		};
	},

	fit: function(blocks) {
		var n, node, block;

		// from 0 ... N-1 blocks (e.g., N = 4 => from 0 ... 3)
		for (n = 0; n < blocks.length; n++) {
			block = blocks[n];
			if(block.fit) continue;
			node = this.findNode(this.root, block.w, block.h);
			if (node /* if node != null, then ...*/){
				// 2. node != null since node == root, then split the root...
				// 5. block.fit is set (assigned a non null val) meaning in the bounding area
				// e.g., root...
				// 8. root.right can hold the new block...next? split root.right..
				block.fit = this.splitNode(node, block.w, block.h);
			}
		}
	},

	findNode: function(root, w, h) {
		if (root.used)
			// 6. root.used == true, then try the right empty space or down empty space
			// and see which fits well (first come first serve)...here is where I can use
			// optimization...
			return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
		else if ((w <= root.w) && (h <= root.h))
			// 1. first time running the algo...
			// 7. return root.right. The assumption is since we are returning right,
			// there is not need to inspect root.down...
			return root;
		else
			return null;
	},

	splitNode: function(node, w, h) {
		// 3. node == root, then root.used = true, down, right
		// 9. root.right.used = true,
		node.used = true;
		node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
		node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
		// 4. return root with 3 new attributes, used, down, right
		return node;
	}

};


