/*
 * Extending SVGPathElement class
 */
SVGPathElement.prototype.toSVGBlob = function() {
	var svgNode = this.parentNode;
	var bb = new BlobBuilder;
	bb.append('<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>');
	
	bb.append('<svg');
	// svg attributes are needed to decide the size of the canvas
	appendAttributes(bb, svgNode.attributes);
	bb.append('>');
	
	bb.append('<path');
	appendAttributes(bb, this.attributes);
	bb.append('/>');
	
	bb.append('</svg>');
	
	return bb.getBlob('image/svg+xml;charset=utf-8');
};

function appendAttributes(blobBuilder, attributes) {
	$.each(attributes, function(index, attr){
		blobBuilder.append(' ');
		blobBuilder.append(attr.nodeName);
		blobBuilder.append('="');
		blobBuilder.append(attr.nodeValue);
		blobBuilder.append('"');
	});
};
