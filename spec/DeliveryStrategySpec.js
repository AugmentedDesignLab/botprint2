/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
describe("A DeliveryStrategy", function(){

	it("should check-in and awaits completion of eventCallbacks properly.", function(){
		var strategy 	= DeliveryStrategy(1/*serial execution*/);
		var sumcalled   = false;
		var subcalled   = false;
		var multcalled  = false;
		var tracker     = 0;
		var nice        = false;

		var ready = function(){
			nice = true;
			return nice;
		};

		var sum   = function(payload) {
			sumcalled = (tracker == 0);
			tracker++;
			return payload.a + payload.b;
		};

		var sub   = function(payload) {
			subcalled = (tracker == 1);
			tracker++;
			return payload.a - payload.b;
		};

		var mult   = function(payload) {
			multcalled = (tracker == 2);
			tracker++;
			return payload.a * payload.b;
		};



		strategy.admit("arithmetic", {callback:sum});
		strategy.admit("arithmetic", {callback:sub});
		strategy.admit("arithmetic", {callback:mult});
		strategy.deliver("arithmetic", {a:2, b:2}, ready);

		expect(sumcalled).toBe(true);
		expect(subcalled).toBe(true);
		expect(multcalled).toBe(true);
		expect(nice).toBe(true);

	});

	it("it should do ZP", function(){
		var strategy 	= DeliveryStrategy();
		var sumcalled   = false;
		var subcalled   = false;
		var tracker     = 0;
		var nice        = false;
		var aha			= false;

		var sum   = function(payload) {
			sumcalled = (tracker == 0);
			tracker++;
			return payload.a + payload.b;
		};

		var sub   = function(payload) {
			subcalled = (tracker == 1);
			tracker++;
			return payload.a - payload.b;
		};

		var loner    = function(payload){
			aha = (tracker == 3);
			tracker++;
			return payload.a / payload.b;
		};


	});

});