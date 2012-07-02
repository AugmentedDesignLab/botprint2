/**
 * EventBus API.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function EventBus () {
	var eventCallbacks = {};

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
			eventCallbacks[event] = eventCallbacks[event] || [];

			eventCallbacks[event].push ({
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
			var callbacks = eventCallbacks[event];
			if (callbacks && callbacks.length) {
				callbacks.forEach(function (elem) {
					elem['callback'].call(elem.subscriber, payload);
				});
			}
		}
	};
}
