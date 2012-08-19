describe('A Bindable object', function() {
	it('should invoke handlers in the order of events triggered from it', function(){
		var tokens = [];
		var bindable = Bindable();
		function e1Handler1(payload) {
			tokens.push('e1Handler1');
			bindable.trigger('Event2',{});
		}
		function e1Handler2(payload) {tokens.push('e1Handler2');}
		function e2Handler1(payload) {tokens.push('e2Handler1');}
		bindable.bind('Event1', e1Handler1);
		bindable.bind('Event1', e1Handler2);
		bindable.bind('Event2', e2Handler1);
		bindable.trigger('Event1', {});
		expect(tokens).toBe(['e1Handler1', 'e1Handler2', 'e2Handler1']);
	});
});

describe('Different Bindable objects', function() {
	it('should invoke handlers in the order of events triggered from them', function(){
		var tokens = [];
		var bindable1 = Bindable(), bindable2 = Bindable();
		function e1Handler1(payload) {
			tokens.push('e1Handler1');
			bindable2.trigger('Event2',{});
		}
		function e1Handler2(payload) {tokens.push('e1Handler2');}
		function e2Handler1(payload) {tokens.push('e2Handler1');}
		bindable1.bind('Event1', e1Handler1);
		bindable1.bind('Event1', e1Handler2);
		bindable2.bind('Event2', e2Handler1);
		bindable1.trigger('Event1', {});
		expect(tokens).toBe(['e1Handler1', 'e1Handler2', 'e2Handler1']);
	});
});