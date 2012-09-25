/**
 * EventBus API.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function EventBus (deliveryStrategy) {
	deliveryStrategy =  deliveryStrategy || new DeliveryStrategy();

	function noop(){}

	return {
		/**
		 * The subscribe method adds a function as an event listener.
		 *
		 * @name subscribe
		 * @methodOf EventBus#
		 *
		 * @param {String} event The event to listen to.
		 * @param {Function} callback The function to be called when the specified event
		 * is triggered.
		 */
		subscribe:function (event, callback, subscriber) {
			deliveryStrategy.admit(event, {
				subscriber: subscriber,
				callback:   callback
			});
		},

		/**
		 * The unsubscribe method removes a function from event listeners.
		 *
		 * @name unsubscribe
		 * @methodOf EventBus#
		 *
		 * @param {String} event The event to listen to.
		 * @param {Function} callback The function to be called when the specified event
		 * is triggered.
		 */
		unsubscribe:function (event, callback, subscriber) {
			deliveryStrategy.dismiss(event, {
				subscriber: subscriber,
				callback:   callback
			});
		},

		/**
		 * The publish method calls all listeners attached to the specified event.
		 *
		 * @name publish
		 * @methodOf EventBus#
		 *
		 * @param {String} event The event to trigger.
		 */
		publish:function (event, payload/*payload is a record object*/) {
			deliveryStrategy.deliver(
				event,
				payload,
				noop);
		}
	};
}
