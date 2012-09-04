describe('A SVGPathElement', function() {
	it('should convert to XML to be saved as SVG format', function() {
		var xmlns = 'http://www.w3.org/2000/svg';
		var svgNode = document.createElementNS(xmlns,'svg');
		svgNode.setAttribute('width', 800);
		svgNode.setAttribute('height', 600);
		var path = document.createElementNS(xmlns, 'path');
		path.setAttribute('d',
		'M355,246C338.6666666666667,272,415.3333333333333,416.1666666666667,447,419C478.6666666666667,421.8333333333333,560.3333333333334,291.8333333333333,545,263C529.6666666666666,234.16666666666666,371.3333333333333,220,355,246Z');
		svgNode.appendChild(path);
		
		var xml = path.toXML();
		expect(xml).toMatch(/^<\?xml version="1.0" encoding="ISO-8859-1" standalone="no"\?><svg/);
		expect(xml).toMatch(/<svg .*width="800".*>/);
		expect(xml).toMatch(/<svg .*height="600".*>/);
		expect(xml).toMatch(/<svg .*><path .*\/><\/svg>$/);
		expect(xml).toMatch(/<path .*d="M355,246C338.6666666666667,272,415.3333333333333,416.1666666666667,447,419C478.6666666666667,421.8333333333333,560.3333333333334,291.8333333333333,545,263C529.6666666666666,234.16666666666666,371.3333333333333,220,355,246Z".*\/>/);
	});
});