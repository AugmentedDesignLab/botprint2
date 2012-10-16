describe('The layout algorithm', function() {
	it('should find the optimal rotation of the chassis', function() {
		var paperElem = document.createElement('div');
		var paper = Raphael(paperElem, 10000, 10000); // a really huge paper
		var path = 'm 614.52875,415.1083 c 1.11253,1.66879 2.78132,3.33757 6.1189,3.89384 5.00637,0 10.01274,0.55626 15.01912,0.55626 2.22505,0 2.78131,-4.4501 3.33757,-7.78769 42.27601,-7.23142 71.20171,-18.91295 75.09557,-36.15711 -11.68154,-53.40129 -256.43743,-53.40129 -408.8536,-30.59449 l 0,0 c -2.22505,-3.89385 -7.78769,-13.90659 -36.71339,-14.46285 -12.23779,0 -24.47559,-0.55626 -36.15712,-0.55626 -2.22505,0 -2.78131,1.66879 -3.33758,3.89384 -1.11252,10.01275 -2.22505,19.46922 -3.89384,28.9257 l 0.55626,0 C 214.57537,366.71337 205.1189,371.16349 199,375.6136 c 6.1189,3.89384 15.57537,8.34395 26.70064,12.23779 -0.55626,0 2.22506,22.8068 2.78132,24.47558 0,2.78133 1.11253,3.89386 2.78132,3.89386 9.45647,1.66878 21.69427,3.33757 37.26964,3.89383 14.46285,0.55626 29.48196,-0.55626 36.71339,-14.46285 93.45224,13.90659 221.39283,19.46923 309.28244,9.45649 z';
		var fakeChassis = {path: path};
		var optimal = FindTightGridArea(paper, fakeChassis);
		expect(optimal.angle).toBe(90);
	});
});