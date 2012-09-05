/*
 * Extending SVGPathElement class
 */
SVGPathElement.prototype.toXML = function() {
	var svgNode = this.parentNode;
	var stringBuffer = ['<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>'];
	// svg attributes are needed to decide the size of the canvas
	stringBuffer.push('<svg', svgNode.attributes, '>');
	stringBuffer.push('<path', this.attributes, '/>');
	stringBuffer.push('</svg>');
	return stringBuffer.join('');
};

// Override the toString method
NamedNodeMap.prototype.toString = function() {
	var stringBuffer = [];
	$.each(this, function(index, attr){
		stringBuffer.push(' ');
		stringBuffer.push(attr.nodeName);
		stringBuffer.push('="');
		stringBuffer.push(attr.nodeValue);
		stringBuffer.push('"');		
	});
	return stringBuffer.join('');
};