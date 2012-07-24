/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
describe("PCG-Algorithms", function(){
	var deck;
	var blocks;
	var dataMaker;

	beforeEach(function(){
		dataMaker = new DataMaker();
		deck 	  = new Deck({name:"Top", bus: dataMaker.bus});
	});

	afterEach(function(){});

	describe("Once ready for packing the layout", function(){
		it("should pack a 50 by 50 area", function(){
			expect(true).toBeTruthy();
		});
	});

	describe("Once ready for snapping wheels", function(){
		it("should be TBD", function(){
			expect(true).toBeTruthy();
		});
	});
});