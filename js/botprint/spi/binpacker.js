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

function BinPacker(polygon) {
	var w 		= polygon.w;
	var h 		= polygon.h;
	var x		= polygon.x || 0; // if we are always getting 0, then there is something wrong going on.
	var y		= polygon.y || 0; // if we are always getting 0, then there is something wrong going on.

	return {
		init: function(){
			this.root = {
				x: x,
				y: y,
				w: w,
				h: h
			};
		},

		fit: function(blocks) {
			this.init();
			var n, node, block;

			for (n = 0; n < blocks.length; n++) {
				block = blocks[n];
				node = this.findNode(this.root, block.w, block.h);
				if (node /* if node != null, then ...*/){
					block.fit = this.splitNode(node, block.w, block.h);
				}
			}
		},

		findNode: function(root, w, h) {
			if (root.used)
				return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
			else if ((w <= root.w) && (h <= root.h))
				return root;
			else
				return null;
		},

		splitNode: function(node, w, h) {
			node.used = true;
			node.down  = {
				x: node.x,
				y: node.y + h,
				w: node.w,
				h: node.h - h
			};

			node.right = {
				x: node.x + w,
				y: node.y,
				w: node.w - w,
				h: h
			};

			return node;
		}
	}
}